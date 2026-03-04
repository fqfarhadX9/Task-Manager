const User = require("../model/user");

// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password");

//     res.status(200).json({
//       success: true,
//       users,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getAllUsers = async (req, res) => {
  try {
    const {
      search,
      role,
      status,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Search by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by role
    if (role && role !== "all") {
      query.role = role;
    }

    // Filter by status
    if (status !== undefined) {
      query.isActive = status === "true";
    }

    const users = await User.find(query)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      page: Number(page),
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      users,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Password update yaha allow nahi karenge
    const { password, ...updateData } = req.body;

    Object.assign(user, updateData);

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User deactivated successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const activateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User activated successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  deactivateUser,
  activateUser,
};