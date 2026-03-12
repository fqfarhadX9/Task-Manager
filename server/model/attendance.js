const mongoose = require("mongoose")
const attendanceSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  date: {
    type: String, // "2026-03-13"
    required: true
  },

  checkIn: {
    type: Date
  },

  checkOut: {
    type: Date
  },

  hours: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ["present", "late", "half", "absent"],
    default: "present"
  }

}, { timestamps: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;