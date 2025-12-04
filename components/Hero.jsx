import Link from 'next/link';
import React from 'react';

export default function Hero() {
  return (
  <section 
    className="relative h-[85vh] flex items-center justify-center font-sans 
               bg-[url('/hero.jpg')] bg-cover bg-center"
  >
    {/* Dark Overlay for Text Readability */}
    <div className="absolute inset-0 bg-black/60 -z-10" />

    <div className="relative text-center text-white px-4 py-4 max-w-4xl mx-auto bg-gray-800 opacity-75">
      <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
        Experience Clean and Fresh Spaces 
        {/* <span className="text-[#d4af37] italic">Art Form</span>. */}
      </h1>
      <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-2xl mx-auto font-light">
        Welcome to Elite Home and Business Cleaning, your trusted partner in transforming your space into a clean, fresh, and healthy environment for you, your family, or your employees.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">

        <Link href="/schedule" passHref className="bg-[#d4af37] hover:bg-[#b5952f] text-white px-8 py-4 rounded-sm font-bold tracking-wide transition shadow-lg">

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
