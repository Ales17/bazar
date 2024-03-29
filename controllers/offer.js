const Offer = require("../models/offer");
const user = require("../models/user");
// Offer controllers for pages and CRUD
const offer401msg = "Nemáte oprávnění upravovat tento inzerát";
const offer404msg = "Inzerát s tímto číslem nenalezen.";
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

const getOffersByAuthor = async (id) => {
  const offers = await Offer.find({ author: id })
    .populate("author", "name phone email")
    .exec();
  if (offers.length == 0) {
    return null;
  }
  return offers;
};

// Pages - GET
offerPage = async (req, res) => {
  const offer = await getOfferByID(req.params.id);

  const user = req.user;

  if (!offer) {
    res.status(404).render("message", {
      message: offer404msg,
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
      message: offer404msg,
      user,
    });
  } else {
    if (!req.user._id.equals(offer.author._id)) {
      res.status(401).render("message", {
        message: offer401msg,
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
// CRUD - POST / PATCH
createOffer = async (req, res) => {
  const user = req.user;
  const { title, text, price, public } = req.body;
  const offerToSave = new Offer({
    title,
    text,
    price,
    public,
    author: user.id,
    created: new Date(),
  });
  const offer = await offerToSave.save();
  res.status(201).redirect(`/offer/${offer.id}`);
};

editOffer = async (req, res) => {
  const { title, text, id, price, public } = req.body;
  const user = req.user;

  const offerToUpdate = await Offer.findById(id);
  if (!offerToUpdate.author._id.equals(user._id)) {
    res.status(401).render("message", {
      message: offer401msg,
      user,
    });
  } else {
    const offer = await Offer.findByIdAndUpdate(
      id,
      {
        title: title,
        text: text,
        price: price,
        public: public,
      },
      { new: true } // Return UPDATED, not original doc.
    ).populate("author", "name phone email");
    res.render("offer", {
      offer,
      message: "Změny inzerátu byly uloženy",
      user,
    });
  }
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
  getOfferByIdJson,
  getOffersByAuthor,
  offerPage,
  deleteOfferById,
};
