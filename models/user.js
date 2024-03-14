const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  username: String,
  hashedPassword: String,
  phone: String,
  email: String,
});

module.exports = mongoose.model("User", UserSchema);
