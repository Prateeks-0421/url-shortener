const url = require('../models/url') ;
const shortid = require('shortid') ;

async function handlepostrequest ( req , res ) {

    body = req.body ;

    if ( !body.url ) {
        return res.status(400).json( { error : 'url is required' } ) ;
    }

  const result =  await url.create( { 
    shortenedurl : shortid(8) , 
    originalurl : body.url , 
    createdby : req.user._id 

} 

) ; 

 allurls = await url.find({ createdby : req.user._id }) ;


return res.status(201).render('home' , { shortid : result.shortenedurl , urls : allurls ,  user : req.user} ) ;
 
// return res.status(201).json( { shortenedurl : result.shortenedurl } ) ;

} 

async function handleanalytics( req , res ) {

 const shortid = req.params.shortid ;

 const result = await url.findOne( {  shortenedurl: shortid } ) ; 

 if( !result ) {

    res.status(404).json( { error : 'shortened url not found ' } ) ;
 }

//  returns the number of clicks and the analytics data (timestamp of each click) for the given shortened URL

 return res.status(200).json( { totalclicks : result.visithistory.length , analytics : result.visithistory } ) ;

}

module.exports = { handlepostrequest  , handleanalytics } ;