const mongoose =  require('mongoose');

function dbSchema() {
    const Schema = mongoose.Schema;
    return new Schema({
        name:  String,
        description: String,
        logo:   String,
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
