/**
 * API Documentation for Post Routes
 *
 * This module exports the OpenAPI (Swagger) documentation for various post-related routes in the application.
 * Each endpoint includes details about request and response formats, parameters, possible status codes, 
 * and example payloads to assist developers in understanding how to interact with these routes.
 */


module.exports = {
    '/create-post': {
        post: {
            tags: ['PostRoutes'],
            summary: 'Create a new post',
            description: 'Creates a new post with content, images, and videos. Requires user authentication.',
            requestBody: {
                description: 'Details of the new post including content, images, and videos.',
                required: true,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                content: {
                                    type: 'string',
                                    example: 'Hello this is Amit',
                                    description: 'Content of the post. Must not exceed 200 characters.',
                                },
                                images: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                        format: 'binary',
                                    },
                                    description: 'Array of images. Max 10 images, each up to 5MB. Allowed formats: jpg, jpeg, png, gif.',
                                },
                                videos: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                        format: 'binary',
                                    },
                                    description: 'Array of videos. Max 5 videos, each up to 20MB. Allowed formats: mp4, mov, avi.',
                                },
                            },
                            required: ['content'],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Post created successfully',
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
                                        example: 'Post created successfully',
                                    },
                                    post: {
                                        type: 'object',
                                        properties: {
                                            userId: {
                                                type: 'string',
                                                example: '671a619bdb65ba2cd78f579b',
                                            },
                                            content: {
                                                type: 'string',
                                                example: 'Hello This is Amit, First Post',
                                            },
                                            images: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                    example: 'https://cloudinary.com/image-url',
                                                },
                                            },
                                            videos: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                    example: 'https://cloudinary.com/video-url',
                                                },
                                            },
                                            upvotes: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                },
                                            },
                                            downvotes: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                },
                                            },
                                            comments: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                },
                                            },
                                            _id: {
                                                type: 'string',
                                                example: '671f2e233e0eefb5d97084e5',
                                            },
                                            createdAt: {
                                                type: 'string',
                                                format: 'date-time',
                                                example: '2024-10-28T06:24:35.789Z',
                                            },
                                            editedAt: {
                                                type: 'string',
                                                format: 'date-time',
                                                example: '2024-10-28T06:24:35.795Z',
                                            },
                                            __v: {
                                                type: 'number',
                                                example: 0,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad Request - Validation errors such as missing content or invalid file formats',
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
                                        example: 'Content is required.',
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Unauthorized - User is not authenticated',
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
                                        example: 'Please login to create a post',
                                    },
                                },
                            },
                        },
                    },
                },
                409: {
                    description: 'Conflict - Max images or videos exceeded',
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
                                        example: 'You can upload up to 10 images only.',
                                    },
                                },
                            },
                        },
                    },
                },
                415: {
                    description: 'Unsupported Media Type - Invalid file formats',
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
                                        example: 'Invalid image format. Allowed formats: jpg, jpeg, png, gif.',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/get-all-post': {
        get: {
            tags: ['PostRoutes'],
            summary: 'Get all user posts with pagination',
            description: 'Fetches a paginated list of all posts. Supports query parameters for pagination.',
            parameters: [
                {
                    name: 'page',
                    in: 'query',
                    description: 'Page number for pagination. Defaults to 1.',
                    required: false,
                    schema: {
                        type: 'integer',
                        example: 1,
                    },
                },
                {
                    name: 'limit',
                    in: 'query',
                    description: 'Number of posts per page. Defaults to 10.',
                    required: false,
                    schema: {
                        type: 'integer',
                        example: 10,
                    },
                },
            ],
            responses: {
                200: {
                    description: 'User posts fetched successfully',
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
                                        example: 'User posts fetched successfully',
                                    },
                                    posts: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                _id: { type: 'string', example: '671f2e233e0eefb5d97084e5' },
                                                content: { type: 'string', example: 'Hello This is Amit, First Post' },
                                                images: { type: 'array', items: { type: 'string' } },
                                                videos: { type: 'array', items: { type: 'string' } },
                                                createdAt: { type: 'string', format: 'date-time' },
                                                editedAt: { type: 'string', format: 'date-time' },
                                                upvotes: { type: 'array', items: { type: 'string' } },
                                                downvotes: { type: 'array', items: { type: 'string' } },
                                                commentsCount: { type: 'integer', example: 0 },
                                                user: {
                                                    type: 'object',
                                                    properties: {
                                                        id: { type: 'string', example: '671a619bdb65ba2cd78f579b' },
                                                        name: { type: 'string', example: 'Amit Kumar Ranjan' },
                                                        username: { type: 'string', example: 'amit' },
                                                        profilePic: {
                                                            type: 'string',
                                                            example: 'https://ui-avatars.com/api/?name=Amit+Kumar+Ranjan',
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    currentPage: {
                                        type: 'integer',
                                        example: 1,
                                    },
                                    hasMore: {
                                        type: 'boolean',
                                        example: false,
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad Request - Invalid pagination parameters',
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
                                        example: 'Invalid page or limit value.',
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
                                        example: 'An error occurred while fetching posts.',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/get-user-all-post': {
        get: {
            tags: ['PostRoutes'],
            summary: 'Fetch all posts of the authenticated user',
            description: 'Retrieves paginated posts created by the authenticated user. Requires user authentication.',
            parameters: [
                {
                    name: 'page',
                    in: 'query',
                    required: false,
                    schema: {
                        type: 'integer',
                        default: 1,
                    },
                    description: 'Page number for pagination (default is 1).',
                },
                {
                    name: 'limit',
                    in: 'query',
                    required: false,
                    schema: {
                        type: 'integer',
                        default: 10,
                    },
                    description: 'Number of posts per page (default is 10).',
                },
            ],
            responses: {
                200: {
                    description: 'User posts fetched successfully',
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
                                        example: 'User posts fetched successfully',
                                    },
                                    posts: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                _id: {
                                                    type: 'string',
                                                    example: '671f2e233e0eefb5d97084e5',
                                                },
                                                content: {
                                                    type: 'string',
                                                    example: 'Hello This is Amit, First Post',
                                                },
                                                images: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'string',
                                                        example: 'https://cloudinary.com/image-url',
                                                    },
                                                },
                                                videos: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'string',
                                                        example: 'https://cloudinary.com/video-url',
                                                    },
                                                },
                                                createdAt: {
                                                    type: 'string',
                                                    format: 'date-time',
                                                    example: '2024-10-28T06:24:35.789Z',
                                                },
                                                editedAt: {
                                                    type: 'string',
                                                    format: 'date-time',
                                                    example: '2024-10-28T06:24:35.795Z',
                                                },
                                                upvotes: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'string',
                                                        example: '671a619bdb65ba2cd78f579b',
                                                    },
                                                },
                                                downvotes: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'string',
                                                        example: '671a619bdb65ba2cd78f579b',
                                                    },
                                                },
                                                commentsCount: {
                                                    type: 'integer',
                                                    example: 0,
                                                },
                                                user: {
                                                    type: 'object',
                                                    properties: {
                                                        id: {
                                                            type: 'string',
                                                            example: '671a619bdb65ba2cd78f579b',
                                                        },
                                                        name: {
                                                            type: 'string',
                                                            example: 'Amit Kumar Ranjan',
                                                        },
                                                        username: {
                                                            type: 'string',
                                                            example: 'amit',
                                                        },
                                                        profilePic: {
                                                            type: 'string',
                                                            example: 'https://ui-avatars.com/api/?name=Amit+Kumar+Ranjan',
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    currentPage: {
                                        type: 'integer',
                                        example: 1,
                                    },
                                    hasMore: {
                                        type: 'boolean',
                                        example: false,
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Unauthorized - User is not authenticated',
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
                                        example: 'Please login to view posts',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/delete-post/{postId}': {
        delete: {
            tags: ['PostRoutes'],
            summary: 'Delete a post by ID',
            description: 'Deletes a specific post if the authenticated user owns it. Requires user authentication.',
            parameters: [
                {
                    name: 'postId',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'The ID of the post to be deleted.',
                },
            ],
            responses: {
                200: {
                    description: 'Post deleted successfully',
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
                                        example: 'Post deleted successfully',
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Unauthorized - User is not authenticated or not authorized',
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
                                        example: 'Please login to delete the post.',
                                    },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'Post not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: false,
                                    },
                                    status: {
                                        type: 'integer',
                                        example: 404,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Post not found.',
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad Request - Post ID is missing',
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
                                        example: 'Post ID is missing.',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/update-post/{postId}': {
        put: {
            tags: ['PostRoutes'],
            summary: 'Update a post by ID',
            description: 'Updates a specific post if the authenticated user owns it. Requires user authentication and allows for content and media updates.',
            parameters: [
                {
                    name: 'postId',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string',
                    },
                    description: 'The ID of the post to be updated.',
                },
                {
                    name: 'content',
                    in: 'body',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: {
                            content: {
                                type: 'string',
                                example: 'Updated post content.',
                            },
                        },
                    },
                    description: 'The new content for the post.',
                },
                {
                    name: 'images',
                    in: 'formData',
                    required: false,
                    type: 'array',
                    items: {
                        type: 'file',
                        format: 'binary',
                    },
                    description: 'Images to be uploaded with the post. Supported types: jpg, jpeg, png.',
                },
                {
                    name: 'videos',
                    in: 'formData',
                    required: false,
                    type: 'array',
                    items: {
                        type: 'file',
                        format: 'binary',
                    },
                    description: 'Videos to be uploaded with the post. Supported types: mp4, mov.',
                },
            ],
            responses: {
                200: {
                    description: 'Post updated successfully',
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
                                        example: 'Post updated successfully.',
                                    },
                                    post: {
                                        type: 'object',
                                        properties: {
                                            // Add properties of the post object here if necessary
                                            id: {
                                                type: 'string',
                                            },
                                            content: {
                                                type: 'string',
                                            },
                                            images: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                },
                                            },
                                            videos: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                },
                                            },
                                            userId: {
                                                type: 'string',
                                            },
                                            createdAt: {
                                                type: 'string',
                                                format: 'date-time',
                                            },
                                            updatedAt: {
                                                type: 'string',
                                                format: 'date-time',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad Request - Invalid input or missing parameters',
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
                                        example: "Post content can't be empty.",
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Unauthorized - User is not authenticated or not authorized',
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
                                        example: 'Please login to update the post.',
                                    },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'Post not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: false,
                                    },
                                    status: {
                                        type: 'integer',
                                        example: 404,
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Post not found.',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/vote-post/{postId}': {
        post: {
            tags: ['PostRoutes'],
            summary: 'Vote on a post',
            description: 'Allows users to upvote or downvote a specific post. Requires user authentication.',
            parameters: [
                {
                    name: 'postId',
                    in: 'path',
                    required: true,
                    description: 'ID of the post to vote on.',
                    schema: {
                        type: 'string',
                    },
                },
            ],
            requestBody: {
                description: 'Action to be performed on the post (upvote or downvote).',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                action: {
                                    type: 'string',
                                    enum: ['upvote', 'downvote'],
                                    example: 'upvote',
                                    description: 'Action to perform on the post. Must be either "upvote" or "downvote".',
                                },
                            },
                            required: ['action'],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Vote action successful',
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
                                        example: 'Post upvoted successfully',
                                    },
                                    upvotesCount: {
                                        type: 'number',
                                        example: 1,
                                    },
                                    downvotesCount: {
                                        type: 'number',
                                        example: 0,
                                    },
                                    post: {
                                        type: 'object',
                                        properties: {
                                            _id: {
                                                type: 'string',
                                                example: '671b063e13758753b7e80dcb',
                                            },
                                            upvotes: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                },
                                            },
                                            downvotes: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad Request - Invalid action or missing postId',
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
                                        example: 'Invalid action. Must be "upvote" or "downvote".',
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Unauthorized - User is not authenticated',
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
                                        example: 'Unauthorized action.',
                                    },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'Not Found - Post not found',
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
                                        example: 'Post not found.',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/add-comment/{postId}': {
        post: {
            tags: ['PostRoutes'],
            summary: 'Add a comment to a post',
            description: 'Allows authenticated users to add a comment to a specific post. Requires user authentication.',
            parameters: [
                {
                    name: 'postId',
                    in: 'path',
                    required: true,
                    description: 'ID of the post to which the comment is being added.',
                    schema: {
                        type: 'string',
                        example: '671b063e13758753b7e80dcb',
                    },
                },
            ],
            requestBody: {
                description: 'Details of the comment being added.',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                comment: {
                                    type: 'string',
                                    example: 'Amit commented',
                                    description: 'Content of the comment. Must not be empty.',
                                },
                            },
                            required: ['comment'],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Comment added successfully',
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
                                        example: 'Comment added successfully',
                                    },
                                    comment: {
                                        type: 'object',
                                        properties: {
                                            userId: {
                                                type: 'string',
                                                example: '671a619bdb65ba2cd78f579b',
                                            },
                                            postId: {
                                                type: 'string',
                                                example: '671b063e13758753b7e80dcb',
                                            },
                                            comment: {
                                                type: 'string',
                                                example: 'Amit commented',
                                            },
                                            replies: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                },
                                            },
                                            upvotes: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                },
                                            },
                                            downvotes: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                },
                                            },
                                            _id: {
                                                type: 'string',
                                                example: '671f350fd3bda7fc9cf10c24',
                                            },
                                            createdAt: {
                                                type: 'string',
                                                format: 'date-time',
                                                example: '2024-10-28T06:54:07.310Z',
                                            },
                                            editedAt: {
                                                type: 'string',
                                                format: 'date-time',
                                                example: '2024-10-28T06:54:07.313Z',
                                            },
                                            __v: {
                                                type: 'number',
                                                example: 0,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad Request - Post ID and comment are required',
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
                                        example: 'Post ID and comment are required.',
                                    },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Unauthorized - User is not authenticated',
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
                                        example: 'Please login to comment',
                                    },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'Not Found - Post not found',
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
                                        example: 'Post not found.',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/edit-comment/{postId}/{commentId}': {
        put: {
            tags: ['PostRoutes'],
            summary: 'Edit a comment on a post',
            description: 'Allows a user to edit their own comment on a post. Requires user authentication.',
            parameters: [
                {
                    in: 'path',
                    name: 'postId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID of the post to which the comment belongs.',
                },
                {
                    in: 'path',
                    name: 'commentId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID of the comment to edit.',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                updatedComment: {
                                    type: 'string',
                                    example: 'Updated comment text',
                                    description: 'New content of the comment.'
                                },
                            },
                            required: ['updatedComment'],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Comment edited successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: true },
                                    message: { type: 'string', example: 'Comment edited successfully' },
                                    comment: {
                                        type: 'object',
                                        properties: {
                                            comment: { type: 'string', example: 'Updated comment text' },
                                            editedAt: {
                                                type: 'string',
                                                format: 'date-time',
                                                example: '2024-10-28T06:54:07.313Z'
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'Comment not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Comment not found.' },
                                },
                            },
                        },
                    },
                },
                403: {
                    description: 'Unauthorized action',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Only the comment\'s author can edit this comment.' },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Invalid input data',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Post ID, Comment ID, and updated comment text are required.' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/delete-comment/{postId}/{commentId}': {
        delete: {
            tags: ['PostRoutes'],
            summary: 'Delete a comment from a post',
            description: 'Allows a user to delete their own comment or a comment on their post. Requires user authentication.',
            parameters: [
                {
                    in: 'path',
                    name: 'postId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID of the post from which the comment will be deleted.',
                },
                {
                    in: 'path',
                    name: 'commentId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID of the comment to delete.',
                },
            ],
            responses: {
                200: {
                    description: 'Comment deleted successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: true },
                                    message: { type: 'string', example: 'Comment deleted successfully' },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'Post or Comment not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Post not found.' },
                                },
                            },
                        },
                    },
                },
                403: {
                    description: 'Unauthorized action',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Only the comment\'s author or the post\'s owner can delete this comment.' },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Invalid input data',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Post ID or Comment ID is missing.' },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Unauthorized access',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Unauthorized action.' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/get-comments/{postId}': {
        get: {
            tags: ['PostRoutes'],
            summary: 'Retrieve comments for a post',
            description: 'Fetches all comments associated with a specific post. Requires user authentication.',
            parameters: [
                {
                    in: 'path',
                    name: 'postId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID of the post for which comments will be fetched.',
                },
                {
                    in: 'query',
                    name: 'page',
                    required: false,
                    schema: { type: 'integer', example: 1 },
                    description: 'The page number to retrieve (default is 1).',
                },
                {
                    in: 'query',
                    name: 'limit',
                    required: false,
                    schema: { type: 'integer', example: 10 },
                    description: 'The number of comments to retrieve per page (default is 10).',
                },
            ],
            responses: {
                200: {
                    description: 'Comments fetched successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: true },
                                    message: { type: 'string', example: 'Comments fetched successfully' },
                                    comments: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                _id: { type: 'string' },
                                                comment: { type: 'string' },
                                                createdAt: { type: 'string', format: 'date-time' },
                                                editedAt: { type: 'string', format: 'date-time' },
                                                replies: { type: 'array', items: { type: 'object' } },
                                                user: {
                                                    type: 'object',
                                                    properties: {
                                                        id: { type: 'string' },
                                                        name: { type: 'string' },
                                                        username: { type: 'string' },
                                                        profilePic: { type: 'string', format: 'uri' },
                                                    },
                                                },
                                                upvotes: { type: 'array', items: { type: 'string' } },
                                                downvotes: { type: 'array', items: { type: 'string' } },
                                            },
                                        },
                                    },
                                    commentsCount: { type: 'integer', example: 2 },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Unauthorized access',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Please login to view comments' },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Invalid input data',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Post ID is required.' },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'Post not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Post not found.' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/vote-comment/{postId}/{commentId}': {
        post: {
            tags: ['PostRoutes'],
            summary: 'Vote on a comment',
            description: 'Allows a user to upvote or downvote a specific comment. Requires user authentication.',
            parameters: [
                {
                    in: 'path',
                    name: 'postId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID of the post containing the comment.',
                },
                {
                    in: 'path',
                    name: 'commentId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID of the comment to be voted on.',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                action: {
                                    type: 'string',
                                    enum: ['upvote', 'downvote'],
                                    example: 'upvote',
                                    description: 'Action to perform on the comment (upvote or downvote).',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Vote processed successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: true },
                                    message: { type: 'string', example: 'Comment upvoted successfully' },
                                    upvotesCount: { type: 'integer', example: 1 },
                                    downvotesCount: { type: 'integer', example: 0 },
                                    comment: {
                                        type: 'object',
                                        properties: {
                                            _id: { type: 'string' },
                                            upvotes: { type: 'array', items: { type: 'string' } },
                                            downvotes: { type: 'array', items: { type: 'string' } },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Invalid input data',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'PostId or Comment ID is missing.' },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Unauthorized access',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Please login to vote on comments' },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'Comment not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Comment not found.' },
                                },
                            },
                        },
                    },
                },
            },
        },


    },
    '/reply-to-comment/{postId}/{commentId}': {
        post: {
            tags: ['PostRoutes'],
            summary: 'Reply to a comment',
            description: 'Allows a user to reply to a specific comment on a post. Requires user authentication.',
            parameters: [
                {
                    in: 'path',
                    name: 'postId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID of the post containing the comment.',
                },
                {
                    in: 'path',
                    name: 'commentId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID of the comment to which the reply is being made.',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                reply: {
                                    type: 'string',
                                    example: 'Rahul replied to amit',
                                    description: 'The reply text.',
                                },
                                tagUsername: {
                                    type: 'string',
                                    example: 'amit',
                                    description: 'The username of the person being tagged in the reply.',
                                },
                            },
                            required: ['reply', 'tagUsername'],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Reply added successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: true },
                                    message: { type: 'string', example: 'Replied successfully' },
                                    reply: {
                                        type: 'object',
                                        properties: {
                                            userId: { type: 'string' },
                                            commentId: { type: 'string' },
                                            reply: { type: 'string' },
                                            tagUsername: { type: 'string' },
                                            createdAt: { type: 'string', format: 'date-time' },
                                            upvotes: { type: 'array', items: { type: 'string' } },
                                            downvotes: { type: 'array', items: { type: 'string' } },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Invalid input data',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Post ID, comment ID, reply, and tagUsername are required.' },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Unauthorized access',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Please login to reply.' },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'Post or comment not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Post not found.' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/edit-reply/{postId}/{commentId}/{replyId}': {
        put: {
            tags: ['PostRoutes'],
            summary: 'Edit a reply to a comment',
            description: 'Allows a user to edit their reply to a specific comment on a post. Requires user authentication.',
            parameters: [
                {
                    in: 'path',
                    name: 'postId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID of the post containing the comment.',
                },
                {
                    in: 'path',
                    name: 'commentId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID of the comment to which the reply was made.',
                },
                {
                    in: 'path',
                    name: 'replyId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID of the reply to be edited.',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                reply: {
                                    type: 'string',
                                    example: 'Rahul reply edit on amit first post',
                                    description: 'The updated reply text.',
                                },
                                tagUsername: {
                                    type: 'string',
                                    example: 'amit',
                                    description: 'The username of the person being tagged in the reply.',
                                },
                            },
                            required: ['reply', 'tagUsername'],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Reply edited successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: true },
                                    reply: {
                                        type: 'object',
                                        properties: {
                                            userId: { type: 'string' },
                                            commentId: { type: 'string' },
                                            reply: { type: 'string' },
                                            tagUsername: { type: 'string' },
                                            createdAt: { type: 'string', format: 'date-time' },
                                            editedAt: { type: 'string', format: 'date-time' },
                                            upvotes: { type: 'array', items: { type: 'string' } },
                                            downvotes: { type: 'array', items: { type: 'string' } },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Invalid input data',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Post ID, comment ID, reply ID, new reply, and username are required.' },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Unauthorized access',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Unauthorized action.' },
                                },
                            },
                        },
                    },
                },
                403: {
                    description: 'Forbidden action',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Unauthorized action. You can only edit your own replies.' },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'Post, comment, or reply not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Comment does not belong to this post.' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/delete-reply/{postId}/{commentId}/{replyId}': {
        delete: {
            tags: ['PostRoutes'],
            summary: 'Delete a reply to a comment',
            description: 'Allows a user to delete their reply to a specific comment on a post. Requires user authentication.',
            parameters: [
                {
                    in: 'path',
                    name: 'postId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID of the post containing the comment.',
                },
                {
                    in: 'path',
                    name: 'commentId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID of the comment from which the reply will be deleted.',
                },
                {
                    in: 'path',
                    name: 'replyId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID of the reply to be deleted.',
                },
            ],
            responses: {
                200: {
                    description: 'Reply deleted successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: true },
                                    message: { type: 'string', example: 'Reply deleted successfully' },
                                    replies: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                userId: { type: 'string' },
                                                commentId: { type: 'string' },
                                                reply: { type: 'string' },
                                                tagUsername: { type: 'string' },
                                                createdAt: { type: 'string', format: 'date-time' },
                                                upvotes: { type: 'array', items: { type: 'string' } },
                                                downvotes: { type: 'array', items: { type: 'string' } },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Invalid input data',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Post ID, comment ID, and reply ID are required.' },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Unauthorized access',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Unauthorized action.' },
                                },
                            },
                        },
                    },
                },
                403: {
                    description: 'Forbidden action',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Unauthorized action. You can only delete your own replies or replies on your own post.' },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'Post, comment, or reply not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Comment does not belong to this post.' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/vote-reply/{postId}/{commentId}/{replyId}': {
        post: {
            tags: ['PostRoutes'],
            summary: 'Vote on a reply',
            description: 'Allows a user to upvote or downvote a reply to a comment on a post. Requires user authentication.',
            parameters: [
                {
                    in: 'path',
                    name: 'postId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID of the post containing the comment.',
                },
                {
                    in: 'path',
                    name: 'commentId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID of the comment containing the reply.',
                },
                {
                    in: 'path',
                    name: 'replyId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'ID of the reply to be voted on.',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                voteType: {
                                    type: 'string',
                                    enum: ['upvote', 'downvote'],
                                    description: 'Type of vote to perform. Can be either "upvote" or "downvote".',
                                },
                            },
                            required: ['voteType'],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Reply voted successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: true },
                                    message: { type: 'string', example: 'Reply upvoted successfully.' },
                                    reply: {
                                        type: 'object',
                                        properties: {
                                            userId: { type: 'string' },
                                            tagUsername: { type: 'string' },
                                            commentId: { type: 'string' },
                                            reply: { type: 'string' },
                                            upvotes: { type: 'array', items: { type: 'string' } },
                                            downvotes: { type: 'array', items: { type: 'string' } },
                                            createdAt: { type: 'string', format: 'date-time' },
                                            _id: { type: 'string' },
                                            editedAt: { type: 'string', format: 'date-time' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Invalid input data',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Post ID, comment ID, reply ID, and vote type are required.' },
                                },
                            },
                        },
                    },
                },
                401: {
                    description: 'Unauthorized access',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Unauthorized action.' },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'Post, comment, or reply not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: false },
                                    message: { type: 'string', example: 'Reply not found.' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
