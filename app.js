const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const ejs = require("ejs");
const methodOverride = require("method-override")
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { middleware } = require("./controllers/user");
const path = require("path");

mongoose
  .connect("mongodb://127.0.0.1:27017/tnpw_ales")
  .catch((error) => console.error("Chyba při připojení k databázi", error));

const db = mongoose.connection;

db.once("open", () => {
  console.log("Databáze je připojená");
});

// Utils
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(middleware);
app.use(methodOverride('_method'))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(__dirname + "/public"));

app.use("/offer/", require("./routes/offer"));
app.use("/user/", require("./routes/user"));
app.use("/", require("./routes/home"));

app.get("*", (req, res) => {
  res.status(404).render("message", {
    message: "Tato strana nebyla nalezena.",
  });
});

app.listen(PORT, () => {
  console.log("Server běží na portu", PORT);
});
