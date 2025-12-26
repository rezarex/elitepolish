import React from 'react';
import BlogList from '../../components/BlogList';
import Navbar from '@/components/Navbar';

export default function Blog() {
  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <Navbar/>
      <BlogList />
    </main>
  );
}