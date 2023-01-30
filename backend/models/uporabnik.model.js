module.exports = mongoose => {


    var pesSchema = mongoose.Schema({
      ime: {type:String ,required:true},
      pasma: {type:String ,required:true},
      visina: {type:Number ,required:true},
      starost: {type:Number ,required:true},
      manjkaEna: {type:Boolean},
      manjkataDve: {type:Boolean},
      sklepi: {type:Boolean}
    });

    var schema = mongoose.Schema(
        {
            email: {type:String ,required:true, unique:true},
            username: {type:String ,required:true, unique:true},
            password: {type:String ,required:true},
            token:{type:String},
            course:{ type : Array , "default" : [] },
            prijavljeni:{ type : Array , "default" : [] },
            pes: [pesSchema],
            course: [String],
            event:{ type : Array , "default" : [] },
            event:[String],

        }
      );

      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });

    const Uporabnik = mongoose.model("registriran_uporabniks", schema);  //mogoce kakse drugo ime v model
    return Uporabnik;
};
