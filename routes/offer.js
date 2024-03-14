const express = require("express");
const router = express.Router();

const {
  createOffer,
  getOfferByAuthor,
  offerPage,
  createOfferPage,
  getOfferByIdJson,
  deleteOfferById,
  editOfferPage,
  editOffer,
} = require("../controllers/offer");
const { requireLogin } = require("../controllers/user");

// Pages
router.get("/create", [requireLogin, createOfferPage]);
router.get("/:id", offerPage);
router.get("/:id/edit", [requireLogin, editOfferPage])
router.post("/:id/edit", [requireLogin, editOffer]);
// CRUD
router.post("/create", [requireLogin, createOffer]);
router.get("/author/:author", [requireLogin, getOfferByAuthor]);
// router.get("/api/:id", getOfferByIdJson);
router.get("/:id/delete", [requireLogin, deleteOfferById]);

module.exports = router;
