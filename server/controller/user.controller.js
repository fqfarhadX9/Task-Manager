const User = require("../model/user");
const bcrypt = require("bcryptjs");

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
      position,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (role && role !== "all") {
      query.role = role;
    }

    if (status && status !== "all") {
      query.isActive = status === "true" || status === true;
    }

    if (position && position !== "all") {
      query.position = { $regex: `^${position}$`, $options: "i" };
    }

    const users = await User.find(query)
      .select("-password")
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      page: Number(page),
      totalUsers,
      totalPages: Math.ceil(totalUsers / Number(limit)),
      users,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {

    const {
      name,
      email,
      role,
      position,
      isActive,
      shedule,
      skills, 
      bio,
      phone,
      location
    } = req.body;

    if(!name || !email || !role || !position || !shedule || !skills) {
      return res.status(400).json({
        success: false,
        message: "All fields are required except bio"
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedpassword = await bcrypt.hash("1234567", 10);

    const user = await User.create({
      name,
      email,
      password: hashedpassword,
      role,
      position,
      isActive,
      shedule,
      skills,
      bio,
      phone,
      location
    });
    
    const {password, ...safeUser} = user.toObject();

    res.status(201).json({
      success: true,
      user: safeUser,
      message: "User created successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
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
      updatedUser: user
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
  createUser,
  updateUser,
  deactivateUser,
  activateUser,
};