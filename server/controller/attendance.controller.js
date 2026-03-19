const Attendance = require("../model/attendance.js");

const checkIn = async (req, res) => {
  try {

    const userId = req.user.id;

    const now = new Date();

    const today = new Date().toLocaleDateString("en-CA");

    const existing = await Attendance.findOne({
      userId,
      date: today,
    });

    if (existing) {
      return res.status(400).json({
        message: "You already checked in today",
      });
    }

    const officeTime = new Date(now);
    officeTime.setHours(9, 5, 0, 0);

    let status = "present";
    let lateMinutes = 0; 

    if (now > officeTime) {
      status = "late";
      lateMinutes = Math.floor((now - officeTime) / 60000);
    }

    const attendance = await Attendance.create({
      userId,
      date: today,
      checkIn: now,
      status,
      lateMinutes
    });

    res.status(201).json({
      message: "Check in successful",
      attendance,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const checkOut = async (req, res) => {
  try {

    const userId = req.user.id;

    const now = new Date();

    const today = new Date().toLocaleDateString("en-CA");

    const attendance = await Attendance.findOne({
      userId,
      date: today
    });

    if (!attendance) {
      return res.status(400).json({
        message: "You must check in first"
      });
    }

    if (attendance.checkOut) {
      return res.status(400).json({
        message: "Already checked out"
      });
    }

    attendance.checkOut = now;

    
    const hours =
      (attendance.checkOut - attendance.checkIn) /
      (1000 * 60 * 60);

    attendance.hours = Number(hours.toFixed(2));

    if (attendance.hours < 6) {
      attendance.status = "half day";
    }

    await attendance.save();

    res.json({
      message: "Check out successful",
      attendance
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });

  }
};

const getAttendanceByDate = async (req, res) => {
  try {

    const { date } = req.query;

    const attendance = await Attendance.find({ date })
      .populate("userId", "name");

    res.json({
      attendance
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });

  }
};


const getTodayAttendance = async (req, res) => {
  try {

    const userId = req.user.id;

    const today = new Date().toLocaleDateString("en-CA");

    const attendance = await Attendance.findOne({
      userId,
      date: today
    });

    res.json({
      attendance
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });

  }
};

const getUserMonthlyAttendance = async (req, res) => {
  try {

    const { userId } = req.params;
    const { month } = req.query;

    const attendance = await Attendance.find({
      userId,
      date: { $regex: `^${month}` }
    });

    res.json({
      attendance
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};

const getLateArrivals = async (req, res) => {
  try {

    let query = { status: "late" };

    if (req.user.role === "user") {
      query.userId = req.user.id;
    }

    const records = await Attendance.find(query)
      .populate("userId", "name")
      .sort({ date: -1 });

    res.json({
      lateArrivals: records
    });

  } catch (error) {
    console.error("Error fetching late arrivals:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
    checkIn,
    checkOut,
    getTodayAttendance,
    getAttendanceByDate,
    getUserMonthlyAttendance,
    getLateArrivals
}