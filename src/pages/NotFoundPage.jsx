import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-base-200">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-primary">404</h1>
                <h2 className="mt-4 text-3xl">Oops! Page not found.</h2>
                <p className="mt-2 text-lg text-base-content opacity-70">
                    The page you are looking for might have been removed or is temporarily unavailable.
                </p>
                <Link to="/" className="btn btn-primary mt-6">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
