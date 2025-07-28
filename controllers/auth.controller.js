// controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Audit = require('../models/audit.model');
const { generateToken } = require('../utills/jwt');
const { isValidEmail } = require('../utills/validator');


exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Basic validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields (name, email, password, role) are required' });
    }

    // Email format validation
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    if (role) {
      if (!['Admin', 'Auditor', 'Employee'].includes(role)) {
        return res.status(400).json({ message: 'Select a valid role from Admin, Auditor or Employee' })
      }
    }
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role
    });

    // Log audit
    await Audit.create({
      action: 'New User Added',
      performedBy: user.id,
      details: `New User added "${name}" in role --> ${role}`
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Email format validation
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken({ id: user._id, role: user.role });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
