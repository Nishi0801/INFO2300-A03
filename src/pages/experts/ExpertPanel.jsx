import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import { FaBook, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import useAuthUser from '../../hooks/useAuthUser';

export default function ExpertPanel() {
    const [guides, setGuides] = useState([]);
    const { user, loading } = useAuthUser();

    useEffect(() => {
        async function fetchGuides() {
            // Wait until user is available. If not, do nothing.
            if (!user) return;

            try {
                const res = await axiosInstance.get(`/api/guides/user/${user.uid}`);
                setGuides(Array.isArray(res.data) ? res.data : []);
            } catch (error) {
                console.error('Error fetching guides', error);
            }
        }

        // Only fetch guides when not loading and a user is present.
        if (!loading && user) {
            fetchGuides();
        }
    }, [user, loading]);

    const handleDelete = async (guideId) => {
        const confirmed = window.confirm('Are you sure you want to delete this guide?');
        if (!confirmed) return;
        try {
            await axiosInstance.delete(`/api/guides/${guideId}`);
            setGuides(guides.filter((guide) => guide.id !== guideId));
        } catch (error) {
            console.error('Failed to delete guide:', error);
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );

    return (
        <div className="container mx-auto p-4">
            {/* Hero Section */}
            <div className="hero bg-base-200 rounded-lg p-6 mb-6 shadow-md">
                <div className="hero-content flex-col lg:flex-row">
                    <FaBook className="text-6xl text-primary" />
                    <div className="lg:ml-6">
                        <h1 className="text-4xl font-bold">Expert Panel</h1>
                        <p className="py-2 text-base-content/70">
                            Manage and curate your guides to share your expertise with the farming community.
                        </p>
                    </div>
                </div>
            </div>

            {/* Header and Create Button */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h2 className="text-2xl font-bold mb-2 md:mb-0">My Posted Guides</h2>
                <Link to="/create-guide" className="btn btn-primary flex items-center gap-2">
                    <FaPlus /> Create New Guide
                </Link>
            </div>

            {/* Guides Listing */}
            {guides.length === 0 ? (
                <div className="alert alert-info shadow-lg">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 20h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
                        </svg>
                        <span>You haven't posted any guides yet.</span>
                    </div>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {guides.map((guide) => (
                        <div key={guide.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border border-secondary/50">
                            <div className="card-body flex flex-col">
                                <h2 className="card-title text-xl font-bold text-secondary">{guide.title}</h2>
                                <div
                                    className="mt-2 text-sm flex-1"
                                    dangerouslySetInnerHTML={{ __html: guide.content }}
                                />
                                <div className="card-actions justify-end mt-4">
                                    <Link
                                        to={`/update-guide/${guide.id}`}
                                        className="btn btn-outline btn-sm flex items-center gap-1"
                                    >
                                        <FaEdit /> Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(guide.id)}
                                        className="btn btn-error btn-sm flex items-center gap-1"
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}