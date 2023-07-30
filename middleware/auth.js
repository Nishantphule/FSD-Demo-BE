const jwt = require("jsonwebtoken");
const config = require("../untils/config");

const authMiddleware = {
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Authorization Failed" })
        }

        try {
            jwt.verify(token, config.SECRET_KEY, (err, decodedToken) => {
                if (err) {
                    if (err.name === "Token Expired") {
                        return res.status(401).json({ message: "Token Expired" })
                    }
                    else {
                        return res.status(401).json({ message: "Authorization Failed" })
                    }
                }
                req.userId = decodedToken.userId;
                next();

            })
        } catch (error) {

            return res.status(401).json({ message: "Authorization Failed" })
        }
    }
}

module.exports = authMiddleware;