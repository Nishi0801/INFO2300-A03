import admin from '../config/firebase.js';
import { getUserByFirebaseUID } from '../models/userModel.js';

/**
 * Middleware to protect routes and extract user info
 */
export const protect = async (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        const decodedToken = await admin.auth().verifyIdToken(token);
        req.firebaseUID = decodedToken.uid;
        
        // Fetch user details from DB
        const user = await getUserByFirebaseUID(decodedToken.uid);
        if (!user) return res.status(404).json({ message: 'User not found' });

        req.user = user; // Attach user details to request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error: error.message });
    }
};

export const decodeToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        const decodedToken = await admin.auth().verifyIdToken(token);
        req.firebaseUID = decodedToken.uid;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error: error.message });
    }
}
