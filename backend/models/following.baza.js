module.exports = mongoose => {

    var schema = mongoose.Schema(
        {
            username: {type:String ,required:true, unique:true},
            mail: {type:String ,required:true, unique:true},
            ident: {type:String ,required:true, unique:true},
            emails: [String]
        }
      );

      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });

    const Following = mongoose.model("following", schema); 
    return Following;
};