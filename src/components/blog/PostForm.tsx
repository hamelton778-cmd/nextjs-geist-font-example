import React, { useState } from 'react';

const PostForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!title || !content) {
            setError('Title and content are required.');
            return;
        }

        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });

        if (response.ok) {
            // Reset form on success
            setTitle('');
            setContent('');
        } else {
            const data = await response.json();
            setError(data.error || 'An error occurred while creating the post.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6">
            <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
                <label className="block mb-2" htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border rounded-lg p-2 w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="content">Content</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border rounded-lg p-2 w-full"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded-lg p-2">Submit</button>
        </form>
    );
};

export default PostForm;
