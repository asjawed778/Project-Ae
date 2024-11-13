const mongoose = require('mongoose');
const Permission = require('./Permissions');

const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },
    description: {
        type: String,
        trim: true
    },
    permissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Permission'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Role = mongoose.model('Role', roleSchema);

// Initialize roles on first connection to the database
mongoose.connection.once('open', async () => {
    try {
        // Check for existing roles
        const superAdminExists = await Role.exists({ roleName: 'SUPERADMIN' });
        const userExists = await Role.exists({ roleName: 'USER' });
        const guestExists = await Role.exists({ roleName: 'GUEST' });

        // Create roles if they don't exist
        if (!superAdminExists) {
            const superAdminRole = await Role.create({
                roleName: 'SUPERADMIN',
                description: 'Super Administrator with full permissions'
            });

            
            // Here assigning all permissions to SUPERADMIN
            const allPermissions = await Permission.find();
            superAdminRole.permissions = allPermissions.map(permission => permission._id);
            await superAdminRole.save();
        }

        if (!userExists) {
            await Role.create({ roleName: 'USER', description: 'Regular user with limited permissions' });
        }

        if (!guestExists) {
            await Role.create({ roleName: 'GUEST', description: 'Guest User with some permissions' });
        }

    } catch (error) {
        console.error('Error initializing roles:', error);
    }
});

module.exports = Role;
