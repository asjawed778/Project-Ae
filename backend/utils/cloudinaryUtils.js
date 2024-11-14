const cloudinary = require('cloudinary').v2;

exports.checkFileType = (filename, allowedExtensions) => {
    // Get the file extension by splitting the filename at the last dot
    const fileExtension = filename.split('.').pop().toLowerCase();

    // Check if the file extension is in the list of allowed extensions
    return allowedExtensions.includes(fileExtension);
}


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

exports.getCloudinaryPublicId = (url) => {
    const parts = url.split('/');
    const publicIdWithExtension = parts[parts.length - 1];
    const publicId = publicIdWithExtension.split('.')[0];
    return parts.slice(parts.length - 2, parts.length - 1) + '/' + publicId;
};

/**
 * Delete a file from Cloudinary using its public ID.
 * 
 * @param {string} publicId - The public ID of the file to delete.
 * @param {string} resourceType - The type of resource (image, video, etc.). Defaults to 'image'.
 * 
 * @returns {Promise<Object>} - Returns the result of the deletion operation.
 */
exports.deleteFileFromCloudinary = async (publicId, resourceType = 'image') => {
    try {
        // Check if publicId is provided
        if (!publicId) {
            throw new Error("Public ID is required to delete a file from Cloudinary");
        }

        // Delete the file using the public ID
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType, // Set resource type (image, video, etc.)
        });

        // Return the result of the deletion
        return result;
    } catch (error) {
        console.error('Error deleting file from Cloudinary:', error);
        throw error;
    }
};

