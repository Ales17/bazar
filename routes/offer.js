const express = require("express");
const router = express.Router();

const {
  createOffer,
  offerPage,
  createOfferPage,
  deleteOfferById,
  editOfferPage,
  editOffer,
} = require("../controllers/offer");
const { authenticate } = require("../controllers/user");

// Pages
router.get("/create", [authenticate, createOfferPage]);
router.get("/:id", offerPage);
router.get("/:id/edit", [authenticate, editOfferPage]);
// CRUD
router.post("/create", [authenticate, createOffer]);
router.get("/:id/delete", [authenticate, deleteOfferById]);
router.post("/:id/edit", [authenticate, editOffer]);

module.exports = router;
