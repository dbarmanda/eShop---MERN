//extends default node 'Error class' 
class ErrorHandler extends Error{

    constructor(message, statusCode){
        super(message); //Error ka constructor hai
        this.statusCode = statusCode ;

                        // (target object, constructor )
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;