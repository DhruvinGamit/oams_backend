const User = require('../models/User');

const registerUser = async (req, res) => {
  const { email, password, fullName, address, contact } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({ email, password, fullName, address, contact });
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
    if (password !== existingUser.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', token: 'your-generated-token' });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Excluding password field
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

module.exports = { registerUser, loginUser, getAllUsers };
