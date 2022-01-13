const express= require("express");
const router = express.Router();

const User = require("../models/User");

const {isAuthenticated, authorizeRoles} = require('../middleware/auth');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");


// 1. Get All registered Users..
router.get("/admin/users",isAuthenticated, authorizeRoles("admin"), catchAsyncErrors(async(req, res, next)=> {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
}));


// 2. Get individual user (admin)
router.get("/admin/users/:id", isAuthenticated, authorizeRoles("admin"), catchAsyncErrors(async(req, res, next)=> {

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with id ${req.body.params}`))
    }

    res.status(200).json({
        success: true,
        user
    })

}));

// 3. Update user Profile(admin power)
router.put("/admin/users/:id/update",
        isAuthenticated,
        authorizeRoles("admin"), 
        catchAsyncErrors(async(req, res, next)=> {


        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role 
        }


        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {new: true});
        
        
    res.status(200).json({
        success: true,
        message: "Successfully updated user's profile.."
    })
}));


// 4. Delete any intrud user..

router.delete("/admin/users/:id/delete",
    isAuthenticated,
    authorizeRoles("admin"), 
    catchAsyncErrors(async(req, res, next)=> {

    // We will remove Cloudinary here...

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User Doesnot Exists with id ${req.params.id}`, 400))
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "successfully deleted user"
    });

    


    })
);


module.exports = router;