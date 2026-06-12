const user = require("../models/user") ; 
const {v4 : uuidv4} = require("uuid") ;
const {setuser , getuser } = require("../service/auth") ;  
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

    const sessionid = uuidv4() ; 
    setuser(sessionid , result ) ; 
    res.cookie("uid" , sessionid ) ; 

    return res.redirect("/") ; 
   // return res.render("home") ; 

}


module.exports = { handlesignup , handlelogin } ; 