const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

exports.DonationSchema = new Schema({
  project_id:  String,
  campaign_id: String,
  date:   String,
  user_id: String
});
