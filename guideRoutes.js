import express from 'express';
import {
    listGuides,
    getGuide,
    getGuidesByUser,
    createNewGuide,
    updateExistingGuide,
    removeGuide,
} from '../controllers/guideController.js';

// If you have an auth middleware, import it
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 1. List all guides
router.get('/', listGuides);

// 2. Get a specific guide
router.get('/:guideId', getGuide);

// 3. Create a guide (restricted - must be logged in, also must be 'admin' or 'agricultural_expert')
router.post('/', protect, createNewGuide);

// 4. Update a guide
router.put('/:guideId', protect, updateExistingGuide);

// 5. Delete a guide
router.delete('/:guideId', protect, removeGuide);

// 6. Get guides by user ID
router.get('/user/:userId', getGuidesByUser);

export default router;
