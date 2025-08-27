import React from 'react';
import Link from 'next/link';

interface PostCardProps {
    id: number;
    title: string;
    excerpt: string;
    createdAt: Date;
}

const PostCard: React.FC<PostCardProps> = ({ id, title, excerpt, createdAt }) => {
    return (
        <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold">
                <Link href={`/blog/${id}`}>{title}</Link>
            </h2>
            <p className="text-gray-600">{excerpt}</p>
            <p className="text-sm text-gray-400">{new Date(createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default PostCard;
