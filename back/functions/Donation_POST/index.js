const {schemaDonation, schemaProject , buildResp} = require('./utils');
const mongoose = require('mongoose');

let conn = null;
let Donation = null;
let Project = null;

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
            Donation = conn.model('Donation', schemaDonation());
            Project = conn.model('Project', schemaProject());
        }
        const userId = event.requestContext.authorizer.principalId;
        console.log('event donation', userId);
        const body = JSON.parse(event.body)
        console.log('event donation body', event.body);
        const don = await new Donation({ 
                project_id: body.project_id,
                campaign_id: body.campaign_id,
                date:   Date.now(),
                user_id: userId}).save();
        console.log('don', don);
        await updateProjectCount(body.project_id);
        callback(null, buildResp(200, don));
    } catch (err) {
        console.error(err);
        callback(buildResp(500, err));
    }
};

async function updateProjectCount(projecId) {
    try {
        const project = await Project.findById(projecId).exec();
        console.log('project found', project)
        project.donation_current = project.donation_current + 1;
        const newProj = await new Project(project).save();
        console.log('newProj', newProj)
        return newProj;
    } catch(err) {
        return err;
    }
    
}