const mongoose = require("mongoose") ; 

userschema = mongoose.Schema( {

 name : {
    type : String , 
    required : true , 

 } , 
 email : {

    type : String , 
    required : true , 
    unique : true 

 } ,
 password : {

    type : String , 
    required : true 

 }
}
) ; 

 user = mongoose.model("user" , userschema ) ; 

 module.exports =  user  ; 








