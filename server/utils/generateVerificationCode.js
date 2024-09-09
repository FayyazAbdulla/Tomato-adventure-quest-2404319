// generateVerificationCode.js 
function generateVerificationCode() {
    // Generate a random verification code (for example, a 6-digit code)
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString(); // Convert to string for consistency
  }
  
  module.exports = { generateVerificationCode }; // Export the function for use in other files
  