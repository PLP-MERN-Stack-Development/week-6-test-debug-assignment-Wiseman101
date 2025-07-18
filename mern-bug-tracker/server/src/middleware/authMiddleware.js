// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');

// const protect = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader && authHeader.startsWith('Bearer')) {
//     try {
//       const token = authHeader.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

//       req.user = await User.findById(decoded.id).select('-password');
//       next();
//     } catch (err) {
//       return res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   } else {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };

// module.exports = protect;
// const express = require('express');
// const router = express.Router();
// const {
//   createBug,
//   getBugs,
//   updateBug,
//   deleteBug
// } = require('../controllers/bugController');

// const authMiddleware = require('../middleware/authMiddleware');

// // ✅ protect all routes
// router.use(authMiddleware);

// router.post('/', createBug);
// router.get('/', getBugs);
// router.put('/:id', updateBug);
// router.delete('/:id', deleteBug);

// module.exports = router;

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, 'your_jwt_secret');

      // Get user from token (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // continue
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No token, not authorized' });
  }
};

module.exports = { protect };

