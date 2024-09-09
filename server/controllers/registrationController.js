// // registrationControllers.js

// require("dotenv").config(); // Load environment variables
// const bcrypt = require("bcryptjs");
// const UserInfo = require("../models/UserInfo");
// const { sendRegistrationEmail } = require("./sendEmail"); // Import email service

// async function registerUser(req, res) {
//   try {
//     const { email, password } = req.body;

//     // Check if email and password are provided
//     if (!email || !password) {
//       return res.status(400).json({ error: "Email and password are required" });
//     }

//     // Check if user with the provided email already exists
//     const userExists = await UserInfo.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ error: "User with this email already exists" });
//     }

//     // Hash the password for security
//     const encryptedPassword = await bcrypt.hash(password, 8);

//     // Create a new user document in the database
//     await UserInfo.create({
//       email, 
//       password: encryptedPassword,
//     });

//     // Send registration email
//     sendRegistrationEmail(email, res); // Pass response object 'res'

//     // Return success response
//     res.status(201).json({ status: "User created" });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ status: "Error", message: error.message });
//   }
// }
 
// module.exports = { registerUser };
