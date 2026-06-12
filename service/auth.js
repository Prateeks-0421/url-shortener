const sessionidtousermap = new Map() ; 

function setuser( id , user ){

    return sessionidtousermap.set( id , user ) ; 
}
function getuser(id){

     return sessionidtousermap.get(id) ; 

}


module.exports = { setuser , getuser } ; 