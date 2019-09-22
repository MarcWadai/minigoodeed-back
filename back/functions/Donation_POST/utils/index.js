const mongoose =  require('mongoose');

function dbSchema() {
    const Schema = mongoose.Schema;
    
    return new Schema({
      project_id:  String,
      campaign_id: String,
      date:   String,
      user_id: String
    });
    
}

function buildResp(code, body) {
    return {
        statusCode: code,
        body: (body instanceof String) ? body : JSON.stringify(body),
    };
}

module.exports = {
    dbSchema,
    buildResp,
};
