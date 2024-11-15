const Permission = require('../models/user/Permissions');
const Role = require('../models/user/Role');

// Authorization middleware
exports.isAuthorized = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id || !req.user.role) {
            const err = new Error("Please login to get Authorized");
            err.status = 401;
            return next(err);
        }
        const { role } = req.user;

        if (role.roleName === 'SUPERADMIN') {
            return next();
        }

        // Get the current route and method
        const route = req.route.path;
        const method = req.method;

        // Check if the user's role permissions contain the required route and action
        const hasPermission = role.permissions.some(permission =>
            permission.route === route && permission.action === method
        );

        if (!hasPermission) {
            const err = new Error("Access denied. You do not have permission to perform this action.");
            err.status = 403;
            return next(err);
        }

        // User has the necessary permission
        next();
    } catch (error) {
        console.error(error);
        return next(error);
    }
};
