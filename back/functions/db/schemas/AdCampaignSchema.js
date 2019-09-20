const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

exports.AdCampaignSchema = new Schema({
  title:  String,
  description: String,
  logo:   String,
  annonceur_id: String,
  redirect_uri: String,
  video_uri: String
});
