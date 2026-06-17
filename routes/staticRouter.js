const express = require('express') ;
const staticroute = express.Router() ;
const url = require('../models/url') ;
const { handleotpverification , handleotpverificationagain } = require("../controllers/otp") ; 
const {restrictto , checkauth } = require("../middleware/auth") ; 
const users =  require('../models/user')
const bcrypt = require("bcrypt") ; 


staticroute.get('/' , async (req , res) => {  

     if(!req.user ) return res.render("home" , { user : null }) ; 
    
     if(req.user){

    allurls = await url.find({ createdby : req.user._id }) ;
    return res.render('home', { urls: allurls , user : req.user} ) ;

     } 
}) ;

staticroute.get('/admin'  , restrictto("ADMIN") , async (req , res) => {  

     if(!req.user ) return res.render("home" , { user : null } ) ; 
    
     if(req.user){

    allurls = await url.find({}) ;
    return res.render('home', { urls: allurls  , user : req.user }) ;

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

staticroute.get("/logout", async ( req , res ) => {
       
     res.clearCookie("uid");

    return res.redirect("/");

}) ; 

staticroute.post("/verify-otp" , handleotpverification ) ; 

staticroute.post("/verify-otp-again" , handleotpverificationagain ) ; 

staticroute.post("/changepassword", async ( req , res ) => {
       
  body = req.body ; 

  if(!body.password){
     res.render("changepassword" , { email : body.email , error : "enter the password "}) ;
  }

  const user = await users.findOne({ email : body.email }) ;

  const hashedpassword = await bcrypt.hash(body.password , 10 ) ; 
  
  user.password = hashedpassword ; 

  await user.save() ; 

  const allurls = await url.find({  createdby : user._id }) ; 
   
  res.render("home" , { urls : allurls , user : user }) ; 

}) ; 


module.exports = { staticroute } ;
