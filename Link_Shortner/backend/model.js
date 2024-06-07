const mongoose = require("mongoose");

mongoose.connect("your monogdb connection string")

const Urlschema = mongoose.Schema({
    url: String,
    hashedurl: String,
})

const Urls = mongoose.model("Urls",Urlschema);

module.exports={
    Urls
}
