const express = require("express");
const { checkIn, checkOut, getTodayAttendance, getAttendanceByDate, getUserMonthlyAttendance, getLateArrivals, updateWFHShedule, getAllUsersWFH, } = require("../controller/attendance.controller.js");
const {protect} =  require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/checkin", protect, checkIn);
router.post("/checkout", protect, checkOut);

router.get("/today", protect, getTodayAttendance);
router.get("/", protect, getAttendanceByDate);
router.post("/mode", protect, updateWFHShedule);
// all users weekly (admin)
router.get("/week/all", getAllUsersWFH);
router.get("/late-arrivals", protect, getLateArrivals);
router.get("/:userId", protect, getUserMonthlyAttendance);

module.exports = router;