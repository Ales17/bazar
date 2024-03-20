const express = require("express");
const router = express.Router();

const {
  createUser,
  login,
  loginPage,
  userPage,
  logoutUser,
  registerPage,
  authenticate,
} = require("../controllers/user");

// Pages
router.get("/", [authenticate, userPage]);
router.get("/login", loginPage);
router.get("/register", registerPage);
// Utils
router.get("/logout", logoutUser);
router.post("/register", createUser);
router.post("/login", login);

module.exports = router;
