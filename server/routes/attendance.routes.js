import express from "express";
import { checkIn, checkOut } from "../controller/attendance.controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/checkin", protect, checkIn);
router.post("/checkout", protect, checkOut);

export default router;