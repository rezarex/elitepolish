'use client';
import React from 'react';
import Link from 'next/link';
import { Home, Briefcase, Wrench, Clock, MessageSquare, ChevronRight, Heart, Sun, Diamond } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const detailedServices = [
  {
    icon: Home,
    title: "House Cleaning",
    desc: "Comprehensive care for your sanctuary. From recurring maintenance and deep cleans to specialized move-in/out transitions and 5-star Airbnb turnovers.",
    duration: "Flexible",
    image: '/house-clean.png', 
    link: "/services/house-cleaning",
  },
  {
    icon: Briefcase,
    title: "Office Cleaning",
    desc: "Clinical-grade sanitation for medical suites and professional corporate offices. We also provide heavy-duty post-construction debris removal.",
    duration: "Per Contract",
    image: '/office-clean.png', 
    link: "/services/office-cleaning",
  },
  {
    icon: Wrench,
    title: "Specialty & Handywork",
    desc: "Expert property maintenance including high-pressure washing, gutter and roof care, and professional handyman repairs for home and office.",
    duration: "Project Based",
    image: '/specialty-clean.png', 
    link: "/services/specialty",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] font-sans">
      <Navbar/>
      
      {/* Hero Section */}
      <section className="bg-[#0f172a] text-white py-32 text-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase">Our Collections</span>
          <h1 className="font-serif text-5xl md:text-6xl mt-4 mb-6 italic">A New Standard of Property Care</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            From meticulous interior housekeeping to professional office sanitation and expert handyman repairs.
          </p>
        </div>
      </section>

      {/* Grid Services Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {detailedServices.map((service, index) => (
            <div key={index} className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/0f172a/d4af37?text=${service.title.replace(' ', '+')}`; }}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md text-[#d4af37]">
                  <service.icon size={24} />
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-serif text-2xl text-[#0f172a] mb-4">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                  {service.desc}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                   <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Availability</span>
                      <span className="text-[#0f172a] font-bold">{service.duration}</span>
                   </div>
                   <Link href={service.link} className="bg-[#d4af37] text-white p-2 rounded-full hover:bg-[#0f172a] transition-colors">
                      <ChevronRight size={20} />
                   </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Centered CTA after Grid */}
        <div className="mt-16 text-center">
            <Link href="/contact" className="inline-flex items-center bg-[#0f172a] text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-[#d4af37] hover:text-[#0f172a] transition duration-300 shadow-xl">
              <MessageSquare size={20} className="mr-2" />
              Get a Customized Estimate
            </Link>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white py-16 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-around gap-8 text-center">
            <div className="flex flex-col items-center">
                <Heart size={32} className="text-[#d4af37] mb-2"/>
                <span className="text-xs font-bold uppercase tracking-widest">Custom Checklists</span>
            </div>
            <div className="flex flex-col items-center">
                <Sun size={32} className="text-[#d4af37] mb-2"/>
                <span className="text-xs font-bold uppercase tracking-widest">Eco-Friendly</span>
            </div>
            <div className="flex flex-col items-center">
                <Diamond size={32} className="text-[#d4af37] mb-2"/>
                <span className="text-xs font-bold uppercase tracking-widest">Vetted Teams</span>
            </div>
        </div>
      </section>

      <Footer/>
    </main>
  );
}