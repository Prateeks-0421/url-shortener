const mongoose = require('mongoose'); 

const urlschema = new mongoose.Schema( {

 shortenedurl : {
    type : String ,
    required : true , 
    unique : true

 } , 

originalurl : {
    type : String ,
    required : true
} , 
visithistory : [ {  timestamp : { type : Number } } ] ,

createdby : {
    type : mongoose.Schema.Types.ObjectId , 
    ref : "users" 
       
}

}) ; 

url = mongoose.model('url' , urlschema) ;

module.exports = url ;