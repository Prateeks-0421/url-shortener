const express = require('express') ;
const staticroute = express.Router() ;
const url = require('../models/url') ;

staticroute.get('/' , async (req , res) => {  

     if(!req.user ) return res.render("home") ; 
    
     if(req.user){

    allurls = await url.find({createdby : req.user._id }) ;
    return res.render('home', { urls: allurls }) ;

     } 
}) ;

staticroute.get("/signup", async ( req , res ) => {
       
      console.log("Signup route hit");
       return res.render('signup') ; 

}) ; 

staticroute.get("/login", async ( req , res ) => {
       
      console.log("login route hit");
       return res.render('login') ; 

}) ; 

module.exports = { staticroute } ;
