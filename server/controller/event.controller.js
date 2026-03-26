const Event = require("../model/event");

const createEvent = async (req, res) => {
  try {
    const { title, description, startDate, endDate, allDay, assignedTo } =
      req.body;

    if (!title || !startDate || !endDate) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res
        .status(400)
        .json({ message: "End date cannot be before start date" });
    }

    if(req.role != "admin") {
       return res.status(403).json({ message: "Not allowed" });
    }

    const event = await Event.create({
      title,
      description,
      startDate,
      endDate,
      allDay,
      assignedTo,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEventsByMonth = async (req, res) => {
  try {
    const month = req.query.month || new Date().getMonth() + 1;
    const year = req.query.year || new Date().getFullYear();

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59);

    const events = await Event.find({
      isDeleted: false,
      startDate: { $lte: endOfMonth },
      endDate: { $gte: startOfMonth },
    })
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event || event.isDeleted) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (
      event.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    Object.assign(event, req.body);

    await event.save();

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event || event.isDeleted) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (
      event.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    event.isDeleted = true;

    await event.save();

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  getEventsByMonth,
  updateEvent,
  deleteEvent,
};