const {setuser , getuser } = require("../service/auth") ; 

async function restrictlogin(req , res , next ){

const uid = req.cookies?.uid ; 

if(!uid) return res.redirect("/login") ; 

const user = getuser(uid) ; 

if(!user) return res.redirect("/login") ; 

  req.user = user ; 
  next() ; 
}

async function checkauth( req , res ,next ) {

const uid = req.cookies?.uid ; 

const user = getuser(uid) ; 

  req.user = user ; 
  next() ; 

}

module.exports = { restrictlogin , checkauth } ; 