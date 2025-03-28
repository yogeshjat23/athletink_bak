
const express = require('express') ;
const User = require('../models/SignUp');
const router  = express.Router() ;
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'yogeshjat23nith@gmail.com', 
    pass: 'tvnb lvtv qdiz trbg',   
  },
});

  

const OTP_EXPIRATION_MINUTES = 10; 

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (!existingUser.isVerified) {
        const timeDifference = (Date.now() - existingUser.createdAt) / (1000 * 60); 
        if (timeDifference > OTP_EXPIRATION_MINUTES) {
          await User.findOneAndDelete({ email });
        } else {
          return res.status(400).json({ message: 'Email already exists. Please verify your OTP.' });
        }
      } else {
        return res.status(400).json({ message: 'Email already exists.' });
      }
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const newUser = new User({ email, password, otp, isVerified: false, createdAt: new Date() });
    await newUser.save();

    const mailOptions = {
      from: 'yogeshjat23nith@gmail.com',
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Signup successful. Please verify your email using the code sent to you.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try signing up again.', error: error.message });
  }
});









{/*   

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser ) {
      return res.status(400).json({ message: 'Email already exists' });
    }


    const otp = crypto.randomInt(100000, 999999).toString();


    const newUser = new User({ email, password, otp, isVerified: false });
    await newUser.save();
       

    const mailOptions = {
      from: 'yogeshjat23nith@gmail.com',
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${otp}`,
    }; 
    

    await transporter.sendMail(mailOptions); 
    


    res.status(201).json({ message: 'Signup successful. Please verify your email using the code sent to you.' });
  } catch (error) {
    await User.findOneAndDelete({ email });
    res.status(500).json({ message: 'Server error', error: error.message });
    
  }
}); 
  
*/}
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

   
    user.isVerified = true;
    user.otp = null;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) { 
    await User.findOneAndDelete({ email });
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;



