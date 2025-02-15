import axiosInstance from '../utils/axiosConfig.js';
import { deleteUser } from 'firebase/auth';

/**
 * createBackendUser:
 * - Takes an idToken (Firebase ID token) and user details
 * - POST /api/users to create user record in the backend
 * - If it fails, the newly created Firebase user is deleted (rollback)
 */
export const createBackendUser = async (idToken, userData, firebaseUser) => {
    try {
        const res = await axiosInstance.post(
            '/api/users',
            userData,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        // If backend fails, delete the firebase user to roll back
        if (firebaseUser) {
            await deleteUser(firebaseUser);
        }
        throw error;
    }
};
