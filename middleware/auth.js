const {setuser , getuser } = require("../service/auth") ; 


 function restrictto(...roles){

 return function (req , res , next ){

const uid = req.cookies?.uid ; 

if(!uid) return res.redirect("/login") ; 

const user = getuser(uid) ; 

if(!user) return res.redirect("/login") ; 

  req.user = user ; 

  console.log(req.user.role)

if(!roles.includes(req.user.role)){

 return res.status(403).send("Unauthorized");

}
   next() ; 
} 

}
async function checkauth( req , res ,next ) {

const uid = req.cookies?.uid ; 

const user = getuser(uid) ; 

  req.user = user ; 
  next() ; 

}

module.exports = { restrictto, checkauth } ; 










// async function restrictlogin(req , res , next ){

// const uid = req.cookies?.uid ; 

// if(!uid) return res.redirect("/login") ; 

// const user = getuser(uid) ; 

// if(!user) return res.redirect("/login") ; 

//   req.user = user ; 
//   next() ; 
// }