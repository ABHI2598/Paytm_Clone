const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');



const userAuthMiddleware = (req,res,next) => {

    const authKey = req.headers.authorization;
    if(!authKey.startsWith('Bearer ') || !authKey)
    {
        return res.status(403).json({});
    }

    const token = authKey.split(' ')[1];
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        if(decoded.userId)
        {
            req.userId = decoded.userId;
            next();
        }
        else{
            return res.status(403).json({});
        }
    }
    catch(err)
    {
        return res.status(403).json(err);
    }
}


module.exports = {
    userAuthMiddleware
}