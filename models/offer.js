const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
  title: String,
  text: String,
  price: Number,
  public: Boolean,
  created: Date,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  
});

module.exports = mongoose.model("Offer", OfferSchema);
