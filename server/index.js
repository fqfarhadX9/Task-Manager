const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require("./config/db.js");
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.js')
const userRoutes = require('./routes/user.route.js');
const taskRoutes = require('./routes/task.routes.js');
const commentRoutes = require('./routes/comment.routes.js');

dotenv.config(); 
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}))

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/comment", commentRoutes)

const port = process.env.PORT || 8800;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});