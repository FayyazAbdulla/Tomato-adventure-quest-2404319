// server/routes/login.js
const express = require("express");
const bcrypt = require("bcryptjs");
const UserInfo = require("../models/UserInfo");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Received login data:", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required" });
  }

  try {
    const user = await UserInfo.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: "Invalid email or password" });
    }

    res.status(200).send({ status: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ status: "Error", message: error.message });
  }
});

module.exports = router;
