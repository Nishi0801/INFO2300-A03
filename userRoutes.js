import express from 'express';
import { createUserController, getUserProfile, updateProfile, getUserByIdController } from '../controllers/userController.js';
import { protect, decodeToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create a new user
router.post('/', decodeToken, createUserController);

// Get current user profile
router.get('/profile', protect, getUserProfile);

// Update current user profile
router.put('/profile', protect, updateProfile);

// Get a specific user (Admin only)
router.get('/:userId', protect, getUserByIdController);

export default router;
