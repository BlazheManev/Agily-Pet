var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose => {

var eventSchema = new Schema({
	ime: { type: String, required: true },
	datum: { type: String, required: true },
	opis: {type: String, required: true},
	naslov: {type: String, required:true},
	prijavljeni_Users:{ type : Array , "default" : [] },

});

eventSchema.method("toJSON", function() {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
  });

  const Event = mongoose.model("events", eventSchema);
  return Event;
}