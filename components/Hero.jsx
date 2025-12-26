import Link from 'next/link';
import React from 'react';

export default function Hero() {
  return (
    <section 
      className="relative min-h-[calc(100vh-80px)] flex items-center justify-center font-sans 
                 bg-[url('/hero.jpg')] bg-cover bg-center 
                 mt-[80px]" // This pushes the content down below the fixed Navbar
    >
      {/* Improved Overlay: 
          Using -z-0 or removing -z-10 ensures it stays behind text 
          but stays above the background image 
      */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10 text-center text-white px-4 py-8 max-w-4xl mx-auto bg-gray-900/60 backdrop-blur-sm rounded-lg">
        <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
          Experience Clean and <br /> 
          <span className="text-[#d4af37]">Fresh Spaces</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-2xl mx-auto font-light">
          Welcome to Elite Home and Business Cleaning, your trusted partner in transforming your space into a clean, fresh, and healthy environment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/schedule" 
            className="bg-[#d4af37] hover:bg-[#b5952f] text-white px-8 py-4 rounded-sm font-bold tracking-wide transition shadow-lg text-center"
          >
            SCHEDULE CLEANING
          </Link>
          <button className="bg-white/10 backdrop-blur-md hover:bg-white hover:text-slate-900 border border-white text-white px-8 py-4 rounded-sm font-bold tracking-wide transition">
            VIEW SERVICES
          </button>
        </div>
      </div>
    </section>
  );
}