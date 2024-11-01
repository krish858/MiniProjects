require("dotenv").config();
const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl);

const Urlschema = mongoose.Schema({
  url: String,
  hashedurl: String,
});

const Urls = mongoose.model("Urls", Urlschema);

module.exports = {
  Urls,
};
