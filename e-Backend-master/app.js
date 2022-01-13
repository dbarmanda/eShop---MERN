const express = require('express');
const app = express();
const cors = require("cors");

const errorMiddleware = require("./middleware/error");

//for cloudinary
const fileUpload = require("express-fileupload");

// for creating cookie
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(express.json());


app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// app.use(cors({credentials: true}));
app.use(cookieParser());

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(fileUpload({useTempFiles: true}));



//Route Imports
const productRoute = require('./routes/product');
const userRoute = require('./routes/user');
const adminRoute = require("./routes/admin");
const orderRoute = require('./routes/order');

//Routes
app.use('/api/v1', productRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', adminRoute);
app.use('/api/v1', orderRoute);

//Middleware for errors
app.use(errorMiddleware);

module.exports = app;