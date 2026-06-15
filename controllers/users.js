const user = require("../models/user") ; 
const {v4 : uuidv4} = require("uuid") ;
const {setuser , getuser } = require("../service/auth") ;  
const transporter =require("../service/email");
const bcrypt = require("bcrypt") ; 
async function handlesignup(req , res ) {

    body = req.body ;
     if ( !body.name || !body.email || !body.password ) {
      return res.render("signup" , { error : "enter all fields"});
    }

    const hashedpassword = await bcrypt.hash(body.password , 10 ) ; 

 const result = await user.create ( {

    name : body.name , 
    email : body.email , 
    password : hashedpassword  

 }) ; 

   result.save() 

   return res.redirect("/login") ; 

}

async function handlelogin(req , res ) {

    body = req.body ;
     if (  !body.email || !body.password ) {

      return res.render("login" , { error :  "enter all fields " } ) ; 

    }
    
    const result = await user.findOne( {  email : body.email }) ; 

    
    if(!result ) {
      return res.render("login" , { error : "enter the valid email address "}) ; 
    }
    
    const ismatch =  await bcrypt.compare(  body.password ,  result.password );
    
    if(!ismatch){
       return res.render("login" , { error : "enter the valid password "}) ; 
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