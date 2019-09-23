const mongoose = require('mongoose');
const { AssociationSchema, ProjectSchema, AdCampaignSchema, AnnonceurSchema } = require('./schemas');
const { AssociationData, ProjectData, AdCampaignData, AnnonceurData } = require('./data');
const { uploadImg, multipleUploadImg } = require('./utils/imageManager.js');
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

        
        const Assos = conn.model('Association', AssociationSchema);
        const Proj = conn.model('Project', ProjectSchema);
        const Ann = conn.model('Annonceur', AnnonceurSchema);
        const AdC = conn.model('AdCampaign', AdCampaignSchema);
        // const Proj = db.model('Project', ProjectSchema);
        // TODO first frop all collections before inserting new
        await dropingCollections([Assos, Proj, Ann, AdC]);

        //We first need to upload the images from each object to S3 database
        const [associationDataWithImg, projDataWithImg, annonceurWithImg, adCampaignImg] = await Promise.all([
            await processImage(AssociationData),
            await processImage(ProjectData),
            await processImage(AnnonceurData),
            await processImage(AdCampaignData)
        ]);

        // or, for inserting large batches of documents
        await Promise.all([
            await Assos.insertMany(associationDataWithImg),
            await Proj.insertMany(projDataWithImg),
            await Ann.insertMany(annonceurWithImg),
            await AdC.insertMany(adCampaignImg)
        ]);
        callback(null, 'success db initialization');
    } catch (err) {
        console.error(err);
        callback(err);
    }
};

// upload image to S3 and return the url that will be saved in the DB
function processImage(arrayObj) {
    const arrayPromise = arrayObj.map(async one => {
        const logoURI = (one.logo) ? await uploadImg(one._id, one.logo) : one.logo;
        const photosURI = (one.photos) ? await multipleUploadImg(one.photos.map(o => { return { objectId: one._id, encodedImage: o } })) : [];
        
        return (photosURI.length) ? Promise.resolve({ ...one, logo: addS3URI(logoURI), photos: addS3URI(photosURI) }) : Promise.resolve({ ...one, logo: logoURI });
    });
    return Promise.all(arrayPromise);
}

function addS3URI(uri) {
  return `https://${process.env.GOODEED_AWS_S3_BUCKET}.s3-${process.env.GOODEED_AWS_REGION}.amazonaws.com/${uri}`;
}
async function dropingCollections(collections) {
    for ( let model of collections ) {
        try {
          await model.collection.drop();
        } catch (e) {
          if (e.code === 26) {
            console.log('namespace %s not found',model.collection.name)
          } else {
            throw e;
          }
        }
      }
}

// function addIdToDocument(arrayDocs) {
//     return arrayDocs.map(one => {
//         return {
//             ...one,
//             _id: new mongoose.Types.ObjectId()
//         }
//     });
// }

