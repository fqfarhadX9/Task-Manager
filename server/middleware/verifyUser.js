const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return next(errorHandler(401, "Unauthorized"))
    }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized request / access_token does't matched"))
    }

    req.user = user

    next()
  })
}

const adminOnly = (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) {
    return next(errorHandler(401, "Unauthorized"))
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "access_token does't matched"))
    }

    req.user = user

    console.log(req.user)

    if (req.user && req.user.role === "admin") {
      next()
    } else {
      return next(errorHandler(403, "Access Denied, admin only!"))
    }
  })
}

module.exports = {
    verifyToken,
    adminOnly   
}