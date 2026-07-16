import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  // User ID එක පාවිච්චි කරලා දින 30කින් expire වෙන Token එකක් හදනවා
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default generateToken;