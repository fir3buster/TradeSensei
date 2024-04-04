const express = require("express");
const {
    getAllUsers,
    register,
    login,
} = require("../controllers/loginAuthController");

// const {
//     validateLoginData,
//     validateRefreshToken,
//     validateRegistrationData,
// } = require("../validators/auth-validate");

// const { errorCheck } = require("../validators/errorsCheck");

const router = express.Router();

// router.get("/users", getAllUsers);
// router.put("/register", validateRegistrationData, errorCheck, register);
// router.post("/login", validateLoginData, errorCheck, login);
// router.post("/refresh", validateRefreshToken, errorCheck, refresh);

router.get("/users", getAllUsers);
router.put("/register", register);
router.post("/login", login);

module.exports = router;
