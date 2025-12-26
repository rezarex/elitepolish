import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

export default function ContactUsPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-white p-6">
      <Navbar/>
      <div className="text-center max-w-lg p-10 bg-gray-50 rounded-xl shadow-lg">
        <h1 className="font-serif text-4xl text-[#0f172a] mb-4">Contact Elite Polish</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your interest. Please use the form below to reach our concierge team.
        </p>
        
        {/* Simple Contact Form Placeholder */}
        <form className="space-y-4 text-left">
          <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-md" required />
          <input type="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 rounded-md" required />
          <textarea placeholder="Your Message" rows="4" className="w-full p-3 border border-gray-300 rounded-md" required />
          <button 
            type="submit" 
            className="w-full bg-[#d4af37] hover:bg-[#b5952f] text-white px-8 py-3 rounded-md font-bold transition"
          >
            Send Message
          </button>
        </form>
      </div>
      {/* <Footer/> */}
    </main>
  );
}