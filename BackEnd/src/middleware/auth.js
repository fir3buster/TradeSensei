const jwt = require("jsonwebtoken");
const authManager = (req, res, next) => {
    if (!("authorization" in req.headers)) {
        return res.status(400).json({ status: "error", msg: "no token found" });
    }

    const token = req.headers["authorization"].replace("Bearer ", "");

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
            req.decoded = decoded;
            next();
        } catch (error) {
            console.error(error.message);
            return res
                .status(401)
                .json({ status: "error", msg: "unauthorised" });
        }
    } else {
        return res.status(403).json({ status: "error", msg: "missing token" });
    }
};

const authGeneralManager = (req, res, next) => {
    if (!("authorization" in req.headers)) {
        return res.status(400).json({ status: "error", msg: "no token found" });
    }

    const token = req.headers["authorization"].replace("Bearer ", "");

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
            if (decoded.role === "general manager") {
                req.decoded = decoded;
                next();
            } else {
                throw new Error(); // to catch the error from below
            }
        } catch (error) {
            console.error(error.message);
            return res
                .status(401)
                .json({ status: "error", msg: "unauthorised" });
        }
    } else {
        return res.status(403).json({ status: "error", msg: "missing token" });
    }
};

module.exports = { authManager, authGeneralManager };
