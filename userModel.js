import { pool } from '../config/db.js';

/**
 * Create a new user
 */
export const createUser = async ({ firebaseUID, email, name, role }) => {
    const result = await pool.query(
        `INSERT INTO users (firebase_uid, email, name, role)
     VALUES ($1, $2, $3, $4) RETURNING *`,
        [firebaseUID, email, name, role]
    );
    return result.rows[0];
};

/**
 * Fetch user profile by Firebase UID
 */
export const getUserByFirebaseUID = async (firebaseUID) => {
    const result = await pool.query('SELECT * FROM users WHERE firebase_uid = $1', [firebaseUID]);
    return result.rows[0];
};

/**
 * Fetch user by ID (admin or authorized)
 */
export const getUserById = async (userId) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    return result.rows[0];
};

/**
 * Update user profile by Firebase UID
 */
export const updateUserProfile = async (firebaseUID, { name, role }) => {
    const result = await pool.query(
        `UPDATE users 
     SET name = $1, role = $2, updated_at = NOW() 
     WHERE firebase_uid = $3 
     RETURNING *`,
        [name, role, firebaseUID]
    );
    return result.rows[0];
};
