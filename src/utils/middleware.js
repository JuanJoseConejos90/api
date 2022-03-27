import jwt from 'jsonwebtoken';

let verifyToken = (req, res, next) => {


    if (!req.headers.authorization) {
        return res.status(403).json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }

    let token = req.headers.authorization.split(" ")[1];

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

module.exports = {
    verifyToken: verifyToken
}