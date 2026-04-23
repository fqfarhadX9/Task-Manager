const User = require("../model/user.js")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { sendEmailOtp } = require("../utils/sendEmailOtp.js");



const signup = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl, adminJoinCode } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isAlreadyExist = await User.findOne({ email });
    if (isAlreadyExist) {

      if (isAlreadyExist.providers?.includes("google")) {
        return res.status(400).json({
          message: "Account already exists with Google. Please login with Google or set a password."
        });
      }

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
      providers: ["local"],
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

    if (!user.providers?.includes("local")) {
      return res.status(400).json({
        message: "Please login using Google",
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


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleSignin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { name, email, picture, email_verified } = payload;

    if (!email_verified) {
      return res.status(400).json({
        message: "Google email not verified",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await  User.create({
        name,
        email,
        profileImageUrl: picture,
        providers: ["google"],
      });
    } else {
      if (!user.providers) {
        user.providers = ["local"];
      }

      if (!user.providers?.includes("google")) {
        user.providers.push("google");
        await user.save();
      }
      
      if (!user.profileImageUrl) {
        user.profileImageUrl = picture;
      }
    }

    const jwtToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const { password, ...userData } = user._doc;

    res.status(200).json({
      message: "Signin successful",
      token: jwtToken,
      user
    });
  } catch (error) {
    res.status(500).json({
      message: "Google Signin failed",
      error: error.message,
    });
  }
};

const sendOtp = async (req, res) => {
  const { email } = req.body;

  let user;

  if (email.includes("@")) {
    user = await User.findOne({ email: email.toLowerCase() });
  } 

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcryptjs.hash(otp, 10);

  user.otp = hashedOtp;
  user.otpExpires = Date.now() + 5 * 60 * 1000;

  await user.save();

  if (email.includes("@")) {
    await sendEmailOtp(user.email, otp);
  } 

  res.json({ message: "OTP sent" });
};


const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const  user = await User.findOne({ email: email.toLowerCase() });
      
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
  
    const isOtpValid = await bcryptjs.compare(otp, user.otp);
    if (!isOtpValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  
    if (!user.otpExpires || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }
  
    const resetToken = require("crypto").randomBytes(32).toString("hex");
  
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 10 * 60 * 1000;
    user.otp = undefined;
    user.otpExpires = undefined;
  
    await user.save();
  
    res.json({ resetToken });
  } catch (error) {
    res.status(500).json({ message: "Internal server error"});
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    const user = await User.findOne({resetToken}).select("+password");


    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (!user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      return res.status(400).json({ message: "token expired" });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    user.password = hashedPassword;

    if (!user.providers.includes("local")) {
      user.providers.push("local");
    }

    user.resetToken = undefined;
    user.resetTokenExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
    signup,
    signin,
    googleSignin, 
    sendOtp,
    verifyOtp,
    resetPassword
}