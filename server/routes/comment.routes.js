const express = require("express");
const { addComment, getTaskComments } = require("../controller/comment.controller");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:id", protect, addComment);
router.get("/:id", protect, getTaskComments);

module.exports = router;