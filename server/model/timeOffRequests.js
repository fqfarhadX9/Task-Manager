const mongoose = require("mongoose");

const timeOffSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  startDate: {
    type: String,
    required: true,
  },

  endDate: {
    type: String,
    required: true,
  },

  reason: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
},
{ timestamps: true }
);

const TimeOff = mongoose.model("TimeOff", timeOffSchema);
module.exports = TimeOff;