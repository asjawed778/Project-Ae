const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    route: {
        type: String,
        required: true,
        unique: true
    },
    action: {
        type: String,
        enum: ['GET', 'POST', 'PUT', 'DELETE'],
        required: true
    }
});

module.exports = mongoose.model('Permission', permissionSchema);
