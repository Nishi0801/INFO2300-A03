import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import useAuthUser from '../hooks/useAuthUser';

export default function NavBar() {
    const navigate = useNavigate();
    const { user, loading } = useAuthUser();

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/login');
    };

    // Helper function to extract initials from the display name.
    const getInitials = (name) => {
        if (!name) return 'U'; // Fallback initial (U for unknown).
        const words = name.split(' ');
        // Take the first character of up to two words.
        const initials = words.map((word) => word[0].toUpperCase()).slice(0, 2).join('');
        return initials;
    };

    // Render menu items based on the user's role.
    const renderMenuItems = () => {
        if (!user || !user.role) return null;

        switch (user.role) {
            case 'farmer':
                return (
                    <>
                        <li>
                            <Link to="/farm-management">Farm Management</Link>
                        </li>
                        <li>
                            <Link to="/my-crops">My Crops</Link>
                        </li>
                        <li>
                            <Link to="/marketplace">Marketplace</Link>
                        </li>
                        <li>
                            <Link to="/knowledge-hub">Knowledge Hub</Link>
                        </li>
                    </>
                );
            case 'agricultural_expert':
                return (
                    <>
                        <li>
                            <Link to="/expert-panel">Expert Panel</Link>
                        </li>
                        <li>
                            <Link to="/knowledge-hub">Knowledge Hub</Link>
                        </li>
                    </>
                );
            case 'consumer':
                return (
                    <>
                        <li>
                            <Link to="/marketplace">Marketplace</Link>
                        </li>
                        <li>
                            <Link to="/orders">Orders</Link>
                        </li>
                        <li>
                            <Link to="/knowledge-hub">Knowledge Hub</Link>
                        </li>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="navbar bg-base-200">
            {/* Mobile menu */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {renderMenuItems()}
                    </ul>
                </div>
                <Link to="/dashboard" className="btn btn-ghost normal-case text-xl">
                    AgroGuardian
                </Link>
            </div>

            {/* Center menu for desktop */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {renderMenuItems()}
                </ul>
            </div>

            {/* Account placeholder with logout */}
            <div className="navbar-end">
                {loading ? null : user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring-primary/20 ring-1 text-primary content-center bg-neutral-focus">
                                <span>{getInitials(user.displayName)}</span>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content rounded-box z-10 mt-3 w-52 p-2 shadow-lg bg-base-100">
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <Link to="/settings">Settings</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
}
