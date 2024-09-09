// server/models/UserInfo.js

const mongoose = require("mongoose");

// Define the schema
const UserInfoSchema = new mongoose.Schema({
  email: {type: "string",unique: true},
  password: String,
});

// Create the model
const UserInfo = mongoose.model("UserInfo", UserInfoSchema);

module.exports = UserInfo;