const mongoose = require('mongoose');


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
    const UserSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String
    });
    return mongoose.model('User', UserSchema);
}

module.exports = {
    userModel,
    connectToDatabase
}