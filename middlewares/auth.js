const jwt = require("jsonwebtoken");
const User = require('../models/user')
const reauth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "longer-secret-is-better");
          console.log(token);
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed!" });
    }
};
const checkuser = async(req, res, next) => {
    try {
        var token = req.headers.authorization.split(" ")[1],
        decoded = jwt.verify(token, "longer-secret-is-better");
       var userID = decoded.id;
        let user = await User.findOne({_id: userID});
        res.locals.user = user;
        next();
        console.log(userID);
    }catch (error) {
        res.status(401).json({ message: "Authentication failed!" });
    }
};

module.exports = {reauth ,checkuser};