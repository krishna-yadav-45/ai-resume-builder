const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log('Auth header:', req.headers.authorization);
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Token:', token);
  if (!token) return res.status(401).json({ message: 'No token, unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('JWT Error:', err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};