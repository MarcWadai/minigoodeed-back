const {dbSchema, buildResp} = require('./utils');
const mongoose = require('mongoose');

let conn = null;
let Assos = null;

module.exports.handler = async (event, context, callback) => {
    try {
        const { assosId } = { ...event.pathParameters };
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
            Assos = conn.model('Association', dbSchema());
        }
        const assos = await Assos.findById(assosId).exec();
        console.log('assos', assos);
        callback(null, buildResp(200, assos));
    } catch (err) {
        console.error(err);
        callback(buildResp(500, err));
    }
};
