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
      position,
      status,
      shedule,
      skills, 
      bio,
      phone,
      location
    } = req.body;

    if(!name || !email || !status || !position || !shedule || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing or invalid"
      });
    }

    const allowedStatus = ["active", "away"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status"
        });
    }
    
    const normalizedEmail = email.toLowerCase();
    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    let finalRole = "user"; 


    if (req.user.role === "admin" && req.body.role) {
     const allowedRoles = ["user", "admin"];

     if (!allowedRoles.includes(req.body.role)) {
       return res.status(403).json({
         message: "Invalid role"
       });
     }

     finalRole = req.body.role;
   }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: finalRole,
      position,
      status,
      shedule,
      skills,
      bio,
      phone,
      location,
      providers: ["local"]
    });
    
    const {password, ...safeUser} = user.toObject();

    res.status(201).json({
      success: true,
      user: safeUser,
      tempPassword,  //optional (for testing)
      message: "User created successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "User creation failed",
      error: error.message
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const restrictedFields = ["password", "role", "providers", "_id",];

    const updateData = { ...req.body };

    for (let field of restrictedFields) {
      delete updateData[field];
    }

    Object.assign(user, updateData);

    await user.save();

    const { password, ...userData } = user._doc;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: userData,
    });

  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {

    if(req.user.role != "admin") {
      return res.status(403).json({
           message: "Forbidden: Admins only",
        });
    }

    const {id} = req.params;

    if (!id) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const user = await User.findByIdAndDelete(id);

    if(!user) {
      return res.status(404).json({
          message: "User not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Sevre Error",
    });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
  
};