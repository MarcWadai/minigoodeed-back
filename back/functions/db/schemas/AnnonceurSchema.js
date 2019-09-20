const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

exports.AnnonceurSchema = new Schema({
  name:  String,
  description: String,
  logo:   String,
});