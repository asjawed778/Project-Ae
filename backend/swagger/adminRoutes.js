module.exports = {
    '/admin/get-all-roles': {
        get: {
            tags: ['AdminRoutes'],
            summary: 'Retrieve all roles',
            description: 'Fetches a list of all roles available in the system, including their name, description, and associated permissions.',
            security: [
                {
                    BearerAuth: [],
                },
            ],
            responses: {
                200: {
                    description: 'Successfully retrieved all roles',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: true,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Super Admin, get all Role list',
                                    },
                                    allRoles: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                _id: {
                                                    type: 'string',
                                                    example: '64ae08b1f85a9b0023f41c40',
                                                },
                                                roleName: {
                                                    type: 'string',
                                                    example: 'ADMIN',
                                                },
                                                description: {
                                                    type: 'string',
                                                    example: 'Administrative role with all permissions.',
                                                },
                                                permissions: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'object',
                                                        properties: {
                                                            _id: {
                                                                type: 'string',
                                                                example: '64ae08b1f85a9b0023f41c45',
                                                            },
                                                            permissionName: {
                                                                type: 'string',
                                                                example: 'READ_PRIVILEGES',
                                                            },
                                                        },
                                                    },
                                                    example: [
                                                        {
                                                            _id: '64ae08b1f85a9b0023f41c45',
                                                            permissionName: 'READ_PRIVILEGES',
                                                        },
                                                        {
                                                            _id: '64ae08b1f85a9b0023f41c46',
                                                            permissionName: 'WRITE_PRIVILEGES',
                                                        },
                                                    ],
                                                },
                                                createdAt: {
                                                    type: 'string',
                                                    example: '2024-11-01T10:15:30.000Z',
                                                },
                                            },
                                        },
                                        example: [
                                            {
                                                _id: '64ae08b1f85a9b0023f41c40',
                                                roleName: 'ADMIN',
                                                description: 'Administrative role with all permissions.',
                                                permissions: [
                                                    {
                                                        _id: '64ae08b1f85a9b0023f41c45',
                                                        permissionName: 'READ_PRIVILEGES',
                                                    },
                                                    {
                                                        _id: '64ae08b1f85a9b0023f41c46',
                                                        permissionName: 'WRITE_PRIVILEGES',
                                                    },
                                                ],
                                                createdAt: '2024-11-01T10:15:30.000Z',
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
                500: {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: false,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'An error occurred while getting all Roles',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },

    '/admin/get-all-permission': {
        get: {
            tags: ['AdminRoutes'],
            summary: 'Retrieve all permissions',
            description: 'Fetches a list of all permissions available in the system, including the route and action type.',
            security: [
                {
                    BearerAuth: [],
                },
            ],
            responses: {
                200: {
                    description: 'Successfully retrieved all permissions',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: true,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Super Admin, get all permissions list',
                                    },
                                    allPrmissions: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                _id: {
                                                    type: 'string',
                                                    example: '64ae08b1f85a9b0023f41c50',
                                                },
                                                route: {
                                                    type: 'string',
                                                    example: '/user/get-user-details',
                                                },
                                                action: {
                                                    type: 'string',
                                                    enum: ['GET', 'POST', 'PUT', 'DELETE'],
                                                    example: 'GET',
                                                },
                                            },
                                        },
                                        example: [
                                            {
                                                _id: '64ae08b1f85a9b0023f41c50',
                                                route: '/user/get-user-details',
                                                action: 'GET',
                                            },
                                            {
                                                _id: '64ae08b1f85a9b0023f41c51',
                                                route: '/course/add-course',
                                                action: 'POST',
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
                500: {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: false,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'An error occurred while getting all permissions',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },

    '/admin/modify-permission': {
        put: {
            tags: ['AdminRoutes'],
            summary: 'Modify permissions for a role',
            description: 'Updates the permissions assigned to a specific role by modifying its list of permissions.',
            security: [
                {
                    BearerAuth: [],
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                roleId: {
                                    type: 'string',
                                    description: 'ID of the role to modify permissions for',
                                    example: '64ae08b1f85a9b0023f41c60',
                                },
                                permissionIds: {
                                    type: 'array',
                                    description: 'List of permission IDs to assign to the role',
                                    items: {
                                        type: 'string',
                                        example: '64ae08b1f85a9b0023f41c70',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Permissions successfully updated',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Permissions updated successfully',
                                    },
                                    role: {
                                        type: 'object',
                                        properties: {
                                            _id: {
                                                type: 'string',
                                                example: '64ae08b1f85a9b0023f41c60',
                                            },
                                            roleName: {
                                                type: 'string',
                                                example: 'ADMIN',
                                            },
                                            permissions: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                    example: '64ae08b1f85a9b0023f41c70',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'Role not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Role not found',
                                    },
                                },
                            },
                        },
                    },
                },
                500: {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'An error occurred while updating permissions',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },


}