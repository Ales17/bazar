const express = require("express");
const Offer = require("../models/offer");
const user = require("../models/user");
const { render } = require("ejs");

// Util
const getOfferByID = async (id) => {
  return await Offer.findById(id).populate("author", "name phone email");
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
  res.render("offer", { offer, user, title: "Detail nabídky" });
};

editOfferPage = async (req, res) => {
  const offer = await getOfferByID(req.params.id);
  res.render("edit", { offer, title: "Upravit nabídku" });
};

createOfferPage = (req, res) => {
  const user = req.user;
  res.render("new", { user });
};
// CRUD
createOffer = async (req, res) => {
/*   if (!req.user) {
    res.status(401).send("Nejste přihlášeni");
    return;
  } */
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
  //res.send('DELETED. <a href="/">Go home</a>');
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
