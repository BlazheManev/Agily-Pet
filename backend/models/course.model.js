module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
        naziv: {type:String ,required:true},
        slika: {type:String},
        opis: {type:String ,required:true},
        //velikost:{ type : Array , "default" : [] },
        manjkaEna: {type:Boolean},
        manjkataDve: {type:Boolean},
        sklepi: {type:Boolean},
        uporabnik: [String],
        jeDodal:{type:String}
        }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Course = mongoose.model("courses", schema);
    return Course;
  };