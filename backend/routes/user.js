const express = require('express');
 
 
const mongoose = require('mongoose');
const User = require('../models/User');  
const router = express.Router();


const authenticateToken = require('../middlewares/authenticateToken'); 

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id, 'name email skills');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user,"user int user");
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/profile', authenticateToken, async (req, res) => {
    const { name, email, skills } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
       
      if (name) user.name = name;
    if (email) user.email = email;

        if (skills) user.skills = skills;
  
    
      await user.save();
  
      res.status(200).json({
        message: 'User profile updated successfully',
        user: {
          name: user.name,
          email: user.email,
          skills: user.skills,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update profile' });
    }
  });
  
   
module.exports = router; 