
require("dotenv").config();
const nodemailer = require("nodemailer");

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

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

console.log("SMTP_USER:", process.env.SMTP_USER);

// mongosh "mongodb+srv://cluster0.688qkt1.mongodb.net/" --username peekingsurfers01_db_user



transporter.verify((err, success) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected");
    }
});

module.exports = transporter;


// const { Resend } = require("resend");

// const resend = new Resend(process.env.RESEND_API_KEY);

// module.exports = resend;