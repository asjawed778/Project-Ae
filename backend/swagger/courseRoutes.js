module.exports = {
    '/course/add-course': {
        post: {
            tags: ['CourseRoutes'],
            summary: 'Add a new course',
            description: 'Creates a new course with detailed information such as title, subtitle, key points, tags, description, mode, language, brochure, thumbnail, category, and course content.',
            requestBody: {
                description: 'Details for the new course, including title, description, content, and media.',
                required: true,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                courseTitle: {
                                    type: 'string',
                                    example: 'Advanced JavaScript Course',
                                    description: 'Title of the course.',
                                },
                                courseSubTitle: {
                                    type: 'string',
                                    example: 'Master JavaScript from scratch',
                                    description: 'Subtitle for the course.',
                                },
                                keyPoints: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                    },
                                    example: ['Learn ES6 features', 'Asynchronous programming', 'Master closures'],
                                    description: 'Key points covered in the course.',
                                },
                                tags: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                    },
                                    example: ['JavaScript', 'Programming', 'Web Development'],
                                    description: 'Tags related to the course.',
                                },
                                courseDescription: {
                                    type: 'string',
                                    example: 'This is a comprehensive course that covers everything from the basics of JavaScript to advanced topics.',
                                    description: 'Detailed description of the course.',
                                },
                                courseMode: {
                                    type: 'string',
                                    example: 'Online',
                                    description: 'Mode of delivery for the course.',
                                },
                                courseLanguage: {
                                    type: 'string',
                                    example: 'English',
                                    description: 'Language in which the course is taught.',
                                },
                                brochure: {
                                    type: 'string',
                                    format: 'binary',
                                    description: 'Brochure file for the course in PDF format.',
                                },
                                thumbnail: {
                                    type: 'string',
                                    format: 'binary',
                                    description: 'Thumbnail image for the course.',
                                },
                                category: {
                                    type: 'string',
                                    example: '647e243e7f44f9a1e9d9b4fe',
                                    description: 'Category ID under which the course will be added.',
                                },
                                courseContent: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            topicName: {
                                                type: 'string',
                                                example: 'Introduction to JavaScript',
                                                description: 'Name of the topic.',
                                            },
                                            subTopic: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        title: {
                                                            type: 'string',
                                                            example: 'What is JavaScript?',
                                                            description: 'Title of the sub-topic.',
                                                        },
                                                        description: {
                                                            type: 'string',
                                                            example: 'Introduction to the JavaScript language.',
                                                            description: 'Description of the sub-topic.',
                                                        },
                                                    },
                                                },
                                                example: [
                                                    {
                                                        title: 'What is JavaScript?',
                                                        description: 'Introduction to JavaScript',
                                                    },
                                                ],
                                                description: 'Sub-topics for the course topic.',
                                            },
                                        },
                                    },
                                    description: 'Content structure for the course, including topics and subtopics.',
                                },
                            },
                            required: [
                                'courseTitle',
                                'courseSubTitle',
                                'courseDescription',
                                'courseMode',
                                'courseLanguage',
                                'category',
                                'courseContent',
                            ],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Course added successfully',
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
                                        example: 'Course added successfully',
                                    },
                                    course: {
                                        type: 'object',
                                        properties: {
                                            _id: {
                                                type: 'string',
                                                example: '647e2b1f1b5b5a3b4c5d6a7e',
                                            },
                                            courseTitle: {
                                                type: 'string',
                                                example: 'Advanced JavaScript Course',
                                            },
                                            courseSubTitle: {
                                                type: 'string',
                                                example: 'Master JavaScript from scratch',
                                            },
                                            keyPoints: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                },
                                                example: ['Learn ES6 features', 'Asynchronous programming'],
                                            },
                                            tags: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                },
                                                example: ['JavaScript', 'Programming'],
                                            },
                                            courseDescription: {
                                                type: 'string',
                                                example: 'This course covers all the essential JavaScript concepts.',
                                            },
                                            courseMode: {
                                                type: 'string',
                                                example: 'Online',
                                            },
                                            courseLanguage: {
                                                type: 'string',
                                                example: 'English',
                                            },
                                            brochure: {
                                                type: 'string',
                                                example: 'https://example.com/brochure.pdf',
                                            },
                                            thumbnail: {
                                                type: 'string',
                                                example: 'https://example.com/thumbnail.jpg',
                                            },
                                            category: {
                                                type: 'string',
                                                example: '647e243e7f44f9a1e9d9b4fe',
                                            },
                                            courseContent: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                },
                                                example: ['647e2b1f1b5b5a3b4c5d6a7e'],
                                            },
                                            createdAt: {
                                                type: 'string',
                                                format: 'date-time',
                                                example: '2024-10-28T06:24:35.789Z',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad Request - Validation errors such as missing required fields or invalid file formats.',
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
                                        example: 'Please fill all the details, including course content as an array',
                                    },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'Category not found',
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
                                        example: 'Category not found.',
                                    },
                                },
                            },
                        },
                    },
                },
                415: {
                    description: 'Unsupported Media Type - Invalid file formats (e.g., wrong file type for thumbnail or brochure)',
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
                                        example: 'Invalid file type. Please upload a valid PDF for brochure and image file for thumbnail.',
                                    },
                                },
                            },
                        },
                    },
                },
                500: {
                    description: 'Internal Server Error - Server error occurred while processing the request.',
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
                                        example: 'Something went wrong. Please try again later.',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/course/add-category': {
        post: {
            tags: ['CourseRoutes'],
            summary: 'Add a new category',
            description: 'Creates a new category with a name and description. Optionally, you can associate courses with the category.',
            requestBody: {
                description: 'Details for the new category, including the name and description.',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    example: 'Mobile Development',
                                    description: 'Name of the category.',
                                },
                                description: {
                                    type: 'string',
                                    example: 'This category includes all Mobile development courses.',
                                    description: 'Description of the category.',
                                },
                            },
                            required: ['name', 'description'],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Category added successfully',
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
                                        example: 'Category added successfully',
                                    },
                                    category: {
                                        type: 'object',
                                        properties: {
                                            _id: {
                                                type: 'string',
                                                example: '67363738b9da40be19e0d024',
                                            },
                                            categoryName: {
                                                type: 'string',
                                                example: 'Mobile Development',
                                            },
                                            description: {
                                                type: 'string',
                                                example: 'This category includes all Mobile development courses.',
                                            },
                                            courses: {
                                                type: 'array',
                                                items: {
                                                    type: 'string',
                                                },
                                                example: [],
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad Request - Missing category name or description.',
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
                                        example: 'Please provide both category name and description.',
                                    },
                                },
                            },
                        },
                    },
                },
                409: {
                    description: 'Conflict - Category with the same name already exists.',
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
                                        example: 'Category with this name already exists.',
                                    },
                                },
                            },
                        },
                    },
                },
                500: {
                    description: 'Internal Server Error - Error during category creation.',
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
                                        example: 'Something went wrong. Please try again later.',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/course/get-all-category': {
        get: {
            tags: ['CourseRoutes'],
            summary: 'Get all categories',
            description: 'Fetches a list of all available categories, including their name, description, and associated courses.',
            responses: {
                200: {
                    description: 'List of all categories',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: true,
                                    },
                                    categories: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                _id: {
                                                    type: 'string',
                                                    example: '67363715b9da40be19e0d020',
                                                },
                                                categoryName: {
                                                    type: 'string',
                                                    example: 'Web Development',
                                                },
                                                description: {
                                                    type: 'string',
                                                    example: 'This category includes all Web development courses.',
                                                },
                                                courses: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'string',
                                                    },
                                                    example: [],
                                                },
                                            },
                                        },
                                        example: [
                                            {
                                                _id: '67363715b9da40be19e0d020',
                                                categoryName: 'Web Development',
                                                description: 'This category includes all Web development courses.',
                                                courses: [],
                                            },
                                            {
                                                _id: '67363738b9da40be19e0d024',
                                                categoryName: 'Mobile Development',
                                                description: 'This category includes all Mobile development courses.',
                                                courses: [],
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'No categories found',
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
                                        example: 'No categories found.',
                                    },
                                },
                            },
                        },
                    },
                },
                500: {
                    description: 'Internal Server Error - Error during fetching categories.',
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
                                        example: 'Something went wrong. Please try again later.',
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
