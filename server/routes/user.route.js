const express = require("express");
const { protect, isAdmin } = require("../middleware/authMiddleware.js");
const { getAllUsers, updateUser, createUser, deleteUser } = require("../controller/user.controller.js");

const router = express.Router();

router.get("/", protect,  getAllUsers);
router.post("/", protect, isAdmin, createUser);
router.put("/:id", protect,   updateUser);
router.delete("/:id", protect, isAdmin, deleteUser);


module.exports = router;
