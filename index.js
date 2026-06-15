require("dotenv").config();
const express = require('express') ;
const app = express() ;
const urlrouter = require('./routes/url') ; 
const url = require('./models/url') ;
const path = require('path') ; 
const { staticroute } = require('./routes/staticRouter') ;
const userrouter = require("./routes/user")
const {connectdb}  = require("./connection")
const {restrictto , checkauth } = require("./middleware/auth") ; 
const cookieparser = require("cookie-parser") ; 

// connect to the database 

connectdb('mongodb://localhost/url-app')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

 
app.set('view engine' , 'ejs') ;    
app.set('views' , path.resolve( './views' ) ) ;    

app.use(express.json()) ;


// parse the form data 

app.use(express.urlencoded( { extended : false } ) ) ;
app.use(cookieparser()) ;  

app.use('/' , checkauth ,  staticroute ) ;

app.use('/users' ,   userrouter) ; 


// routes 
app.use('/url'  ,  restrictto("NORMAL" , "ADMIN") , urlrouter ) ; 

// handle get request for shortened url 
app.get('/:shortid' , async (req , res) => {
   
    const shortid = req.params.shortid;

        const result = await url.findOne({
            shortenedurl: shortid
        });

        if (!result) {
            return res.status(404).json({
                error: 'shortened url not found'
            });
        }

        // Update visit history
        result.visithistory.push({
            timestamp: Date.now()
        });

        await result.save();

        return res.redirect(result.originalurl); 
   
}) ;

app.listen(8000 , () => {
    console.log('Server is running on port 8000') ;
}) ;

