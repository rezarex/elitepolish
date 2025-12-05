'use client'

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// --- MOCK DATA (MUST MATCH data in BlogList.js for consistent linking) ---
const MOCK_POSTS = [
  {
    slug: "eco-friendly-clean-future",
    title: "The Eco-Friendly Future of Luxury Cleaning",
    date: "November 28, 2025",
    summary: "Discover how Elite Polish is embracing sustainable practices and non-toxic products without compromising on quality or shine.",
    image: "https://placehold.co/1200x600/0f172a/d4af37?text=ECO+CLEAN",
    content: (
      <>
        <p className="mb-6">The conversation around sustainability is no longer optional—it's essential. At Elite Polish, we believe that true luxury extends beyond pristine surfaces; it includes the health of your home and the planet. This is why we've committed to a 100% non-toxic cleaning protocol.</p>
        <h3 className="font-serif text-3xl text-[#0f172a] mb-4 mt-8">Beyond Greenwashing: Our Commitment</h3>
        <p className="mb-6">We meticulously vet every product we use. Our solutions utilize plant-derived ingredients and advanced bio-based technology to break down grime and sanitize, without introducing harsh chemicals, VOCs, or irritating fragrances into your living space. This is luxury cleaning that cares.</p>
        <p className="mb-6 italic text-gray-600 border-l-4 border-[#d4af37] pl-4">"A clean home shouldn't come at the expense of your family's health or the environment. Our promise is a safer, yet supremely effective, clean."</p>
        <h3 className="font-serif text-3xl text-[#0f172a] mb-4 mt-8">The Future is Scent-Free and Sparkling</h3>
        <p className="mb-6">We are continually researching new advancements in green technology to keep our methods on the cutting edge, ensuring that Elite Polish remains a leader in both quality and environmental responsibility. We are proud to be pioneers in the high-end, eco-conscious cleaning space.</p>
      </>
    )
  },
  {
    slug: "winter-maintenance-guide",
    title: "Your Comprehensive Guide to Winter Home Maintenance",
    date: "December 5, 2025",
    summary: "Tips and tricks from our experts on maintaining pristine conditions during the harshest months of the year.",
    image: "https://placehold.co/1200x600/0f172a/d4af37?text=WINTER+TIPS",
    content: <p>Full detailed guide content for winter maintenance...</p>
  },
  {
    slug: "five-star-clean-standards",
    title: "What Does 'Five-Star Clean' Really Mean?",
    date: "October 1, 2025",
    summary: "A deep dive into the rigorous training and checklist our concierge team uses to deliver unmatched results.",
    image: "https://placehold.co/1200x600/0f172a/d4af37?text=STANDARDS",
    content: <p>Full content detailing the five-star cleaning standards and training process...</p>
  },
];
// --------------------------------------------------------------------------

export default function BlogPost({ slug }) {
  const post = MOCK_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="py-20 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif text-red-600 mb-4">Post Not Found</h1>
        <p className="text-gray-600">The article you are looking for does not exist or has been moved.</p>
        <Link href="/blog" className="mt-6 inline-flex items-center text-[#d4af37] hover:underline">
          <ArrowLeft size={20} className="mr-2"/> Back to Blog List
        </Link>
      </div>
    );
  }

  return (
    <article className="py-12 px-6 max-w-5xl mx-auto bg-white shadow-xl rounded-lg my-10">
      <div className="mb-8">
        <Link href="/blog" className="inline-flex items-center text-gray-500 hover:text-[#d4af37] transition">
          <ArrowLeft size={16} className="mr-2"/> Back to Blog List
        </Link>
      </div>

      <header className="text-center mb-10">
        <h1 className="font-serif text-4xl md:text-5xl text-[#0f172a] mb-3 leading-tight">{post.title}</h1>
        <p className="text-lg text-gray-500">Published on {post.date}</p>
      </header>
      
      <figure className="mb-10 rounded-lg overflow-hidden shadow-lg">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-auto max-h-96 object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1200x600/0f172a/d4af37?text=Elite Polish+Article"; }}
        />
      </figure>

      <div className="prose lg:prose-lg mx-auto text-gray-800 font-sans">
        {post.content}
      </div>

    </article>
  );
}