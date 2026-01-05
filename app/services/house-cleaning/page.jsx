'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, Sparkles, ShieldCheck, HeartHandshake, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
// Note: Adjust imports based on where your Navbar/Footer live in your actual project structure
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';

// Data for the 4 Sub-Service Cards
const subServices = [
  {
    title: "Recurring Maintenance",
    description: "The foundation of a pristine home. Our weekly or bi-weekly visits focus on high-traffic areas, kitchen sanitization, and bathroom detailing to keep your home effortlessly perpetually clean.",
    features: ["Kitchen & Bathroom sanitization", "Dusting all surfaces & fixtures", "Vacuuming with HEPA filtration", "Mopping all hard floors"],
    imagePlaceholder: "/hero.png",
    link: "/services/house-cleaning/standard-maintenance"
  },
  {
    title: "Deep Cleaning Specialists",
    description: "A comprehensive, top-to-bottom reset for your home. We tackle the neglected areas: behind appliances, inside ovens, baseboards, and interior windows to remove deep-set grime.",
    features: ["Inside oven & fridge", "Baseboards & door frames detailed", "Interior window & track cleaning", "Descaling showers & tubs"],
    imagePlaceholder: "/afterbath.png",
    link: "/services/house-cleaning/deep-cleaning"
  },
  {
    title: "Move-In / Move-Out",
    description: "Ensure a seamless transition. Whether preparing for new owners or securing your deposit, we provide a 'total-void' clean that leaves the property completely spotless.",
    features: ["Inside all cabinets & drawers", "Spot-cleaning walls", "Light fixtures & ceiling fans", "Garage sweeping"],
    imagePlaceholder: "/livingroom.png",
    link: "/services/house-cleaning/move-in-move-out"
  },
  {
    title: "Airbnb & Rental Turnovers",
    description: "Hotel-standard preparation for hosts. We manage the entire turnover process, including laundry, restocking essentials, and photo-verified staging for 5-star reviews.",
    features: ["Hotel-style bed making", "Towel folding & staging", "Restocking consumables (soap/coffee)", "Damage inspection reporting"],
    imagePlaceholder: "/afterbath.png",
    link: "/services/house-cleaning/airbnb-turnover"
  },
];

export default function HouseCleaningPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] font-sans">
      <Navbar/>
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0f172a] text-white py-32 lg:py-40 overflow-hidden">
        {/* Background Subtle Image Overlay */}
        <div className="absolute inset-0 opacity-20">
            <Image 
                src="/afterfloor.png"
                alt="Background"
                fill
                className="object-cover"
            />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
                <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase block mb-4">Residential Services</span>
                <h1 className="font-serif text-5xl md:text-6xl mb-6 leading-tight">
                    Rediscover the Luxury of a <span className="italic text-[#d4af37]">Pristine Home</span>.
                </h1>
                <p className="text-lg text-gray-300 max-w-xl mb-8">
                    Your home is your sanctuary. We provide meticulous, reliable housekeeping services designed to give you back your time and peace of mind.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link href="#services-grid" className="bg-[#d4af37] text-[#0f172a] font-bold py-4 px-8 rounded-full text-lg hover:bg-white transition duration-300 text-center">
                        View Our Services
                    </Link>
                    <Link href="/contact" className="border-2 border-white text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white/10 transition duration-300 flex items-center justify-center gap-2">
                        <MessageSquare size={20}/> Get an Estimate
                    </Link>
                </div>
            </div>
             {/* Hero Image Placeholder - showing a person working nicely */}
            <div className="flex-1 relative h-[500px] w-full hidden md:block rounded-2xl overflow-hidden shadow-2xl border-4 border-[#d4af37]/30">
                <Image 
                    src="/afterkitchen.png"
                    alt="Professional Cleaner working"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
      </section>


      {/* --- SUB-SERVICES GRID --- */}
      <section id="services-grid" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-[#0f172a] mb-4">Tailored Solutions for Every Home</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose the level of care that fits your lifestyle. Select a service below to learn more about our specific checklists and pricing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {subServices.map((service, index) => (
                <div key={index} className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
                    {/* Image Header */}
                    <div className="relative h-64 overflow-hidden">
                        <Image 
                            src={service.imagePlaceholder}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 to-transparent"></div>
                        <h3 className="absolute bottom-6 left-6 font-serif text-3xl text-white">{service.title}</h3>
                    </div>

                    {/* Content Body */}
                    <div className="p-8 flex flex-col flex-grow">
                        <p className="text-gray-600 leading-relaxed mb-8 flex-grow">{service.description}</p>
                        
                        {/* Key Features List */}
                        <div className="bg-[#faf9f6] p-6 rounded-xl mb-8">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] mb-4">Key Inclusions:</h4>
                            <ul className="space-y-3">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center text-gray-700">
                                        <CheckCircle2 size={18} className="text-[#d4af37] mr-3 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link href={service.link} className="inline-flex items-center justify-center w-full bg-[#0f172a] text-white font-bold py-4 rounded-lg hover:bg-[#d4af37] hover:text-[#0f172a] transition duration-300">
                            Explore {service.title} <ArrowRight size={20} className="ml-2"/>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
      </section>


      {/* --- THE ELITE PROCESS (Trust Section) --- */}
      <section className="bg-white py-24 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase">Our Methodology</span>
                <h2 className="font-serif text-4xl text-[#0f172a] mt-4">The Elite Standard of Care</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12 text-center px-4">
                {/* Step 1 */}
                <div className="relative p-8 bg-[#faf9f6] rounded-2xl">
                    <div className="w-20 h-20 bg-[#0f172a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg absolute -top-10 left-1/2 transform -translate-x-1/2">
                        <ShieldCheck size={36} className="text-[#d4af37]" />
                    </div>
                    <h3 className="font-serif text-2xl text-[#0f172a] mb-4 mt-8">1. Vetted Professionals</h3>
                    <p className="text-gray-600">Your safety is paramount. Every team member undergoes rigorous background checks, in-person interviews, and extensive hands-on training before entering your home.</p>
                </div>
                 {/* Step 2 */}
                <div className="relative p-8 bg-[#faf9f6] rounded-2xl mt-12 md:mt-0">
                    <div className="w-20 h-20 bg-[#0f172a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg absolute -top-10 left-1/2 transform -translate-x-1/2">
                        <Sparkles size={36} className="text-[#d4af37]" />
                    </div>
                    <h3 className="font-serif text-2xl text-[#0f172a] mb-4 mt-8">2. Health-First Cleaning</h3>
                    <p className="text-gray-600">We use HEPA-filter vacuums to improve indoor air quality and color-coded microfiber cloths to prevent cross-contamination between bathrooms and kitchens.</p>
                </div>
                 {/* Step 3 */}
                <div className="relative p-8 bg-[#faf9f6] rounded-2xl mt-12 md:mt-0">
                    <div className="w-20 h-20 bg-[#0f172a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg absolute -top-10 left-1/2 transform -translate-x-1/2">
                        <HeartHandshake size={36} className="text-[#d4af37]" />
                    </div>
                    <h3 className="font-serif text-2xl text-[#0f172a] mb-4 mt-8">3. The "White Glove" Finish</h3>
                    <p className="text-gray-600">We don't just clean; we curate. From arranging throw blankets to neatly folding towels, we leave your home feeling welcomed and professionally staged.</p>
                </div>
            </div>
        </div>
      </section>

      {/* <Footer/> */}
    </main>
  );
}