const express = require("express");
const router = express.Router();

const {
  createEvent,
  getEventsByMonth,
  updateEvent,
  deleteEvent,
} = require("../controller/event.controller.js");
const { protect } = require("../middleware/authMiddleware.js");

router.post("/", protect, createEvent);

router.get("/", protect, getEventsByMonth);

router.put("/:id", protect, updateEvent);

router.delete("/:id", protect, deleteEvent);

module.exports = router;