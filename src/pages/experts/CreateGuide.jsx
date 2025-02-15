import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axiosInstance from '../../utils/axiosConfig';
import { FaBook, FaSave } from 'react-icons/fa';

export default function CreateGuide() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/api/guides', { title, content });
            navigate('/expert-panel');
        } catch (error) {
            console.error('Failed to create guide', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            {/* Hero Section */}
            <div className="hero bg-base-200 rounded-lg p-6 mb-6 shadow-md">
                <div className="hero-content flex-col lg:flex-row">
                    <FaBook className="text-6xl text-primary" />
                    <div className="lg:ml-6">
                        <h1 className="text-4xl font-bold">Create New Guide</h1>
                        <p className="py-2 text-base-content/70">
                            Share your expertise and help farmers grow better crops.
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
                            <FaSave /> Save Guide
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
