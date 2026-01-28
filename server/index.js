const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); 
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/auth.js")

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log(error)
  })


const port = process.env.PORT || 8800;
const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}))

app.use("/api/auth", authRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500

  const message = err.message || "Internal Server Error"

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})