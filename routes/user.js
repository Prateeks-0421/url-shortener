const express = require("express") ; 

const router = express.Router() ; 

const { handlesignup , handlelogin } = require("../controllers/users")

router.post("/" , handlesignup) ; 

router.post("/login" , handlelogin ) ; 

module.exports =  router  ; 