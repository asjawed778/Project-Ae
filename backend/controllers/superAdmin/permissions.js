const Role = require('../../models/user/Role');
const Permission = require('../../models/user/Permissions');

exports.getAllRoles = async (req, res, next) => {
    try {
        const allRoles = await Role.find();

        return res.status(200).json({
            success: true,
            message: 'Super Admin, get all Role list',
            allRoles
        })
    } catch (error) {
        console.error('Error modifying permissions:', error);
        res.status(500).json({
            message: 'An error occurred while getting all Roles'
        });
    }
}

exports.getAllPermissions = async (req, res, next) => {
    try {
        const allPrmissions = await Permission.find();

        return res.status(200).json({
            success: true,
            message: 'Super Admin, get all permissions list',
            allPrmissions
        })
    } catch (error) {
        console.error('Error modifying permissions:', error);
        res.status(500).json({
            message: 'An error occurred while getting all permissions'
        });
    }
};

exports.modifyPermissions = async (req, res, next) => {
    try {
        const { roleId } = req.params;
        const { permissionIds } = req.body;

        // Find the role by ID
        const role = await Role.findById(roleId);
        if (!role) {
            const err = new Error("Role not found");
            err.status = 404;
            return next(err);
        }

        // Filter permissions to only keep those in permissionIds and add any new ones
        role.permissions = permissionIds;

        // Save the updated role document
        await role.save();

        res.status(200).json({
            message: 'Permissions updated successfully',
            role
        });
    } catch (error) {
        console.error('Error modifying permissions:', error);
        res.status(500).json({
            message: 'An error occurred while updating permissions'
        });
    }
};

