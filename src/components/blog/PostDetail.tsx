import React from 'react';

interface PostDetailProps {
    title: string;
    content: string;
    createdAt: Date;
}

const PostDetail: React.FC<PostDetailProps> = ({ title, content, createdAt }) => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-sm text-gray-400">{new Date(createdAt).toLocaleDateString()}</p>
            <div className="mt-4">
                <p>{content}</p>
            </div>
        </div>
    );
};

export default PostDetail;
