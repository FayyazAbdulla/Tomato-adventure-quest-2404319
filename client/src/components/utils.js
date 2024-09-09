// utils.js

// Function to generate a random verification code
export function generateVerificationCode() {
    // Adjust the length if you want a longer or shorter code
    const codeLength = 6; 

    // Generate a random code string of numbers
    let code = '';
    for (let i = 0; i < codeLength; i++) {
        code += Math.floor(Math.random() * 10).toString(); // Generate random digit between 0-9
    }
    return code;
}
