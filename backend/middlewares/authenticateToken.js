const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the token is provided
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
   
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

     
    req.user = { id: decodedToken.userId };

    
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(403).json({ message: 'Token verification failed' });
  }
};

module.exports = authenticateToken;
