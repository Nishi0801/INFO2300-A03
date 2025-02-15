import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axiosInstance from '../../utils/axiosConfig';
import { FaBook, FaSave } from 'react-icons/fa';

export default function UpdateGuide() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGuide() {
            try {
                // Replace with your API endpoint to fetch a specific guide
                const res = await axiosInstance.get(`/api/guides/${id}`);
                const guide = res.data;
                setTitle(guide.title);
                setContent(guide.content);
            } catch (error) {
                console.error('Failed to fetch guide:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchGuide();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Replace with your API endpoint to update the guide
            await axiosInstance.put(`/api/guides/${id}`, { title, content });
            navigate('/expert-panel');
        } catch (error) {
            console.error('Failed to update guide', error);
            // Optionally handle error feedback to the user
        }
    };

    if (loading) return <p>Loading guide data...</p>;

    return (
        <div className="container mx-auto p-4">
            {/* Hero Section */}
            <div className="hero bg-base-200 rounded-lg p-6 mb-6 shadow-md">
                <div className="hero-content flex-col lg:flex-row">
                    <FaBook className="text-6xl text-primary" />
                    <div className="lg:ml-6">
                        <h1 className="text-4xl font-bold">Update Guide</h1>
                        <p className="py-2 text-base-content/70">
                            Edit your expertise and help farmers grow better crops.
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Card */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Title</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full rounded-md mt-3"
                                placeholder="Enter guide title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Content</span>
                            </label>
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                placeholder="Enter guide content..."
                                className="rounded-md min-h-48 border border-zinc-50/20 mt-2"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full flex items-center justify-center gap-2"
                        >
                            <FaSave /> Update Guide
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}