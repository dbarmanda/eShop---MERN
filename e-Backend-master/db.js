require('dotenv').config
const mongoose = require('mongoose');

// const monogoURI = "mongodb+srv://admin:3jFBI4eWITumvehO@cluster0.0acxb.mongodb.net/eShoppersDB?retryWrites=true&w=majority"
const mongoURI = process.env.DB_URI;

const connectToDB = ()=>{
    
    mongoose.connect(mongoURI, ()=> {
        console.log('DB connected')
    })

}

module.exports = connectToDB;