import React from 'react';
import { Link } from 'react-router-dom';

const GuideCard = ({ guide }) => {
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border border-secondary/50">
            <Link to={`/guide/${guide.id}`} className='h-full'>
            <div className="card-body flex flex-col">
                <h2 className="card-title text-xl font-bold text-secondary">{guide.title}</h2>
                <div
                    className="mt-2 text-sm flex-1"
                    dangerouslySetInnerHTML={{ __html: guide.content }}
                />
            </div>
            </Link>
        </div>
    );
};

export default GuideCard;