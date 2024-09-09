// // MailGun.js
// const FormData = require('form-data');
// const Mailgun = require('mailgun.js');
// const mailgun = new Mailgun(FormData);
// const mg = mailgun.client({ username: 'api', key: '4c205c86-64603cee' }); // Your Mailgun API key

// // Function to send registration email
// function sendRegistrationEmail(email, res) {
//   // Prepare email data
//   const emailData = {
//     from: "Excited User <mailgun@sandboxcb3e05f0edf44e6bb7af18b84c27937f.mailgun.org>", // Your verified domain
//     to: [email], // Recipient's email address
//     subject: "Hello",
//     text: "Testing some Mailgun awesomeness!",
//     html: "<h1>Testing some Mailgun awesomeness!</h1>"
//   };

//   // Send the email
//   mg.messages.create('sandboxcb3e05f0edf44e6bb7af18b84c27937f.mailgun.org', emailData)
//     .then(msg => {
//       console.log("Email sent successfully:", msg); // logs response data
//       res.status(200).json({ message: "Registration email sent successfully" }); // Optional feedback to user
//     })
//     .catch(err => {
//       console.error("Error sending email:", err); // logs any error

//       // Notify administrators
//       notifyAdmins("Error occurred while sending registration email", err);

//       // Optionally, provide feedback to users
//       res.status(500).json({ error: "Failed to send registration email. Please try again later." }); // Optional feedback to user
//     });
// }

// // Function to notify administrators (sending an email)
// function notifyAdmins(subject, error) {
//   // Admin email addresses
//   const adminEmails = ["admin1@example.com", "admin2@example.com"]; // Update with your admin emails

//   // Email data
//   const emailData = {
//     from: "System <system@example.com>",
//     to: adminEmails,
//     subject: subject,
//     text: `Error details: ${error}`
//   };

//   // Send the email
//   mg.messages.create('sandboxcb3e05f0edf44e6bb7af18b84c27937f.mailgun.org', emailData)
//     .then(msg => {
//       console.log("Admins notified about the error:", msg); // logs response data
//     })
//     .catch(err => {
//       console.error("Error notifying admins:", err); // logs any error
//     });
// }

// module.exports = { sendRegistrationEmail };
