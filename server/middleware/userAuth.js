import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.user = { _id: tokenDecode.id };
            next();
        } else {
            return res.status(401).json({ message: 'User not authenticated. Login Again.' });
        }

    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

export default userAuth;
