import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';


export const registerUser = async (req, res) => {
  const { userId, name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ email }, { userId }] });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this Email or ID' });
    }

    const user = await User.create({
      userId,
      name,
      email,
      password, 
      role,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};