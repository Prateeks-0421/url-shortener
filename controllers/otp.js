
const {setuser , getuser } = require("../service/auth") ;  
const users = require("../models/user") ; 

async function handleotpverification( req  , res ){

    const body = req.body ; 

if(!body.otp || !body.email) return res.render("verifyotp" , { email: body.email , error : "please enter the  otp "}) ; 

const user = await users.findOne({email : body.email }) ; 

if( !user ) {
     return res.render("verifyotp" , {email: body.email , error : "enter the valid email "}) ; 
}



if( body.otp !== user.otp ) {

  return res.render("verifyotp" , { email: body.email , error : "your otp is wrong "}) ; 

}   

 if(Date.now() > user.otpexpiry)
{
    return res.render(
        "verifyotp",
        {   
            email: body.email ,
            error: "OTP expired"
        }
    );
}

     user.otp = undefined;
     user.otpexpiry = undefined ; 
     await user.save() ; 

   const token = setuser(user) ;
    res.cookie("uid" , token ) ;

     allurls = await url.find({ createdby : user._id }) ;

    return res.status(201).render('home' , {  user : user , urls : allurls  } ) ;

}

module.exports = { handleotpverification } ; 