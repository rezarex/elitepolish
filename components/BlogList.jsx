'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// --- MOCK DATA SOURCE (Will be replaced by API call) ---
const MOCK_POSTS = [
  {
    slug: "eco-friendly-clean-future",
    title: "The Eco-Friendly Future of Luxury Cleaning",
    date: "November 28, 2025",
    summary: "Discover how Elite Polish is embracing sustainable practices and non-toxic products without compromising on quality or shine.",
    image: "https://placehold.co/600x400/0f172a/d4af37?text=ECO+CLEAN",
  },
  {
    slug: "winter-maintenance-guide",
    title: "Your Comprehensive Guide to Winter Home Maintenance",
    date: "December 5, 2025",
    summary: "Tips and tricks from our experts on maintaining pristine conditions during the harshest months of the year.",
    image: "https://placehold.co/600x400/0f172a/d4af37?text=WINTER+TIPS",
  },
  {
    slug: "five-star-clean-standards",
    title: "What Does 'Five-Star Clean' Really Mean?",
    date: "October 1, 2025",
    summary: "A deep dive into the rigorous training and checklist our concierge team uses to deliver unmatched results.",
    image: "https://placehold.co/600x400/0f172a/d4af37?text=STANDARDS",
  },
];

// ------------------------------------

// Simulated asynchronous data fetching function (now local to the component structure)
async function fetchBlogPosts() {
  await new Promise(resolve => setTimeout(resolve, 50)); 
  return MOCK_POSTS;
}

// REMOVED 'async' keyword here to fix the error
export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Client-side fetch using useEffect
    const loadPosts = async () => {
      const fetchedPosts = await fetchBlogPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    };
    loadPosts();
  }, []);

  if (loading) {
    // Simple loading state while data is being fetched
    return (
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37] mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading Elite Polish Journal...</p>
      </section>
    );
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
            key={post.slug} 
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition duration-300"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-48 object-cover" 
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/0f172a/d4af37?text=Elite Polish"; }}
              />
            </Link>
            <div className="p-6 flex flex-col flex-grow">
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <h3 className="font-serif text-2xl text-[#0f172a] mb-3 leading-snug">
                <Link href={`/blog/${post.slug}`} className="hover:text-[#d4af37] transition">
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4 flex-grow">{post.summary}</p>
              <Link href={`/blog/${post.slug}`} className="text-[#d4af37] font-semibold hover:text-[#0f172a] transition self-start">
                Read Article &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}