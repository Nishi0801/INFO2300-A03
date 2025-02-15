import { useState, useEffect } from 'react';
import { auth } from '../services/firebase';

export default function useAuthUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Retrieve the token result which contains custom claims.
                    const tokenResult = await firebaseUser.getIdTokenResult();
                    // Attach the role from custom claims to the user object.
                    firebaseUser.role = tokenResult.claims.role || null;
                } catch (error) {
                    console.error('Error retrieving token claims:', error);
                    firebaseUser.role = null;
                }
                setUser(firebaseUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return { user, loading };
}
