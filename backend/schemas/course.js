const { Binary } = require("mongodb");
const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({
    naziv: String,
    slika: String,
    opis: String,
    velikost:{ type : Array , "default" : [] },
    zdrastvenoStanje:{ type : Array , "default" : [] }
});

module.exports = mongoose.model("Course", courseSchema);