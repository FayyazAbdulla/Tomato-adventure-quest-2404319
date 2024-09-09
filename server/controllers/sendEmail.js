// //sendEmail.js
// const fs = require("fs");
// const mailgun = require("mailgun-js");

// // Initialize Mailgun API client
// const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

// // Function to send registration successful email
// function sendRegistrationEmail(email, callback) {
//   // Log email content for debugging
//   console.log("Email details:");
//   console.log("  From:", `Sender Name <${process.env.MAILGUN_FROM_EMAIL}>`);
//   console.log("  To:", email); // For debugging
//   console.log("  Subject:", " 🍅 Tomato Adventure Quest. 🍅 Registration Successful 🍅");

//   // Customize email message
//   let mailOptions = {
//     from: `Sender Name <${process.env.MAILGUN_FROM_EMAIL}>`,
//     to: email,
//     subject: "🍅 Tomato Adventure Quest. 🍅 Registration Successful 🍅",
//   };

//   // Read email template from file
//   try {
//     const template = fs.readFileSync("emailTemplate.html", "utf8");
//     mailOptions.html = template;
//   } catch (err) {
//     console.error("Error reading email template:", err);
//     // Notify admins
//     notifyAdmins("Error reading email template", err);
//     // Invoke callback with error
//     if (callback) {
//       callback(err);
//     }
//     return;
//   }

//   // Send mail
//   mg.messages().send(mailOptions, function (error, body) {
//     if (error) {
//       console.error("Error occurred while sending email:", error);
//       // Notify admins
//       notifyAdmins("Error occurred while sending email", error);
//       // Invoke callback with error
//       if (callback) {
//         callback(error);
//       }
//     } else {
//       console.log("Email sent:", body);
//       // Invoke callback with success
//       if (callback) {
//         callback(null, body);
//       }
//     }
//   });
// }

// // Function to notify admins (sending an email)
// function notifyAdmins(subject, error) {
//   const timestamp = new Date().toISOString();
//   const adminEmails = ["admin1@example.com", "admin2@example.com"]; // Update with your admin emails
//   const adminMailOptions = {
//     from: `Sender Name <${process.env.MAILGUN_FROM_EMAIL}>`,
//     to: adminEmails.join(", "),
//     subject: subject,
//     text: `Error details: ${JSON.stringify(error)}`,
//   };

//   // Send mail to admins
//   mg.messages().send(adminMailOptions, function (error, body) {
//     if (error) {
//       console.error(`${timestamp} - Error occurred while notifying admins:`, error);
//     } else {
//       console.log(`${timestamp} - Admins notified:`, body);
//     }
//   });
// }

// module.exports = { sendRegistrationEmail };





