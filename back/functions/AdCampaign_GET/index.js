const { dbSchema, buildResp } = require('./utils');
const mongoose = require('mongoose');

let conn = null;
let AdCampaign = null
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
            AdCampaign = conn.model('AdCampaign', dbSchema());
        }
        const count = await AdCampaign.count().exec();
        console.log('count', count);
        // Get a random entry
        const random = Math.floor(Math.random() * count);
        // Again query all ad but only fetch one offset by our random #
        console.log('random', random);
        const ad = await AdCampaign.findOne().skip(random).exec();
        console.log('ad', ad);
        callback(null, buildResp(200, ad));
    } catch (err) {
        console.error(err);
        callback(buildResp(500, err));
    }
};
