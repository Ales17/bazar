const express = require("express");
const router = express.Router();

const {
  createUser,
  login,
  loginPage,
  userPage,
  logoutUser,
  registerPage,
  requireLogin
} = require("../controllers/user");



// Pages
router.get("/", [requireLogin, userPage]);
router.get("/login", loginPage);
router.get("/register", registerPage);
// Utils
router.get("/logout", logoutUser);
router.post("/register", createUser);
router.post("/login", login);

router.get("/:author/offers", getOfferByAuthor);


module.exports = router;
