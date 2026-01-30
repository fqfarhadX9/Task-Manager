const User = require("../model/user.js")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error.js");
const signup = async (req, res, next) => {
  const { name, email, password, profileImageUrl, adminJoinCode } = req.body

  if (
    !name ||
    !email ||
    !password ||
    name === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required"))
  }

  const isAlreadyExist = await User.findOne({ email })

  if (isAlreadyExist) {
    return next(errorHandler(400, "User already exists"))
  }

  let role = "user"

  if (adminJoinCode && adminJoinCode === process.env.ADMINJOIN_CODE ) {
    role = "admin"
  }

  const hashedPassword = bcryptjs.hashSync(password, 10)

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    profileImageUrl,
    role,
  })

  try {
    await newUser.save()

    res.json("Signup successful")
  } catch (error) {
    next(error.message)
  }
}

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password || email === "" || password === "") {
      return next(errorHandler(400, "All fields are required"))
    }

    const validUser = await User.findOne({ email })

    if (!validUser) {
      return next(errorHandler(404, "User not found!"))
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password)

    if (!validPassword) {
      return next(errorHandler(400, "Wrong Credentials"))
    }

    const token = jwt.sign(
      { id: validUser._id, role: validUser.role },
      process.env.JWT_SECRET
    )

    const { password: pass, ...rest } = validUser._doc

    res.status(200).cookie("access_token", token, { httpOnly: true }).json(rest)
  } catch (error) {
    next(error)
  }
}

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