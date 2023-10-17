const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async (req, res, next) => {
    const value = req.header("authorization") || req.header("Authorization");
    const token = value && value.split(" ")[1];
    // console.log(token);
    try {
        const checkUser  = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: checkUser._id});

        if(!rootUser) { throw new Error('User Not Found') }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();
    }
    catch(error) {
        res.status(401).send('Unauthorized: No Token Provided')
        console.log(error);
    }
}

module.exports = verifyToken;