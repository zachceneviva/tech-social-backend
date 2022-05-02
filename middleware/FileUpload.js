const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const S3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

/**
 * @requires aws-sdk
 * @requires multer
 * @requires multer-s3
 */
const uploadImage = multer({
  storage: multerS3({
    s3: S3,
    bucket: 'techonnect',
    key: (req, file, cb) => {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = uploadImage