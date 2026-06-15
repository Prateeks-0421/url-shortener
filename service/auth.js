// const sessionidtousermap = new Map() ; 

// function setuser( id , user ){

//     return sessionidtousermap.set( id , user ) ; 
// }
// function getuser(id){

//      return sessionidtousermap.get(id) ; 

// }


// module.exports = { setuser , getuser } ; 


const jwt = require("jsonwebtoken") ; 
const secretkey = "janhvi@123" ; 


function setuser( user ){

 return jwt.sign({
    _id : user._id , 
    email : user.email , 
    role : user.role 
 } , secretkey ) ; 

}

function getuser(token){

    if(!token) return null ; 

return jwt.verify(token , secretkey  ) ;  

}


module.exports = { setuser , getuser } ;  