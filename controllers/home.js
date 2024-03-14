const express = require("express");
const Offer = require("../models/offer");

homePage = async (req, res) => {
  const offers = await Offer.find({ public: true }).populate(
    "author",
    "name phone email"
  );
  const user = req.user;

  res.render("home", { offers, user, title: "Domů" });
};

module.exports = {
  homePage,
};
