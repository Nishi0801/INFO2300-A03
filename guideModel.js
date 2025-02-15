import { pool } from '../config/db.js';

/**
 * Get all guides
 */
export const getAllGuides = async () => {
    const result = await pool.query(`
        SELECT id, author_id, title,
                     substring(regexp_replace(content, '\n+', ' ', 'g'), 1, 150) AS content,
                     category, created_at, updated_at
        FROM guides
        ORDER BY created_at DESC
    `);
    return result.rows;
};

/**
 * Get a guide by ID
 */
export const getGuideById = async (guideId) => {
    const result = await pool.query(
        `SELECT * FROM guides WHERE id = $1`,
        [guideId]
    );
    return result.rows[0];
};

/**
 * Get guides by user ID
 */
export const getGuidesByUserId = async (authorId) => {
    const result = await pool.query(
        `
        SELECT 
            g.id, g.author_id, g.title, 
            substring(regexp_replace(g.content, '\n+', ' ', 'g'), 1, 150) AS content,
            g.category, g.created_at, g.updated_at
        FROM guides g 
            JOIN users u ON g.author_id = u.id 
        WHERE u.firebase_uid = $1`,
        [authorId]
    );
    return result.rows;
};

/**
 * Create a new guide
 */
export const createGuide = async ({ authorId, title, content, category }) => {
    const result = await pool.query(
        `INSERT INTO guides (author_id, title, content, category, created_at, updated_at)
     VALUES ($1, $2, $3, $4, NOW(), NOW())
     RETURNING *`,
        [authorId, title, content, category]
    );
    return result.rows[0];
};

/**
 * Update a guide
 */
export const updateGuide = async (guideId, { title, content, category }) => {
    const result = await pool.query(
        `UPDATE guides
     SET title = $1, content = $2, category = $3, updated_at = NOW()
     WHERE id = $4
     RETURNING *`,
        [title, content, category, guideId]
    );
    return result.rows[0];
};

/**
 * Delete a guide
 */
export const deleteGuide = async (guideId) => {
    await pool.query(
        `DELETE FROM guides WHERE id = $1`,
        [guideId]
    );
    return true;
};
