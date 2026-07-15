const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Access Denied. No Token Provided."
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const verified = jwt.verify(token, "hospital_secret_key");
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid Token"
        });
    }
};
