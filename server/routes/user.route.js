const express = require("express");
const { protect, isAdmin } = require("../middleware/authMiddleware.js");
const { getAllUsers } = require("../controller/user.controller.js");

const router = express.Router();

router.get("/", protect, isAdmin, getAllUsers);

module.exports = router;
