import React, { useEffect, useState } from 'react';
import PostCard from '@/components/blog/PostCard';

interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
}

const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/posts');
                if (!response.ok) throw new Error('Failed to fetch posts');
                const data: Post[] = await response.json();
                setPosts(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            excerpt={post.content.substring(0, 100) + '...'}
                            createdAt={post.createdAt}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogPage;
