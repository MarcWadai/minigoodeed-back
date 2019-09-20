const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

exports.DonationSchema = new Schema({
  name:  String,
  description: String,
  logo:   String,
});
