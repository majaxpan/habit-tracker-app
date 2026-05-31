const jwt = require("jsonwebtoken")

const JWT_SECRET = "my_super_secret_key";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            console.log("No token provided");
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        if(!token){
            console.log("Invalid token format");
            return res.status(401).json({ message: "Invalid token format" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;

        next();
    }
    catch (err) {
        console.log("Invalid or expired token");
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;