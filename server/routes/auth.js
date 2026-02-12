const express = require("express");
const { signup, signin, getUserProfile, updateUserProfile, uploadImage, signout } = require("../controller/auth");
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

const router = express.Router()

router.post("/signup", signup)

router.post("/signin", signin)

router.get("/user-profile", verifyToken, getUserProfile)

router.put("/update-profile", verifyToken, updateUserProfile)

router.post("/upload-image", upload.single("image"), uploadImage)

router.post("/sign-out", signout)


module.exports = router