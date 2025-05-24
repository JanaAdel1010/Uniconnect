const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization'); // Expected format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const actualToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
