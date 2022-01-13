const express = require("express");
const router = express.Router();

//Error Handlers
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const User = require('../models/User');

const sendToken = require('../utils/jwtToken');

// forgot password mail forwarding using nodemailer
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// const cloudinary = require('cloudinary'); not working

const {isAuthenticated} = require("../middleware/auth")

// 1. Register User
router.post("/register", catchAsyncErrors(async (req, res, next)=>{

    // profile-image using cloudinary
    // const myCloud = await cloudinary.v2.uploader.upload(
    //     req.body.avatar, {
    //         folder: "avatars",
    //         width: 150,
    //         crop: "scale"
    //     }
    // )


    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "123publicId",
            url: "httpthisisURL"
        }   //Cloudnary use to get 'public_id' && 'url'
    });
      // avatar: {
        //     public_id: myCloud.public_id,
        //     url: url: myCloud.secure_url
        // }  

    //before saving to DataBase using ".pre" we hashed the password

    // now generating the token
    const token = user.getJWTToken();
    res.status(201).json({
        success: true,
        token,
        user
    });
    
   
}));

// 2. Login route
router.post("/login", catchAsyncErrors(async(req, res, next)=>{

     const {email, password} = req.body;
     
     //cheking if entries are field
     if(!email || !password){
         return next(new ErrorHandler("please enter email & password", 404));
     }

     const user = await User.findOne({email}).select("+password");

     if(!user ){
         return next(new ErrorHandler("Enter correct credentials to login", 401));
     }

     const isPasswordMatched = user.comparePassword(password);

     if(!isPasswordMatched) {
         return next(new ErrorHandler("Enter correct credentials to login", 401));
     }

    //  const token = user.getJWTToken();

    //  res.status(200).json({
    //      success: true,
    //      token
    //  });
     sendToken(user, 200, res);
}));



// 3. Logout Route:
router.get("/logout", catchAsyncErrors(async(req, res, next)=> {

 
    // set cookie to null use res...
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged out Successfully"
    })
}));


// 4. Forgot Password Route
router.post("/password/forgot", catchAsyncErrors(async(req, res, next)=> {

    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }

    // Get resetPassword Token:
    const resetToken = user.getResetPasswordToken();
                                //set's reset password & expire Tokens...
                                //**still not saved, first save */
    //we will use from User Model  fields resetToken's**** catch this

            // save user with both tokens
    await user.save({validateBeforeSave: false});
                    /*** since user forgot password, we donot need validation
                     *  to save user again.. temporarily save this data 
                     */

    //set reset Link
    // const resetPasswordUrl = `http://localhost/api/v1/password/reset/${resetToken}`;
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    //create email body
    const message = `Your Password Reset Token is: \n\n ${resetPasswordUrl} \n\n If you have not requested this email, Kindly ignore..:>`;

    /* till here we generated & saved tokens + created a email with resetPasswordUrl */


    //**   send email to the user
    try{
        await sendEmail ({
            email: user.email,
            subject: `eShoppers Password Recovery`,
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully for password recovery.`
        })

    } catch(err) {
        //resetTokens should set to undefined **Why?? 
                                //--> that's what we generated above(brother)

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});
                
        return next(new ErrorHandler(err.message, 500));
    }
}))


//*5. Reset PassWord Route */
router.put ("/password/reset/:token", catchAsyncErrors(async(req, res, next)=> {

    //convert url's token to hash & compare
        //since, stored as hash only
    const resetPasswordToken = crypto
                .createHash("sha256")
                .update(req.params.token)
                .digest("hex");

    //search above in db

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    });

    if(!user){
        return next(new ErrorHandler("Reset Password Token is expired/invalid"));
    }
    /*************     User Authorized     *************/

    //check password && confirm password
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesnot match", 400));
    }

    //set new password
    user.password = req.body.password;

    //reset resetpassword fields...
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save()

    sendToken(user, 200, res);
}));


//*** USER ROutes (updating profile) */

//1. Get User Detail
router.get("/profile",isAuthenticated, catchAsyncErrors(async(req, res, next)=> {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
}));

// 2. Update User Password
router.put("/password/update", isAuthenticated, catchAsyncErrors(async(req, res, next)=>{

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = user.comparePassword(req.body.oldPassword);

     if(!isPasswordMatched) {
         return next(new ErrorHandler("Old password is incorrect", 401));
     }

     if(req.body.newPassword !== req.body.confirmPassword){
         return next(new ErrorHandler("Password doesnot match", 400));
     }

     user.password = req.body.newPassword;

     await user.save();

     sendToken(user, 200, res)
}) )

//3. Update User Profile
router.put("/profile/update", isAuthenticated, catchAsyncErrors(async(req, res, next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    //We will add cloudinary later (FOR avatar)...

    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new: true,
        // runValidators: true,
        // useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "Successfully updated profile.."
    })

}));
/**
 * Updation can be of a single entry too.. so we will set that in BAckend
 *  else using Harry bhai's technique of {...} spread operator
 */


module.exports = router;
