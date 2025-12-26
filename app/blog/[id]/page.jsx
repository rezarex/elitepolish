'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { API_BASE_URL } from '@/config/config';
import Navbar from '@/components/Navbar';

export default function SingleBlogPost() {
  const params = useParams(); // params.id will match the folder name [id]
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Updated to match your route: /api/posts/{id}
        const response = await fetch(`${API_BASE_URL}/posts/${params.id}`);
        
        if (!response.ok) throw new Error('Post not found');
        
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchPost();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <article className="max-w-4xl mx-auto py-20 px-6">
      <Navbar/>
      <header className="mt-[80px] mb-10 text-center">
        <h1 className="text-5xl font-serif mb-4">{post.title}</h1>
        <p className="text-gray-500">By {post.author} • {new Date(post.createdAt).toLocaleDateString()}</p>
      </header>
      
      <img src={post.image} alt={post.title} className="w-full h-[400px] object-cover rounded-xl mb-10" />
      
      {/* Body Content */}
      <div 
        className="prose prose-gold max-w-none text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.body }} 
      />
    </article>
  );
}