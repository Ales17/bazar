const User = require("../models/user");
const crypto = require("crypto");
const { getOffersByAuthor } = require("./offer");
const bcrypt = require("bcryptjs");

const authTokens = {};
// Put user token in requests
middleware = (req, res, next) => {
  const authToken = req.cookies["tkn"];
  req.user = authTokens[authToken];
  next();
};
// Require authentication for certain endpoints
authenticate = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    res.status(403).render("login", { message: "Nejste přihlášeni." });
  }
};

// Util
const generateAuthToken = () => {
  return crypto.randomBytes(40).toString("hex");
};

const findUserByUsername = async (username) => {
  return await User.findOne({
    username,
  });
};

// Pages - GET
loginPage = (req, res) => {
  res.render("login");
};

userPage = async (req, res) => {
  const user = req.user;
  const offers = await getOffersByAuthor(req.user.id);
  if (offers) {
    res.render("user", { user, offers });
  } else {
    res.render("user", { user });
  }
};

registerPage = (req, res) => {
  res.render("register");
};

// CRUD - POST 
createUser = async (req, res) => {
  const { username, name, email, password, password2, phone } = req.body;

  // Check if the user already exists
  const user = await findUserByUsername(username);
  if (user) {
    res
      .status(400)
      .render("register", { message: "Uživatel s tímto jménem již existuje." });
    return;
  } else if (password !== password2) {
    res.status(400).render("register", { message: "Hesla se neshodují" });
    return;
  }

  var hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    username,
    name,
    email,
    hashedPassword,
    phone,
  });
  await newUser.save();
  res.status(201).render("login", {
    message: "Děkujeme za registraci. Nyní se můžete přihlásit.",
  });
};

login = async (req, res) => {
  const { username, password } = req.body;

  const user = await findUserByUsername(username);

  if (user) {
    const compare = bcrypt.compareSync(password, user.hashedPassword);

    if (compare) {
      const authToken = generateAuthToken();
      // Store authentication token
      authTokens[authToken] = user;
      // Expiration and httOnly for security
      res.cookie("tkn", authToken, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
      });

      res.redirect("/");
    } else {
      res.render("login", { message: "Zadali jste nesprávné heslo." });
    }
  } else {
    res.render("login", { message: "Uživatel s tímto jménem neexistuje." });
  }
};

logoutUser = (req, res) => {
  const authToken = req.cookies["tkn"];
  res.clearCookie("tkn");
  delete authTokens[authToken];
  res.redirect("/");
};

module.exports = {
  createUser,
  login,
  loginPage,
  logoutUser,
  userPage,
  registerPage,
  middleware,
  authenticate,
};
