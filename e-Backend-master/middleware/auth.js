const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuthenticated = catchAsyncErrors(async(req, res, next)=> {

    // console.log('hello')
    // const {token} = req.cookies;
    const token = req.body.token || req.query.token || req.cookies['token'] || req.headers['token'];
    
    if(!token){
        return next(new ErrorHandler("Please Login to access resources", 401));
    }

    //let's verify the token stored in cookie with our secret key
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    /*
    => CATCH:
            --> while creating account we signed our "secret Key" with "id"

            if jwt verify success,
                we get what we signed during register... 
                            i.e. "id"
    */

    //Get the User                        
    req.user = await User.findById(decodedData.id);

    next();

});


// allowing user on basis of 'admin' role to some pages
//lets' see & authorize the user
/*
Simply passed the role : admin in an array (roles) using ...roles 

    then checked form req.user if role has admin or not
        then authorized on this basis...


*/
exports.authorizeRoles = (...roles) => {
    return (req, res, next)=> {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource.`, 403));
        }

        next();
    }
}

