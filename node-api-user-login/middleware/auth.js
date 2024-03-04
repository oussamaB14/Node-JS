const jwt = require('jsonwebtoken'); // For JWT verification

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from authorization header

    // Check for token presence
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        // Verify the token using the SECRET_KEY
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Attach the decoded user ID to the request object for further use
        req.user = { userId: decoded.userId };

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = auth;
