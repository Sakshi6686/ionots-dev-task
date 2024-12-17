const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');   
const router = express.Router();

 
router.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword,skills } = req.body;
        console.log("hi_signup");
        
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  console.log("hi_signup2");
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
 
  console.log("hi_signup3");
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  
  console.log("hi_signup4");
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
     
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      skills,
    });

     
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', success:true, user: { name, email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

 
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
 


  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

   
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
 
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.status(200).json({
    message: 'Login successful',
    token,
    user: { name: user.name, email: user.email },
  });
});

module.exports = router;
