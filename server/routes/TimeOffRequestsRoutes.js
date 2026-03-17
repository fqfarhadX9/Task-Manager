const express = require("express");
const {
  createTimeOffRequest,
  getTimeOffRequests,
  updateTimeOffStatus,
} = require("../controller/TimeOffRequestsController.js");

const {protect, isAdmin} = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", protect, createTimeOffRequest);

router.get("/", protect, getTimeOffRequests);

router.patch("/:id", protect, isAdmin, updateTimeOffStatus);

module.exports =  router;