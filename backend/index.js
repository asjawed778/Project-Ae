const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');

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

const dbConnect = require('./config/dbConnect');
dbConnect();

const fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const userRoute = require('./routes/userRoute');
app.use('/api/v1', userRoute);

const errorMiddlerware = require('./middlewares/errorMiddleware');
app.use(errorMiddlerware);

app.listen(PORT, () => {
    console.log(`Server is Running on the PORT: ${PORT}`);
})

app.get('/', (req, res) => {
    res.send(`<h1>Hi App is Running baby...</h1>`)
}) 