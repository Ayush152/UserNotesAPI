const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
    try {

        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized User" });
        }

        token = token.split(" ")[1];
        let user = jwt.verify(token, SECRET_KEY);
        req.userId = user.id;

        next();

    } catch {
        console.log(error);
        res.status(401).json({ message: "Unauthorized User" });
    }
}

module.exports = auth;