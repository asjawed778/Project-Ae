const expressListEndpoints = require('express-list-endpoints');
const Permission = require('../models/user/Permissions'); // Assuming you have the Permission model

/**
 * Register all routes and their methods dynamically as permissions.
 * This function will be called at the startup of the app to ensure every route has a corresponding permission.
 */
async function registerRoutes(app) {
    try {
        const routes = expressListEndpoints(app);

        for (const route of routes) {
            for (const method of route.methods) {
                // Check if the permission already exists for the route and method
                const existingPermission = await Permission.findOne({
                    route: route.path,
                    action: method
                });

                if (!existingPermission) {
                    // Create a new permission if it does not exist
                    const newPermission = new Permission({
                        route: route.path,
                        action: method
                    });

                    await newPermission.save();
                    // console.log(`Added permission for ${method} ${route.path}`);
                }
            }
        }
    } catch (error) {
        console.error('Error registering routes as permissions:', error);
    }
}

module.exports = registerRoutes;
