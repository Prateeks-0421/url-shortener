const url = require('../models/url') ;
const express = require('express') ;
const router = express.Router() ; 


const { handlepostrequest , handleanalytics } = require('../controllers/url') ;

router.post( '/' , handlepostrequest ) ;

router.get('/analytics/:shortid' , handleanalytics ) ; 

module.exports = router ;