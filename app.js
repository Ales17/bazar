const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

const { middleware } = require("./controllers/user");
const methodOverride = require("method-override");

const PORT = process.env.PORT || 3000;

// DB
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/tnpw_ales")
  .catch((error) => console.error("Chyba při připojení k databázi", error));

const db = mongoose.connection;
db.once("open", () => {
  console.log("Databáze je připojená");
});

// App utils
app.use(methodOverride("_method"));
app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(middleware);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(__dirname + "/public"));

// App routes
app.use("/offer/", require("./routes/offer"));
app.use("/user/", require("./routes/user"));
app.use("/", require("./routes/home"));

// Handling unknown requests
const handleError = (res, message, status) => {
  res.status(status).render("message", {
    message: message,
  });
};

app.use("*", (req, res) => {
  let message = "Neplatný požadavek";
  let status = 400;
  if (req.method == "GET") {
    status = 404;
    message = "Stránka nenalezena.";
  }
  handleError(res, message, status);
});

// App listening
app.listen(PORT, () => {
  console.log("Server běží na portu", PORT);
});
