// ./server/routes/registerRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const UserInfo = require("../models/UserInfo");
// const Verification = require("../models/verificationSchema"); 
// const { generateVerificationCode } = require('../utils/generateVerificationCode');
 
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Received data:", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required" });
  }

  try {
    const userExists = await UserInfo.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .send({ error: "User with this email already exists" });
    }

    const encryptedPassword = await bcrypt.hash(password, 8);

    // Generate verification code
    // const verificationCode = generateVerificationCode();

    // Save the email and verification code to the Verification table
    // await Verification.create({ email, verificationCode });

    await UserInfo.create({
      email,
      password: encryptedPassword,
    });

    res.status(201).send({ status: "User created" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ status: "Error", message: error.message });
  }
});

module.exports = router;
