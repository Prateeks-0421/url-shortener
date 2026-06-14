const express = require("express") ; 

const router = express.Router() ; 

const { handleotpverification } = require("../controllers/otp") ; 


router.post("/verify-otp" , handleotpverification ) ; 

module.exports =  router  ; 