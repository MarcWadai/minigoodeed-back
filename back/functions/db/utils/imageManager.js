
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const bucketName = process.env.GOODEED_AWS_S3_BUCKET;

function _buildFileName(objectId) {
    return `minigoodeed_${objectId}_${Date.now()}.png`;
}
function uploadImg(objectId, encodedImage) {
    return new Promise((resolve) => {
        const decodedImage = Buffer.from(encodedImage, 'base64');
        const filePath = _buildFileName(objectId);
        const params = {
            Body: decodedImage,
            Bucket: bucketName,
            Key: filePath,
        };
        s3.upload(params, (err) => {
            if (err) {
                console.error(err);
                resolve('default.png');
            } else {
                resolve(filePath);
            }
        });
    });
}

async function multipleUploadImg(arrayObj) {
    try {
        const arrayPromise = arrayObj.map(one => uploadImg(one.objectId, one.encodedImage));
        const arrayRes = await Promise.all(arrayPromise);    
        return Promise.resolve(arrayRes);
    } catch(err) {
        console.error(err);
        return Promise.resolve([]);
    }
}

module.exports = {
    uploadImg,
    multipleUploadImg
};
