import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosConfig';
import GuideCard from '../components/GuideCard';

export default function KnowledgeHub() {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGuides() {
            try {
                const res = await axiosInstance.get('/api/guides');
                setGuides(Array.isArray(res.data) ? res.data : []);
            } catch (error) {
                console.error('Error fetching guides', error);
            } finally {
                setLoading(false);
            }
        }
        fetchGuides();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-2">Knowledge Hub</h1>
            <p className="py-2 text-base-content/70 mb-4">
                Explore all guides shared by the community.
            </p>
            {guides.length === 0 ? (
                <div className="alert alert-info bg-info/10 text-info shadow-lg">
                    <div>
                        <span>No guides available at the moment.</span>
                    </div>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {guides.map((guide) => (
                        <GuideCard key={guide.id} guide={guide} />
                    ))}
                </div>
            )}
        </div>
    );
}