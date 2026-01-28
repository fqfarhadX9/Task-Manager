const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); 
const mongoose = require('mongoose');

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

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}))



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});