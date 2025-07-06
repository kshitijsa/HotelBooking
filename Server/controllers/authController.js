import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      // _id: email, 
      username: name,
      email,
      password: hashed,
      image: '', 
      role: role || 'user',
      recentSearchedCities: [],
    });
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error('Signup error:', err); 
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
    console.log('Login route called with:', req.body); 
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log('User found:', user);
    if (!user) {
      console.log('Login failed: user not found for email', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    if (!isMatch) {
      console.log('Login failed: password mismatch for email', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        image: user.image,
        recentSearchedCities: user.recentSearchedCities,
      },
    });
  } catch (err) {
  // console.log(err.response);
  // setError(err.response?.data?.message || 'Login failed');
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed' });
}
};
