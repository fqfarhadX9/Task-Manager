const express = require("express");
const { protect, isAdmin } = require("../middleware/authMiddleware.js");
const { getAllUsers, updateUser, deactivateUser, activateUser } = require("../controller/user.controller.js");

const router = express.Router();

router.get("/", protect, isAdmin, getAllUsers);
router.put("/:id", protect, isAdmin, updateUser);
router.put("/:id/deactivate", protect, isAdmin, deactivateUser);
router.put("/:id/activate", protect, isAdmin, activateUser);

module.exports = router;
