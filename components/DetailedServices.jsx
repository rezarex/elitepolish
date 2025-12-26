'use client'
import React from 'react';
import Link from 'next/link';
// Added Briefcase icon here
import { Sparkles, Home, Diamond, Clock, Heart, Sun, MessageSquare, Briefcase } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

// Mock data for service details (Updated to user's requested services)
const detailedServices = [
  {
    icon: Home,
    title: "Residential Cleaning",
    desc: "Our signature luxury housekeeping for private homes. Includes deep cleaning of kitchens, bathrooms, and living areas.",
    duration: "1 hr 30 min",
    image: 'livingroom.png', // New image field
    key: "residence"
  },
  {
    icon: Briefcase,
    title: "Office Cleaning",
    desc: "Professional and discreet sanitation services for small to medium-sized corporate offices, optimized for after-hours scheduling.",
    duration: "1 hr",
    image: 'office.png', // New image field
    key: "office"
  },
  {
    icon: Sparkles,
    title: "Specialty Cleaning",
    desc: "Tailored services for major events: post-construction debris removal, pre-sale staging, and comprehensive move-in/move-out cleans.",
    duration: "45 min",
    image: 'specialty.png', // New image field
    key: "specialty"
  },
];

const featuresList = [
  { icon: Heart, text: 'Customized Clean Checklists' },
  { icon: Sun, text: 'Eco-Friendly, Non-Toxic Products' },
  { icon: Diamond, text: 'Trained & Vetted Concierge Teams' },
  { icon: Clock, text: 'Flexible Scheduling Options' },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] font-sans">
      <Navbar/>
      
      {/* Hero Section */}
      <section className="bg-[#0f172a] text-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase">Our Collections</span>
          <h1 className="font-serif text-5xl md:text-6xl mt-4 mb-6">A New Standard of Clean</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore our meticulously crafted service collections, each designed to deliver unmatched clarity and luxury to your home environment.
          </p>
          <Link href="/schedule" className="mt-8 inline-block bg-[#d4af37] text-[#0f172a] font-bold py-3 px-8 rounded-lg text-lg hover:bg-white transition duration-300 shadow-lg">
            Book Your Consultation
          </Link>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="font-serif text-4xl text-[#0f172a] text-center mb-12">Our Core Service Offerings</h2>
        
        <div className="space-y-12">
          {detailedServices.map((service) => (
            <div key={service.key} className="bg-white p-8 lg:p-10 shadow-xl rounded-lg grid md:grid-cols-3 gap-8 items-center border-l-4 border-[#0f172a] hover:shadow-2xl transition duration-300">
              
              {/* Column 1: Description */}
              <div>
                <service.icon size={48} className="text-[#d4af37] mb-4" />
                <h3 className="font-serif text-3xl text-[#0f172a] mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
              
              {/* Column 2: Image Placeholder (New block) */}
              <div className="h-full flex items-center justify-center py-4 md:py-0">
                  <img 
                    src={service.image} 
                    alt={`Illustration for ${service.title}`}
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x200/0f172a/d4af37?text=SERVICE+IMAGE"; }}
                  />
              </div>
              
              {/* Column 3: Duration and Get Quote Button (Combined) */}
              <div className="md:pt-0 border-t md:border-t-0 border-gray-100 md:pl-8 space-y-4">
                
                {/* Duration Block */}
                <div>
                  <div className="flex items-center text-[#d4af37] mb-2">
                    <Clock size={20} className="mr-2" />
                    <span className="font-bold text-sm uppercase tracking-wider">Estimated Duration</span>
                  </div>
                  <p className="text-xl font-semibold text-[#0f172a]">{service.duration}</p>
                </div>

                {/* Add the 'Get Quote' button here, below the duration */}
                <Link href="/schedule" className="inline-flex items-center bg-[#0f172a] text-white font-bold py-2 px-6 rounded-lg text-base hover:bg-[#d4af37] hover:text-[#0f172a] transition duration-300 shadow-lg">
                  <MessageSquare size={20} className="mr-2" />
                  Get Custom Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl text-[#0f172a] text-center mb-10">Why Elite Polish?</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {featuresList.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <feature.icon size={36} className="text-[#d4af37] mx-auto mb-4" />
                <p className="font-semibold text-lg text-[#0f172a]">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
          <Footer/>
    </main>
  );
}