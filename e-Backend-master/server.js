require('dotenv').config()
//entire route handling in app.js  
        //only listening here
        
const app = require("./app");

//cloudinary
// const cloudinary = require("cloudinary");

const connectDB = require('./db');



//handling uncaught exceptions (errors)
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exception")

    process.exit(1);
});

// console.log(hello)   -----} uncaught exception error ****

//middlewares


connectDB();

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });//require & config that's it for cloudinary in backend

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on port: ${process.env.PORT}`);
})

//handling other erros(invalid mongoURI)
process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting Down the server, due to unhandled promise rejection');

    server.close(()=>{
        process.exit(1);
    });
})
