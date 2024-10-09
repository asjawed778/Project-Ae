const cloudinary = require('cloudinary').v2;

exports.uploadFileToCloudinary = async (file, folder, quality) => {
    try {
        const options = {
            resource_type: 'auto',
        };

        if (folder) {
            options.folder = folder;
        }

        if (quality) {
            options.quality = quality;
        }

        // Check if multiple files are provided
        if (Array.isArray(file)) {
            const uploadedFiles = [];
            for (const singleFile of file) {
                if (singleFile.tempFilePath) {
                    const result = await cloudinary.uploader.upload(singleFile.tempFilePath, options);
                    uploadedFiles.push(result);
                } else {
                    throw new Error('Missing tempFilePath in one of the files');
                }
            }
            return uploadedFiles;
        } else {
            // Handle single file upload
            if (file.tempFilePath) {
                const result = await cloudinary.uploader.upload(file.tempFilePath, options);
                return [result];
            } else {
                throw new Error('Missing tempFilePath for file');
            }
        }
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        throw error;
    }
};
