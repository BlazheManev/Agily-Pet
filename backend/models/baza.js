const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.pes = require("./pes.model.js")(mongoose); //TU MOGOČE PSI
db.registriran_uporabniks = require("./uporabnik.model.js")(mongoose);
db.courses = require("./course.model.js")(mongoose);
db.event = require("./event.model.js")(mongoose);
db.following = require("./following.baza.js")(mongoose);

module.exports = db;