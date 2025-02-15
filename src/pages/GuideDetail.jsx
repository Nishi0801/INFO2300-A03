import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';
import { FaArrowLeft, FaBook } from 'react-icons/fa';

export default function GuideDetail() {
    const { guideId } = useParams();
    const [guide, setGuide] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGuide() {
            try {
                const res = await axiosInstance.get(`/api/guides/${guideId}`);
                setGuide(res.data);
            } catch (error) {
                console.error('Error fetching guide:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchGuide();
    }, [guideId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!guide) {
        return (
            <div className="container mx-auto p-4">
                <div className="alert alert-error shadow-lg">
                    <div>
                        <span>Guide not found.</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            {/* Back Navigation */}
            <div className="mb-6">
                <Link to="/knowledge-hub" className="btn btn-ghost">
                    <FaArrowLeft className="mr-2" /> Back to Knowledge Hub
                </Link>
            </div>

            {/* Hero Section */}
            <div className="hero bg-base-200 rounded-lg shadow-md p-6 mb-6">
                <div className="hero-content flex-col lg:flex-row">
                    <FaBook className="text-6xl text-primary" />
                    <div className="lg:ml-6 text-center lg:text-left">
                        <h1 className="text-4xl font-bold">{guide.title}</h1>
                        {guide.subtitle && (
                            <p className="py-2 text-lg text-base-content/70">
                                {guide.subtitle}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Guide Content */}
            <div className="card bg-base-100 shadow-xl p-6">
                <div
                    className="prose lg:prose-xl max-w-full"
                    // Rendering HTML content; ensure this content is sanitized/trusted.
                    dangerouslySetInnerHTML={{ __html: guide.content }}
                />
            </div>
        </div>
    );
}
