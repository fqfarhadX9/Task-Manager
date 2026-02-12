const User = require("../model/user.js")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error.js");

const signup = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl, adminJoinCode } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isAlreadyExist = await User.findOne({ email });
    if (isAlreadyExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    let role = "user";
    if (
      adminJoinCode &&
      adminJoinCode === process.env.ADMINJOIN_CODE
    ) {
      role = "admin";
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({
      message: "Signup failed",
      error: error.message,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordMatch = await bcryptjs.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // remove password before sending user data
    const { password: _, ...userData } = user._doc;

    res.status(200).json({
      message: "Signin successful",
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Signin failed",
      error: error.message,
    });
  }
};


const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findOne(req.user.id)
    if (!user) {
      return next(errorHandler(404, "user not found!"))
    }
    
    const {password: pass, ...rest} = req._doc
    res.status(200).json(rest)

  } catch (error) {
    next(error)
  }
}

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return next(errorHandler(404, "user not found!"))
    }
  
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
  
    if(user.body.password) {
      user.password = user.body.password
    }
  
    const updatedUser = user.save()
  
    const {password: pass, ...rest} = req._doc
  
    res.status.jason(rest)
  
  } catch (error) {
    next(error)
  }  
}

const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(errorHandler(400, "No file uploaded"))
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`

    res.status(200).json({ imageUrl })
  } catch (error) {
    next(error)
  }
}

const signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been loggedout successfully!")
  } catch (error) {
    next(error)
  }
}

module.exports = {
    signup,
    signin,
    getUserProfile,
    updateUserProfile,
    uploadImage,
    signout
}