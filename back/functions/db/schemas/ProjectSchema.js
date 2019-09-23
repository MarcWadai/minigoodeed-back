const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

exports.ProjectsSchema = new Schema({
  title:  String,
  assos_id: String,
  description: String,
  logo: String,
  photos: [String],
  donation_goal: Number,
  donation_current: Number,
});
