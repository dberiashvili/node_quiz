const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('auth-token');
    if (!token) return res.status(400).json({
        error: 'Access Denied'
    });
    try{
        req.user = jwt.verify(token, process.env.TOKEN).user;
        next()
    }catch (e) {
        res.status(400).json({
           error: 'token is not valid'
        })
    }
};