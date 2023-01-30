const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const uporabnikShema = new mongoose.Schema({
    email: {type:String ,required:true, unique:true},
    username: {type:String ,required:true, unique:true},
    password: {type:String ,required:true},
    token:{type:String},
    course:{ type : Array , "default" : [] },
    prijavljeni:{ type : Array , "default" : [] },
    pes:{ type : Array , "default" : [] }
});

module.exports = mongoose.model("Registriran_Uporabnik", uporabnikShema);
