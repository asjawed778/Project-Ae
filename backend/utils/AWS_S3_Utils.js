const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("../config/AWS_S3_Config");
const fs = require("fs");
require('dotenv').config();

exports.putObject = async (file, folderName = '') => {
    try {
        const fileBuffer = fs.readFileSync(file.tempFilePath);
        const fileName = Date.now() + file.name;
        const contentType = file.mimetype;
        const key = folderName ? `${folderName}/${fileName}` : fileName;

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: fileBuffer,
            ContentType: contentType,
        };

        const command = new PutObjectCommand(params);
        const data = await s3Client.send(command);

        if (data.$metadata.httpStatusCode !== 200) {
            console.error("S3 upload failed:", data);
            return null;
        }

        const url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION_NAME}.amazonaws.com/${key}`;
        console.log("Uploaded file URL:", url);
        return { url, key };
    } catch (err) {
        console.error("Error uploading file to S3:", err.message, err.stack);
        throw err;
    }
};

exports.deleteObject = async (url) => {
    try {
        // Extract the S3 key from the URL
        const bucketName = process.env.S3_BUCKET_NAME;
        const bucketUrl = `https://${bucketName}.s3.${process.env.S3_REGION_NAME}.amazonaws.com/`;
        if (!url.startsWith(bucketUrl)) {
            throw new Error("Invalid URL: does not match the configured S3 bucket");
        }

        const key = url.replace(bucketUrl, '');

        // Prepare S3 delete parameters
        const params = {
            Bucket: bucketName,
            Key: key,
        };

        // Delete the object
        const command = new DeleteObjectCommand(params);
        const data = await s3Client.send(command);

        console.log(`File deleted: ${key}`);
        return { success: true, key };
    } catch (err) {
        console.error("Error deleting file from S3:", err.message, err.stack);
        throw err;
    }
};

