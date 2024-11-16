const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("../config/AWSConfig");
require('dotenv').config();


exports.putObject = async (file, fileName, contentType) => {
    try {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: file,
            ContentType: contentType,
        };

        const command = new PutObjectCommand(params);
        const data = await s3Client.send(command);

        if (data.$metadata.httpStatusCode !== 200) {
            console.error("S3 upload failed:", data);
            return null;
        }

        const url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION_NAME}.amazonaws.com/${fileName}`;
        console.log("Uploaded file URL:", url);
        return { url, key: fileName };
    } catch (err) {
        console.error("Error uploading file to S3:", err.message, err.stack);
        throw err;
    }
};