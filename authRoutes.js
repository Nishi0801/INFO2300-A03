import express from 'express';
import admin from '../config/firebase.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { token } = req.body;
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        res.status(200).json({ message: "Authenticated", user: decodedToken });
    } catch (error) {
        res.status(401).json({ message: "Invalid Token", error });
    }
});

export default router;
