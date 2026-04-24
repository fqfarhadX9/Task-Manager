const express = require("express");
const { signup, signin, googleSignin, sendOtp, verifyOtp, resetPassword, verifyAdminCode} = require("../controller/auth");
const {protect} = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/signup", signup)

router.post("/signin", signin)

router.post("/google", googleSignin);

router.post("/send-otp", sendOtp);

router.post("/verify-otp", verifyOtp);

router.post("/reset-password", resetPassword);
    
router.post("/verify-admin-code", protect, verifyAdminCode);

// router.get("/user-profile", verifyToken, getUserProfile)

// router.put("/update-profile", verifyToken, updateUserProfile)

// router.post("/upload-image", upload.single("image"), uploadImage)

// router.post("/sign-out", signout)


module.exports = router