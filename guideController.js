import {
    getAllGuides,
    getGuideById,
    getGuidesByUserId,
    createGuide,
    updateGuide,
    deleteGuide,
} from '../models/guideModel.js';

/**
 * GET /api/guides
 * List all guides/articles
 */
export const listGuides = async (req, res) => {
    try {
        const guides = await getAllGuides();
        res.status(200).json(guides);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching guides', error: error.message });
    }
};

/**
 * GET /api/guides/:guideId
 * Get specific guide content
 */
export const getGuide = async (req, res) => {
    try {
        const { guideId } = req.params;
        const guide = await getGuideById(guideId);

        if (!guide) {
            return res.status(404).json({ message: 'Guide not found' });
        }
        res.status(200).json(guide);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching guide', error: error.message });
    }
};

/**
 * GET /api/guides/user/:userId
 * Get guides by user ID
 */
export const getGuidesByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const guides = await getGuidesByUserId(userId);

        if (!guides) {
            return res.status(404).json({ message: 'Guides not found' });
        }
        res.status(200).json(guides);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching guides', error: error.message });
    }
};

/**
 * POST /api/guides
 * Create a guide (restricted)
 */
export const createNewGuide = async (req, res) => {
    try {
        // Only allow roles 'admin' or 'agricultural_expert' to create
        if (req.user.role !== 'admin' && req.user.role !== 'agricultural_expert') {
            return res.status(403).json({ message: 'Not authorized to create guides' });
        }

        const { title, content, category } = req.body;
        const authorId = req.user.id;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const newGuide = await createGuide({ authorId, title, content, category });
        res.status(201).json(newGuide);
    } catch (error) {
        res.status(500).json({ message: 'Error creating guide', error: error.message });
    }
};

/**
 * PUT /api/guides/:guideId
 * Update a guide (restricted)
 */
export const updateExistingGuide = async (req, res) => {
    try {
        // Only allow roles 'admin' or 'agricultural_expert'
        if (req.user.role !== 'admin' && req.user.role !== 'agricultural_expert') {
            return res.status(403).json({ message: 'Not authorized to update guides' });
        }

        const { guideId } = req.params;
        const { title, content, category } = req.body;

        const guide = await getGuideById(guideId);
        if (!guide) {
            return res.status(404).json({ message: 'Guide not found' });
        }

        const updatedGuide = await updateGuide(guideId, { title, content, category });
        res.status(200).json(updatedGuide);
    } catch (error) {
        res.status(500).json({ message: 'Error updating guide', error: error.message });
    }
};

/**
 * DELETE /api/guides/:guideId
 * Delete a guide (restricted)
 */
export const removeGuide = async (req, res) => {
    try {
        // Only 'admin' or 'agricultural_expert'
        if (req.user.role !== 'admin' && req.user.role !== 'agricultural_expert') {
            return res.status(403).json({ message: 'Not authorized to delete guides' });
        }

        const { guideId } = req.params;
        const guide = await getGuideById(guideId);
        if (!guide) {
            return res.status(404).json({ message: 'Guide not found' });
        }

        await deleteGuide(guideId);
        res.status(200).json({ message: 'Guide deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting guide', error: error.message });
    }
};
