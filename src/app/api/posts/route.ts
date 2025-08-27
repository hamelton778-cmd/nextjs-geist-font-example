import { NextResponse } from 'next/server';

interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
}

let posts: Post[] = []; // In-memory storage for blog posts

export async function GET() {
    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    const { title, content } = await request.json();
    
    if (!title || !content) {
        return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
    }

    const newPost = { id: posts.length + 1, title, content, createdAt: new Date() };
    posts.push(newPost);
    
    return NextResponse.json(newPost, { status: 201 });
}
