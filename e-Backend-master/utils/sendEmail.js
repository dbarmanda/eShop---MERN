require('dotenv').config();
const nodeMailer = require("nodemailer");

//using nodeMailerL
/*
 to actually send mail from our "service-gmail"/fake account
                to the user with reset links & token

 */
const sendEmail = async(options)=> {

    //setting the service we will be using
    const transporter = nodeMailer.createTransport({
        // host: process.env.SMPT_HOST,
        // port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,      //"gmail",
        auth: {
            user: process.env.SMPT_MAIL,        //"dev@gmail.com",
            pass: process.env.SMPT_PASSWORD
        }           //simple mail transfer protocol
    })

    const mailOptions= {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;