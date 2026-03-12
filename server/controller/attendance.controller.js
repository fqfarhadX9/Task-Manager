import Attendance from "../../client/src/pages/Attendance";

export const checkIn = async (req, res) => {
  try {

    const userId = req.user.id;

    const now = new Date();

    const today = now.toISOString().split("T")[0];

    const existing = await Attendance.findOne({
      userId,
      date: today,
    });

    if (existing) {
      return res.status(400).json({
        message: "You already checked in today",
      });
    }

    const officeTime = new Date();
    officeTime.setHours(9, 0, 0, 0);

    let status = "present";

    if (now > officeTime) {
      status = "late";
    }

    const attendance = await Attendance.create({
      userId,
      date: today,
      checkIn: now,
      status,
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

export const checkOut = async (req, res) => {
  try {

    const userId = req.user.id;

    const now = new Date();

    const today = now.toISOString().split("T")[0];

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
      attendance.status = "half";
    }

    await attendance.save();

    res.json({
      message: "Check out successful",
      attendance
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};
module.exports = {
    checkIn,
    checkOut
}