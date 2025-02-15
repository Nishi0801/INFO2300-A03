import { createUser, getUserByFirebaseUID, getUserById, updateUserProfile } from '../models/userModel.js';
import { auth } from '../config/firebase.js';
/**
 * Create a new user
 */
export const createUserController = async (req, res) => {
    try {
        const { email, name, role } = req.body;
        if (!email || !name || !role) {
            return res.status(400).json({ message: 'Email, name, and role are required' });
        }

        // Ensure the role is valid
        const validRoles = ['farmer', 'agricultural_expert', 'consumer'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Extract Firebase UID from the authentication token
        const firebaseUID = req.firebaseUID;

        // Check if user already exists
        const existingUser = await getUserByFirebaseUID(firebaseUID);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = await createUser({ firebaseUID, email, name, role });
        await auth.setCustomUserClaims(firebaseUID, { role: newUser.role });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
};

/**
 * Get current user's profile
 */
export const getUserProfile = async (req, res) => {
    try {
        res.status(200).json(req.user); // User details are already in request (from middleware)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * Update current user's profile
 */
export const updateProfile = async (req, res) => {
    try {
        const { name, role } = req.body;
        if (!name || !role) {
            return res.status(400).json({ message: 'Name and role are required' });
        }

        const updatedUser = await updateUserProfile(req.firebaseUID, { name, role });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile', error: error.message });
    }
};

/**
 * Get a specific user (admin or with appropriate permission)
 */
export const getUserByIdController = async (req, res) => {
    try {
        const { userId } = req.params;

        // Ensure only admins can access other user data
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied' });
        }

        const user = await getUserById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};
