const {dbSchema, buildResp} = require('./utils');
const mongoose = require('mongoose');

let conn = null;

module.exports.handler = async (event, context, callback) => {
    try {
        context.callbackWaitsForEmptyEventLoop = false;
        if (conn == null) {
            conn = await mongoose.createConnection(process.env.MONGO_URI, {
                // Buffering means mongoose will queue up operations if it gets
                // disconnected from MongoDB and send them when it reconnects.
                // With serverless, better to fail fast if not connected.
                bufferCommands: false, // Disable mongoose buffering
                bufferMaxEntries: 0, // and MongoDB driver buffering
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        }
        const Assos = conn.model('Association', dbSchema());
        const assosList = await Assos.find({}).exec();
        console.log('assosList', assosList);
        callback(null, buildResp(200, assosList));
    } catch (err) {
        console.error(err);
        callback(buildResp(500, err));
    }
};
