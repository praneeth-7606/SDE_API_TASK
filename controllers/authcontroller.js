import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/usermodel.js';
import dotenv from 'dotenv';

dotenv.config();


export const registeruser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

  
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginuser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });


    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid email or password' });


    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful',user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
