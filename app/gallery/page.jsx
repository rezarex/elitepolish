import React from 'react';
import Gallery from '../../components/Gallery';
import Navbar from '@/components/Navbar';

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Navbar/>
      <Gallery />
    </main>
  );
}