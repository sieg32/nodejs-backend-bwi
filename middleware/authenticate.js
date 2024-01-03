const jwt = require('jsonwebtoken');


async function authenticate(req,res,next){

    if(req.headers.token){
        const token = req.headers.token.split(' ')[1];
        
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.tokenId = decoded.id;
        req.isAdmin = decoded.isAdmin;
        console.log(decoded)
      
      next();
    }else{
      res.status(401).send('unauthorized')
    }

}

module.exports = authenticate;