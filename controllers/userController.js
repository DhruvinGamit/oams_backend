const bcrypt = require('bcrypt');
const User = require('../models/User');
const Service = require('../models/Service');
const { checkPassword, newToken } = require('../utils'); 

const registerUser = async (req, res) => {
  const { email, password, fullName, address, contact } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, fullName, address, contact });
    await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = newToken(existingUser); // Generate JWT
    const userId = existingUser._id;
    res.status(200).json({ message: 'Login successful', token , userId  }); // Return JWT to the client
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); 
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

const addService = async (req, res) => {
  const { userId, title, description, charges, duration, image, address } = req.body;

  try {
    const newService = new Service({
      userId,
      title,
      description,
      charges,
      duration,
      image,
      address,
    });

    await newService.save();

    res.status(201).json({ message: 'Service added successfully' });
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ message: 'Failed to add service', error: error.message });
  }
};

module.exports = { registerUser, loginUser, getAllUsers, addService };
