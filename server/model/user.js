const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    profileImageUrl: {
      type: String,
      default: "https://imgs.search.brave.com/7p-MC2-TJ5Vg4FozPjkuOrugYZpPKCr73_P26JbJN3w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzExLzY4LzUwLzU3/LzM2MF9GXzExNjg1/MDU3OTRfSUJDRWlh/ZnNJckhGSjA5ZTY1/UDJ2aDUxMTVDMVhJ/N2UuanBn",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // developer / designer / marketer etc
    position: {
      type: String,
      default: "Member",
    },

    skills: [
      {
        name: {
          type: String,
          required: true,
        },
        level: {
          type: Number,
          min: 0,
          max: 100,
          default: 50,
        }
      }
    ],

    bio: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "away"],
      default: "active"
    },

    shedule : {
      type: String,
      enum: ["office", "remote"],
      required: true
    },

    phone: {
      type: String,
    },

    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;