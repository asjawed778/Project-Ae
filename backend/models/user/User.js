const mongoose = require('mongoose');
const Role = require('./Role');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        default: null
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdditionlDetails'
    },
    profilePic: {
        type: String,
    }
});

// Pre-save hook to set default role to 'USER' if no role is provided
userSchema.pre('save', async function (next) {
    if (!this.role) {
        // Find the ObjectId of the 'USER' role
        const userRole = await Role.findOne({ roleName: 'USER' });
        if (userRole) {
            this.role = userRole._id;
        }
    }
    next();
});

module.exports = mongoose.model("User", userSchema);
