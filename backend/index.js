const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const session = require('express-session');
const registerRoutes = require('./middlewares/registerRoutes');

app.use(cookieParser());

app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true,
    optionsSuccessStatus: 204,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// app.use(session({
//     secret: process.env.EXPRESS_SESSSION_SECRET_KEY,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         secure: process.env.MODE === 'production'
//     }
// }));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const dbConnect = require('./config/dbConnect');
dbConnect();

const fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const { cloudinaryConnect } = require('./config/cloudinary');
cloudinaryConnect();

const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/v1', postRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', courseRoutes);
app.use('/api/v1', adminRoutes);


const errorMiddleware = require('./middlewares/errorMiddleware');
app.use(errorMiddleware);

registerRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is Running on the PORT: ${PORT}`);
    console.log(`visit for API Doc: http://localhost:${PORT}/api-docs`)
})

app.get('/', (req, res) => {
    res.send(`<h1>AbilitaEdge - App is Running...</h1>`)
}) 