'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { API_BASE_URL } from '@/config/config';

const BLOG_API = `${API_BASE_URL}/posts`; 

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch(BLOG_API);
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37] mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading Elite Polish Journal...</p>
      </section>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }
  
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto font-sans">
      <div className="text-center mb-16">
        <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase">Insights & Tips</span>
        <h2 className="font-serif text-4xl md:text-5xl text-[#0f172a] mt-3">Elite Polish Journal</h2>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          Thought leadership, maintenance guides, and behind-the-scenes looks at luxury home care.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <article 
            key={post._id} // Changed from post.slug to post._id for better stability
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition duration-300"
          >
            <Link href={`/blog/${post._id}`} className="block">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-48 object-cover" 
                onError={(e) => { 
                    e.currentTarget.onerror = null; 
                    e.currentTarget.src = "https://placehold.co/600x400/0f172a/d4af37?text=Elite Polish"; 
                }}
              />
            </Link>
            <div className="p-6 flex flex-col flex-grow">
              {/* Changed post.date to new Date(post.createdAt).toLocaleDateString() */}
              <p className="text-sm text-gray-500 mb-2">
                {new Date(post.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
              </p>
              <h3 className="font-serif text-2xl text-[#0f172a] mb-3 leading-snug">
                <Link href={`/blog/${post._id}`} className="hover:text-[#d4af37] transition">
                  {post.title}
                </Link>
              </h3>
              {/* Changed post.summary to post.desc */}
              <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                {post.desc}
              </p>
              <Link href={`/blog/${post._id}`} className="text-[#d4af37] font-semibold hover:text-[#0f172a] transition self-start">
                Read Article &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}