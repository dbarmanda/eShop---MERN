const ErrorHandler = require("../utils/errorHandler");


module.exports = (err, req, res, next)=> {
        err.statusCode = err.statusCode || 500;
        // err.statusCode = err.statusCode ?err.statusCode : 500;
        err.message = err.message || "internal server error";


        //Wrong MongoDB Id error(jo pareshan kiya... "Cast to ObjectID...(type string)" )
        if(err.name === "CastError"){
            const message = `Resource not found.. path: ${err.path}`;
            err = new ErrorHandler(message, 400);
        }


        // Mongoose Duplicate key error::::>>>
            //same email registration
        if(err.code === 11000){
                                    //returns 'email' if same or any if same
            const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
            err = new ErrorHandler(message, 400);
        }

        if(err.name === "JsonwebTokenError"){
            const message = `Json Web Token is invalid, try again `
            err = new ErrorHandler(message, 400);
        }

        // JWT EXPIRE error
        if(err.name === "TokenExpiredError"){
            const message = `Json Web Token is Expired, try again`;
            err = new ErroHandler(message, 400);
        }

        
        res.status(err.statusCode).json({
            success: false,
            error: err.message
        });

        // res.status(err.statusCode).send("error brother");
};