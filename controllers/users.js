const user = require("../models/user") ; 
const {v4 : uuidv4} = require("uuid") ;
const {setuser , getuser } = require("../service/auth") ;  
const transporter =require("../service/email");
async function handlesignup(req , res ) {

    body = req.body ;
     if ( !body.name || !body.email || !body.password ) {
      return res.render("signup" , { error : "enter all fields"});
    }

 const result = await user.create ( {

    name : body.name , 
    email : body.email , 
    password : body.password 

 }) ; 

   result.save() 

   return res.render("home") ; 

}


async function handlelogin(req , res ) {

    body = req.body ;
     if (  !body.email || !body.password ) {

      return res.render("login" , { error :  "enter all fields " } ) ; 

    }
    
    const result = await user.findOne( {  email : body.email , password : body.password }) ; 

    if(!result ) {
      return res.render("login" , { error : "enter the valid username or password "}) ; 
    }

    const otp = Math.floor(  100000 + Math.random() * 900000 ).toString(); 

    result.otp = otp;
    result.otpexpiry =  Date.now() + 5*60*1000;

    await result.save();

    await transporter.sendMail({
    from: process.env.EMAIL,
    to: result.email,
    subject: "OTP Verification",
    text: `Your OTP is ${otp}`
    });

  res.render("verifyotp",{
   email:result.email
   });

   

}


module.exports = { handlesignup , handlelogin } ; 