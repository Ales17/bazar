const express = require("express");
const Offer = require("../models/offer");
const user = require("../models/user");

// Util
const getOfferByID = async (offerId) => {
  try {
    const offer = await Offer.findOne({ _id: offerId }).populate(
      "author",
      "name phone email"
    );
    return offer;
  } catch (error) {
    return null;
  }
};

const getOffersByAuthorJson = async (id) => {
  return await Offer.find({ author: id }).populate(
    "author",
    "name phone email"
  );
};

// Pages
offerPage = async (req, res) => {
  const offer = await getOfferByID(req.params.id);

  const user = req.user;
  if (!offer) {
    res.status(404).render("message", {
      message: "Inzerát s tímto číslem nenalezen.",
      user,
    });
  } else {
    res.render("offer", { offer, user, title: "Detail nabídky" });
  }
};

editOfferPage = async (req, res) => {
  const offer = await getOfferByID(req.params.id);

  if (!offer) {
    res.status(404).render("message", {
      message: "Inzerát s tímto číslem nenalezen.",
      user,
    });
  } else {
    if (!req.user._id.equals(offer.author._id)) {
      res.status(401).render("message", {
        message: "Nemáte oprávnění upravovat tento inzerát.",
        user,
      });
    } else {
      res.render("edit", { offer, title: "Upravit inzerát" });
    }
  }
};

createOfferPage = (req, res) => {
  const user = req.user;
  res.render("new", { user });
};
// CRUD
createOffer = async (req, res) => {

  const user = req.user;
  const { title, text, price, public } = req.body;
  console.log(req.body);
  console.log(public);
  const offerToSave = new Offer({
    title,
    text,
    price,
    public,
    author: user.id,
    created: new Date(),
  });
  const offer = await offerToSave.save();
  //res.status(201).send(offer);
  res.status(201).redirect(`/offer/${offer.id}`);
};

editOffer = async (req, res) => {
  const { title, text, id, price, public } = req.body;
  const offer = await Offer.findByIdAndUpdate(
    id,
    {
      title: title,
      text: text,
      price: price,
      public: public,
    },
    { new: true }
  );

  res.render("offer", { offer, message: "Změny v nabídce byly uloženy." });
};

getOfferByAuthor = async (req, res) => {
  const offers = await getOffersByAuthorJson(req.params.author);
  res.send(offers);
};

deleteOfferById = async (req, res) => {
  await Offer.findByIdAndDelete(req.params.id);
  res.redirect("/");
};

getOfferByIdJson = async (req, res) => {
  const offer = this.getOfferById(req.params.id);
  res.send(offer);
};

module.exports = {
  createOfferPage,
  createOffer,
  editOffer,
  editOfferPage,
  getOfferByAuthor,
  getOfferByIdJson,
  getOffersByAuthorJson,
  offerPage,
  deleteOfferById,
};
