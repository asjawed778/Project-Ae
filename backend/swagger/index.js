const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'AbilitaEdge - API Documentation',
        version: '1.0',
        description: 'API documentation for AbilitaEdge managed by Amit Ranjan.',
        contact: {
            email: 'iamakr.dev@gmail.com',
        },
        license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT',
        },
    },
    servers: [
        {
            url: 'http://localhost:4000/api/v1',
        },
    ],
    paths: {
        ...userRoutes,
        ...postRoutes,
    },
};
