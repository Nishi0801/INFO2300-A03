import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthUser from '../hooks/useAuthUser';

export default function Dashboard() {
    const navigate = useNavigate();
    const { user, loading } = useAuthUser();

    useEffect(() => {
        if (!loading) {
            if (user && user.role) {
                switch (user.role) {
                    case 'farmer':
                        navigate('/farm-management');
                        break;
                    case 'agricultural_expert':
                        navigate('/expert-panel');
                        break;
                    case 'consumer':
                        navigate('/marketplace');
                        break;
                    default:
                        navigate('/login');
                        break;
                }
            } else {
                navigate('/login');
            }
        }
    }, [user, loading, navigate]);

    return (
        <div className="p-4">
            <p className="mt-2 text-center">
                We are redirecting you to the appropriate dashboard...
            </p>
        </div>
    );
}
