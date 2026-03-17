const TimeOff = require("../model/timeOffRequests.js");

const createTimeOffRequest = async (req, res) => {
  try {

    const userId = req.user.id;
    const { startDate, endDate, reason } = req.body;

    const request = await TimeOff.create({
      userId,
      startDate,
      endDate,
      reason,
    });

    res.status(201).json({
      message: "Time off request submitted",
      request,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });

  }
};

const getTimeOffRequests = async (req, res) => {
  try {

    let requests;

    if (req.user.role === "admin") {
      // admin → sab requests
      requests = await TimeOff.find()
        .populate("userId", "name")
        .sort({ createdAt: -1 });

    } else {
      // normal user
      requests = await TimeOff.find({ userId: req.user.id })
        .populate("userId", "name")
        .sort({ createdAt: -1 });
    }

    res.json({ requests });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const updateTimeOffStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { status } = req.body;

     if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can update request status"
      });
    }

    const request = await TimeOff.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({
      message: "Request updated",
      request,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });

  }
};

module.exports = {
    createTimeOffRequest,
    getTimeOffRequests,
    updateTimeOffStatus
}