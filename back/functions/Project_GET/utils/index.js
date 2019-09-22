const mongoose =  require('mongoose');

function dbSchema() {
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
        headers: {
            'X-Requested-With': '*',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,OPTIONS',
        },
        body: (body instanceof String) ? body : JSON.stringify(body),
    };
}

module.exports = {
    dbSchema,
    buildResp,
};
