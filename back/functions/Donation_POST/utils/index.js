const mongoose =  require('mongoose');

function schemaDonation() {
    const Schema = mongoose.Schema;
    
    return new Schema({
      project_id:  String,
      campaign_id: String,
      date:   String,
      user_id: String
    });
    
}

function schemaProject() {
    const Schema = mongoose.Schema;
    return new Schema({
        title:  String,
        assos_id: String,
        descrition: String,
        logo: String,
        photos: [String],
        donation_goal: Number,
        donation_current: Number,
    });   
}

function buildResp(code, body) {
    return {
        statusCode: code,
        body: (body instanceof String) ? body : JSON.stringify(body),
    };
}

module.exports = {
    schemaProject,
    schemaDonation,
    buildResp,
};
