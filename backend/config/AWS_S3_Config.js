const { S3Client } = require("@aws-sdk/client-s3");

exports.s3Client = new S3Client({
    region: process.env.S3_REGION_NAME,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    }
})