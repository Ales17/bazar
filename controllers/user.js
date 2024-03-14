const express = require("express");
const User = require("../models/user");
const crypto = require("crypto");
const { getOffersByAuthorJson } = require("./offer");

const authTokens = {};

// Auth middleware
middleware = (req, res, next) => {
  const authToken = req.cookies["tkn"];
  req.user = authTokens[authToken];
  res.set("X-AB-APP", authToken)
  next();
};

requireLogin = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    res.status(403).render("login", { message: "Pro pokračování se, prosím, přihlaste." });
  }
};

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

const generateAuthToken = () => {
  return crypto.randomBytes(40).toString("hex");
};

createUser = async (req, res) => {
  const { username, name, email, password, password2, phone } = req.body;

  // Check if the user already exists
  const user = await User.findOne({ username });
  if (user) {
    res.status(400).render("register", {
      message: "Uživatel s tímto jménem již existuje.",
    });
    return;
  } else if (password !== password2) {
    res.status(400).render("register", { message: "Hesla se neshodují" });
    return
  }

  const hashedPassword = getHashedPassword(password);

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

loginPage = (req, res) => {
  res.render("login");
};

userPage = async (req, res) => {
  const user = req.user;
  const offers = await getOffersByAuthorJson(req.user.id);
  if (offers) {
    res.render("user", { user, offers });
  } else {
    res.render("user", { user });
  }
};

registerPage = (req, res) => {
  res.render("register");
};

login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    username,
    hashedPassword: getHashedPassword(password),
  });
  if (user) {
    const authToken = generateAuthToken();
    // Store authentication token
    authTokens[authToken] = user;

    // Setting the auth token in cookies
    res.cookie("tkn", authToken);

    //res.send(user.id);
    res.redirect("/");
  } else {
    res.render("login", {
      message: "Nesprávné přihlašovací údaje",
      messageClass: "alert-danger",
    });
  }
};

logoutUser = (req, res) => {
  const authToken = req.cookies["tkn"];
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
  requireLogin
};
