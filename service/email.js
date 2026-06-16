
require("dotenv").config();
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASS
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });



// transporter.verify((err, success) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Connected");
//     }
// });

// module.exports = transporter;


const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = resend;