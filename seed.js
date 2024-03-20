const mongoose = require("mongoose");
const User = require("./models/user");
const Offer = require("./models/offer");

let offers = [
  {
    _id: "65f36517e2c4516182b9f867",
    title: "Daruji koťátka",
    text: "Daruji koťátka, k odběru v půlce dubna.",
    price: 0,
    public: true,
    author: "65f364e2e2c4516182b9f863",
  },
  {
    _id: "65f365a0e2c4516182b9f877",
    title: "Kodiaq Active",
    text: "Prodám Kodiaq Active, rok výroby 2017, najeto 125 000 km. ",
    price: 550000,
    public: false,
    author: "65f36572e2c4516182b9f872",
  },
  {
    _id: "65f365ffe2c4516182b9f87f",
    title: "Hledám byt ",
    text: "Koupím byt 2+1 nebo 3+kk v Jičíně. Spěchá.",
    price: 0,
    public: true,
    author: "65f36572e2c4516182b9f872",
  },
  {
    _id: "65f36643e2c4516182b9f885",
    title: "Díly Trabant",
    text: "Prodám díly na Trabant - víko kufru, přední pravé dveře, přední levý blatník. Ceny dohodou.",
    price: 1,
    public: true,
    author: "65f36572e2c4516182b9f872",
  },
];

let users = [
  {
    _id: "65f364e2e2c4516182b9f863",
    name: "Jana Nováková",
    username: "jana",
    hashedPassword: "vkgNMhDlbnhZR5QP7dAHrU6wSbhJ5d7wQd2QWVzCIKI=",
    phone: "777777777",
    email: "jana@uhk.cz",
  },
  {
    _id: "65f36572e2c4516182b9f872",
    name: "Petr Novák",
    username: "petr",
    hashedPassword: "Nmd5FkLjioqwmYegteBRvbs3STf9d1ysmoMixho+wKI=",
    phone: "666666666",
    email: "petr@uhk.cz",
  },
];

mongoose
  .connect("mongodb://127.0.0.1:27017/tnpw_ales")
  .catch((error) => console.log(error));

const db = mongoose.connection;
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await User.deleteMany({});
  await User.insertMany(users);
  await Offer.deleteMany({});
  await Offer.insertMany(offers);
};

seedDB()
  .then(() => {
    mongoose.connection.close();
    console.log("Writing to DB successful, DB disconnected");
  })
  .catch((error) => {
    console.log("Error while writing to DB");
  });