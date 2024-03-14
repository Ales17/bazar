const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const ejs = require("ejs");
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

// Parsing the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(middleware);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(__dirname + "/public"));

app.use("/offer/", require("./routes/offer"));
app.use("/user/", require("./routes/user"));
app.use("/", require("./routes/home"));

// debug test
app.post("*", (req, res) => {
  res.send(req.body);
});

app.get("*", (req, res) => {
  res.status(404).render("error", { message: "Tato strana nebyla nalezena" });
});

app.listen(PORT, () => {
  console.log("Server běží na portu", PORT);
});
