const express = require("express");
const { signup, signin, googleSignin} = require("../controller/auth");
const router = express.Router()

router.post("/signup", signup)

router.post("/signin", signin)

router.post("/google", googleSignin);

// router.get("/user-profile", verifyToken, getUserProfile)

// router.put("/update-profile", verifyToken, updateUserProfile)

// router.post("/upload-image", upload.single("image"), uploadImage)

// router.post("/sign-out", signout)


module.exports = router