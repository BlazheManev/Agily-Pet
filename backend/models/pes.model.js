module.exports = mongoose => {
    var schema = mongoose.Schema(
      {

        ime: {type:String ,required:true},
            pasma: {type:String ,required:true},
            visina: {type:Number ,required:true},
            starost: {type:Number ,required:true},
            manjkaEna: {type:Boolean},
            manjkataDve: {type:Boolean},
            sklepi: {type:Boolean}
      }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Pes = mongoose.model("pes", schema);
    return Pes;
  };
  