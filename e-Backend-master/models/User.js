require('dotenv').config();

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//crypto: inbuilt module --> used while (reset password & token)
const crypto = require('crypto');


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter your Name"],
        maxlength: [25, "Name cannot be more than 25 letters"],
        minlength: [4, "Name should be atleast 4 characters"]
    },

    email: {
        type: String,
        required:[true, "Please enter your e-mail"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter a password"],
        minlength: [8, "Password must be atleast 8 characters"],
        select: false
                    //do not provide when i try to access from FrontEnd****
    },
    avatar: {
        public_id: {
            type: String,
            // required: true 
            default: "public_id"
        },
        url: {
            type: String,
            default: "url"
            // required: true 
        }
    },
    role: {
        type: String,
        default: 'user'
    },

    resetPasswordToken:String,
    resetPasswordExpire: Date,
});

// 1. hashing the password before storing in the Database 
userSchema.pre("save", async function(next){

    //mongoose.docs bro (jahan this means api document mongoose)
    // password not modified than just update 
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
                //password hashed by 10 salts
});

// $$$ Methods of mongoose MODEL:  --> to structure code & not put everything in the route file-->
                                        //handy method: pass user--> get details easily

    //sdDefine a method to generate JWT to keep you logged in
            //--->then we will store this JWT in cookie so that user is logged in 
             //  for a particular session
             

             /**************user METHODS **************** */
// 1. JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// 2. Compare password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}


// 3. Forgot Password: Re-generating Password & Token
userSchema.methods.getResetPasswordToken = function(){

    // Generate Token
    const resetToken = crypto.randomBytes(20).toString("hex");
                     
    // Hashing and adding resetPasswordToken
    this.resetPasswordToken = crypto
                    .createHash("sha256")
                    .update(resetToken)
                    .digest("hex");

    this.resetPasswordExpire = Date.now() + 15*60*1000;
            //15mins
        
    return resetToken; /****** */

} 
const User = mongoose.model("user", userSchema);

module.exports = User;