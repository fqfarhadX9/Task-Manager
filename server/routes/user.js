const express = require("express");
const { verifyToken, adminOnly } = require("../middleware/verifyUser");
const { getUsers, getUserById } = require("../controller/user");

const router = express.Router()

router.get("/get-users", verifyToken, adminOnly, getUsers)

router.get("/:id", verifyToken, adminOnly, getUserById)

module.exports = router