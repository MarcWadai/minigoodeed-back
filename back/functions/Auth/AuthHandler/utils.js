const mongoose = require('mongoose');
let isConnected = null;
let uModel = null;

function connectToDatabase() {
    if (isConnected) {
        console.log('=> using existing database connection');
        return Promise.resolve();
    }

    console.log('=> using new database connection');
    return mongoose.connect(process.env.MONGO_URI, {
        bufferCommands: false, // Disable mongoose buffering
        bufferMaxEntries: 0, // and MongoDB driver buffering
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(db => {
        isConnected = db.connections[0].readyState;
    });
};


function userModel() {
    if (uModel) {
        return uModel;
    }
    const UserSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String
    });
    uModel= mongoose.model('User', UserSchema)
    return uModel;
}

function buildResp(code, body) {
    return {
        statusCode: code,
        headers: {
            // 'X-Requested-With': '*',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
            'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'GET,OPTIONS',
            // 'Access-Control-Allow-Credentials': true,
        },
        body: (body instanceof String) ? body : JSON.stringify(body),
    };
}
module.exports = {
    userModel,
    connectToDatabase,
    buildResp
}