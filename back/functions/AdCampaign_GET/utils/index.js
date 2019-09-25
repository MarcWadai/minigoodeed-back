const mongoose =  require('mongoose');

function dbSchema() {
    const Schema = mongoose.Schema;
    return new Schema({
        title:  String,
        description: String,
        logo:   String,
        annonceur_id: String,
        redirect_uri: String,
        video_uri: String
      });
}

function buildResp(code, body) {
    return {
        statusCode: code,
        headers: {
        //     'X-Requested-With': '*',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
            'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'GET,OPTIONS',
        },
        body: (body instanceof String) ? body : JSON.stringify(body),
    };
}

module.exports = {
    dbSchema,
    buildResp,
};
