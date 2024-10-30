/*
 * API Documentation for User Routes
 *
 * This module exports the OpenAPI (Swagger) documentation for various post-related routes in the application.
 * Each endpoint includes details about request and response formats, parameters, possible status codes, 
 * and example payloads to assist developers in understanding how to interact with these routes.
 */


module.exports = {
    '/send-signup-otp': {
        post: {
            tags: ['UserRoutes'],
            summary: 'Request OTP for User Signup',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                name: { type: 'string', example: 'Amit Kumar Ranjan' },
                                email: { type: 'string', example: 'akryou2@gmail.com' },
                                password: { type: 'string', example: 'Akr7631514545' },
                                confirmPassword: { type: 'string', example: 'Akr7631514545' },
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: 'OTP sent successfully' },
                400: { description: 'Bad Request - Missing fields or password mismatch' },
                409: { description: 'Conflict - User already exists' },
            },
        },
    },
    '/verify-signup-otp': {
        post: {
            tags: ['UserRoutes'],
            summary: 'Verify OTP and Register User',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                name: { type: 'string', example: 'Amit Kumar Ranjan' },
                                email: { type: 'string', example: 'akryou2@gmail.com' },
                                password: { type: 'string', example: 'Akr76315145' },
                                confirmPassword: { type: 'string', example: 'Akr76315145' },
                                otp: { type: 'string', example: '753816' },
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: 'User registered successfully' },
                400: { description: 'Bad Request - Missing fields or password mismatch' },
                401: { description: 'Unauthorized - Incorrect or expired OTP' },
            },
        },
    },
    '/login': {
        post: {
            tags: ['UserRoutes'],
            summary: 'User Login',
            description: 'Allows a user to log in with either their email or username.',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                identifier: {
                                    type: 'string',
                                    example: 'amit', // Example username or email
                                },
                                password: {
                                    type: 'string',
                                    example: 'Akr7631514545', // Example password
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'User logged in successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: true,
                                    },
                                    token: {
                                        type: 'string',
                                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', // Example token
                                    },
                                    user: {
                                        type: 'object',
                                        properties: {
                                            _id: {
                                                type: 'string',
                                                example: '671a619bdb65ba2cd78f579b',
                                            },
                                            name: {
                                                type: 'string',
                                                example: 'Amit Kumar Ranjan',
                                            },
                                            email: {
                                                type: 'string',
                                                example: 'akryou2@gmail.com',
                                            },
                                            username: {
                                                type: 'string',
                                                example: 'amit',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad Request - Missing fields',
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
                                        example: 'Please Enter all fields',
                                    },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'User Not Found',
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
                                        example: 'User Not found',
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Unauthorized - Incorrect Password',
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
                                        example: 'Incorrect Password',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/logout': {
        post: {
            tags: ['UserRoutes'],
            summary: 'User Logout',
            description: 'Logs the user out by clearing the authentication token.',
            responses: {
                200: {
                    description: 'User logged out successfully',
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
                                        example: 'User logged out successfully',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/update-password': {
        post: {
            tags: ['UserRoutes'],
            summary: 'Update Password',
            description: 'Allows a logged-in user to update their password.',
            requestBody: {
                description: 'Password details for updating',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                oldPassword: {
                                    type: 'string',
                                    example: 'Akr7631514545', // Example old password
                                },
                                newPassword: {
                                    type: 'string',
                                    example: 'Akr76315145', // Example new password
                                },
                                confirmNewPassword: {
                                    type: 'string',
                                    example: 'Akr76315145', // Example confirmation of new password
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Password updated successfully',
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
                                        example: 'Password changed successfully',
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad Request - Missing fields or password validation failed',
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
                                        example: 'Please Enter all details', // Example error message
                                    },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'User Not Found',
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
                                        example: 'User Not found',
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Unauthorized - Incorrect old password',
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
                                        example: 'Incorrect old password',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/send-forgotPassword-otp': {
        post: {
            tags: ['UserRoutes'],
            summary: 'Send Forgot Password OTP',
            description: 'Sends an OTP to the user\'s email for password reset.',
            requestBody: {
                description: 'Email to send OTP for password reset',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                    example: 'akryou2@gmail.com', // Example email
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'OTP sent successfully',
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
                                        example: 'OTP sent successfully. Please check your email.',
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad Request - Missing email',
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
                                        example: 'Please enter email to reset password',
                                    },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'User Not Found',
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
                                        example: 'User not found',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/verify-forgotPassword-otp': {
        post: {
            tags: ['UserRoutes'],
            summary: 'Verify Forgot Password OTP',
            description: 'Verifies the OTP sent to the user\'s email and resets the password.',
            requestBody: {
                description: 'OTP verification and new password details',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                    example: 'akryou2@gmail.com', // Example email
                                },
                                otp: {
                                    type: 'string',
                                    example: '650254', // Example OTP
                                },
                                newPassword: {
                                    type: 'string',
                                    example: 'Akr7631514545', // Example new password
                                },
                                confirmNewPassword: {
                                    type: 'string',
                                    example: 'Akr7631514545', // Example confirmation of new password
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Password reset successfully',
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
                                        example: 'Password has been reset successfully. You can now log in.',
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad Request - Missing details or password validation failed',
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
                                        example: 'Please enter email, OTP, and new password details',
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Unauthorized - Incorrect or expired OTP',
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
                                        example: 'Incorrect or expired OTP',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/update-username': {
        post: {
            tags: ['UserRoutes'],
            summary: 'Update Username',
            description: 'Updates the user\'s username if it is not already taken.',
            requestBody: {
                description: 'New username details',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                username: {
                                    type: 'string',
                                    example: 'amit', // Example new username
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Username updated successfully',
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
                                        example: 'Username updated successfully',
                                    },
                                    user: {
                                        type: 'object',
                                        properties: {
                                            id: {
                                                type: 'string',
                                                example: '60d9c3a4c3e8f9b2a04b96a5', // Example user ID
                                            },
                                            name: {
                                                type: 'string',
                                                example: 'John Doe', // Example user name
                                            },
                                            email: {
                                                type: 'string',
                                                example: 'john.doe@example.com', // Example user email
                                            },
                                            username: {
                                                type: 'string',
                                                example: 'amit', // Updated username
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad Request - Missing username',
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
                                        example: 'Please provide a new username',
                                    },
                                },
                            },
                        },
                    },
                },
                409: {
                    description: 'Conflict - Username already taken',
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
                                        example: 'Username already taken, please choose another one',
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Unauthorized - Not logged in',
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
                                        example: 'Please login to update your username',
                                    },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'Not Found - User not found',
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
                                        example: 'User not found',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
