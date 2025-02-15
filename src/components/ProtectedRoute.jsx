import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../services/firebase';

const ProtectedRoute = ({ allowedRoles, children }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUserData(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <span className='text-center'>Loading...</span>;
    }

    // If not authenticated, redirect to login.
    if (!userData) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If allowedRoles is provided, ensure the user's role is allowed.
    if (allowedRoles && !allowedRoles.includes(userData.role)) {
        // You can redirect to a dedicated "unauthorized" page or the dashboard.
        return <Navigate to="/unauthorized" replace />;
    }

    // Optionally: if a logged-in user tries to visit login or register, redirect them.
    if (userData && (location.pathname === '/login' || location.pathname === '/register')) {
        if (!user || !user.role) return null;
        switch (user.role) {
            case 'farmer':
                return <Navigate to="/farm-management" replace />;
            case 'agricultural_expert':
                return <Navigate to="/expert-panel" replace />;
            default:
                return <Navigate to="/login" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
