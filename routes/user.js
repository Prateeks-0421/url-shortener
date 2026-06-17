const express = require("express") ; 

const router = express.Router() ; 

const { handlesignup , handlelogin , handleforgetpasswordemail , handlesendingotp }= require("../controllers/users")

router.post("/" , handlesignup) ; 

router.post("/login" , handlelogin ) ; 

router.get("/forget-password" , handleforgetpasswordemail ) ; 

router.post("/sent-otp"  , handlesendingotp ) ;

// router.post("/make-newpassword" , handleotpverificatonagain ) ;

module.exports =  router  ; 