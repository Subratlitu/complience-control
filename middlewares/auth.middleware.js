const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;
    let token = null;
    if (authHeader) {
        if (authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
        } else {
            token = authHeader;
        }
    }

    if (!token) return res.status(401).json({ message: 'Token missing' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, role }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
