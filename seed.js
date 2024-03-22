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
  {
    _id: "65fd2a1a22a9472d00ca8f84",
    title: "Robot Bosch",
    text: "Daruji robot Bosch, stáří asi 20 let.",
    price: 0,
    public: true,
    author: "65fd29f522a9472d00ca8f7f",
  },
];

let users = [
  {
    _id: "65f364e2e2c4516182b9f863",
    name: "Jana Nováková",
    username: "jana",
    hashedPassword:
      "$2a$10$L/SDur8H/zScErTPU6kCD.vRy2lHF4vIdeVqHm7jEIcmFUvIuGiJu",
    phone: "777999777",
    email: "jana@uhk.cz",
  },
  {
    _id: "65f36572e2c4516182b9f872",
    name: "Petr Novák",
    username: "petr",
    hashedPassword:
      "$2a$10$6ha2i4qKo6KkTilgxctF3O.K03AyTelTdtcoI.SGQ4o0a96H1mkei",
    phone: "737000737",
    email: "petr@uhk.cz",
  },
  {
    _id: "65fd29f522a9472d00ca8f7f",
    name: "Honza Lopuch",
    username: "honza",
    hashedPassword:
      "$2a$10$oyTi1iPpapeIU9m27Kt6juVbadIYTomCcRnm0KgaiP03h9Mg5FldG",
    phone: "608000608",
    email: "honza@lopuch.cz",
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
