const User = require("../model/user.js")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");

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

module.exports = {
    signup,
    signin,
}