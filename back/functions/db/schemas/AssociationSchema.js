const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

exports.AssociationSchema = new Schema({
  name:  String,
  description: String,
  logo:   String,
});
