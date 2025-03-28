const mongoose = require("mongoose");

const SignUpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Enforces unique email addresses
  },
  password: {
    type: String,
    required: true,
  }, 
  otp: { type: String, required: false },
  isVerified: { type: Boolean, default: false }, 
  
}  , 
{ timestamps: true });

// Export the User model
module.exports = mongoose.model("User", SignUpSchema);
