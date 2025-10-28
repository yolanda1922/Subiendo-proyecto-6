const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Define schema fields here
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
