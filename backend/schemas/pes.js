const mongoose = require("mongoose");

const pesSchema = new mongoose.Schema({
    ime: String,
    pasma: String,
    visina: Number,
    starost: Number,
    zdrastvenoStanje: String
});

module.exports = mongoose.model("Pes", pesSchema);