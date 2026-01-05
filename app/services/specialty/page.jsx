'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Wrench, 
  Droplets, 
  ArrowRight, 
  Trash2, 
  Hammer, 
  ShieldCheck, 
  Wind,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const subServices = [
  {
    title: "Exterior Pressure Washing",
    description: "Restore your property's curb appeal. We use professional-grade pressure and soft-washing techniques to remove algae, moss, and grime from driveways, siding, and decks without damaging surfaces.",
    features: ["Concrete & Driveway restoration", "Soft-wash siding cleaning", "Deck & Patio revival", "Oil & Stain removal"],
    imagePlaceholder: "/placeholder.jpeg",
    link: "/services/specialty/pressure-washing"
  },
  {
    title: "Gutter & Roof Maintenance",
    description: "Protect your foundation from water damage. Our team provides safe, thorough gutter cleaning, downspout flushing, and roof debris removal to ensure your drainage system is winter-ready.",
    features: ["Full debris removal & disposal", "Downspout flow testing", "Minor gutter seal repairs", "Roof moss treatment"],
    imagePlaceholder: "/placeholder.jpeg",
    link: "/services/specialty/gutters"
  },
  {
    title: "Professional Handyman Services",
    description: "For the 'To-Do' list that never ends. From furniture assembly and mounting TVs to replacing light fixtures and minor drywall repairs, we handle the technical details of your home.",
    features: ["Furniture & Equipment assembly", "Art & TV mounting", "Light fixture & Bulb replacement", "Minor plumbing & electrical"],
    imagePlaceholder: "/placeholder.jpeg",
    link: "/services/specialty/handyman"
  },
  {
    title: "Seasonal Property Prep",
    description: "Prepare your home or rental for the changing seasons. Includes window screen swaps, outdoor furniture staging, and comprehensive exterior 'deep cleans' before the busy season.",
    features: ["Window screen installation", "Outdoor furniture cleaning", "Pool area tidying", "Garden bed debris clearing"],
    imagePlaceholder: "/placeholder.jpeg",
    link: "/services/specialty/seasonal"
  },
];

export default function SpecialtyServicesPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] font-sans">
        <Navbar/>
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0f172a] text-white py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <Image 
                src="/placeholder.jpeg"
                alt="Exterior Maintenance"
                fill
                className="object-cover"
            />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
                <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase block mb-4">Property Maintenance</span>
                <h1 className="font-serif text-5xl md:text-6xl mb-6 leading-tight">
                    Expert Care for Your <span className="italic text-[#d4af37]">Greatest Asset</span>.
                </h1>
                <p className="text-lg text-gray-300 max-w-xl mb-8">
                    Beyond the interior, your property requires technical care to maintain its value. We bring the tools, the ladders, and the expertise to handle the heavy lifting.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link href="#specialty-grid" className="bg-[#d4af37] text-[#0f172a] font-bold py-4 px-8 rounded-full text-lg hover:bg-white transition duration-300 text-center">
                        View Maintenance Services
                    </Link>
                    <Link href="/contact" className="border-2 border-white text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white/10 transition duration-300 flex items-center justify-center gap-2 text-center">
                        <Wrench size={20}/> Get a Project Quote
                    </Link>
                </div>
            </div>
             {/* Hero Image - Staff doing specialized work */}
            <div className="flex-1 relative h-[500px] w-full hidden md:block rounded-2xl overflow-hidden shadow-2xl border-4 border-[#d4af37]/30">
                <Image 
                    src="/placeholder.jpeg"
                    alt="Property maintenance specialist"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
      </section>

      {/* --- SPECIALTY GRID --- */}
      <section id="specialty-grid" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-[#0f172a] mb-4">Precision Property Maintenance</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">One call, every solution. We eliminate the need to manage multiple contractors by providing a unified team for your cleaning and repair needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {subServices.map((service, index) => (
                <div key={index} className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
                    <div className="relative h-64 overflow-hidden">
                        <Image 
                            src={service.imagePlaceholder}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 to-transparent"></div>
                        <h3 className="absolute bottom-6 left-6 font-serif text-3xl text-white">{service.title}</h3>
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                        <p className="text-gray-600 leading-relaxed mb-8 flex-grow">{service.description}</p>
                        
                        <div className="bg-[#faf9f6] p-6 rounded-xl mb-8">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] mb-4">Technical Standards:</h4>
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
                            Book {service.title} <ArrowRight size={20} className="ml-2"/>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* --- THE MAINTENANCE STANDARD --- */}
      <section className="bg-white py-24 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 px-4">
                <div className="text-center">
                    <div className="w-16 h-16 bg-[#F0FFFF] rounded-full flex items-center justify-center mx-auto mb-6 text-[#d4af37]">
                        <Droplets size={32} />
                    </div>
                    <h3 className="font-serif text-2xl text-[#0f172a] mb-3">Safe Surface Care</h3>
                    <p className="text-gray-600 text-sm">We don't just blast surfaces. We assess material integrity and use 'Soft-Washing' chemicals where high pressure might cause damage to siding or wood.</p>
                </div>
                <div className="text-center">
                    <div className="w-16 h-16 bg-[#F0FFFF] rounded-full flex items-center justify-center mx-auto mb-6 text-[#d4af37]">
                        <Hammer size={32} />
                    </div>
                    <h3 className="font-serif text-2xl text-[#0f172a] mb-3">Professional Grade Tools</h3>
                    <p className="text-gray-600 text-sm">Our handyman team arrives with industrial equipment and premium hardware, ensuring every repair is permanent and looks seamless.</p>
                </div>
                <div className="text-center">
                    <div className="w-16 h-16 bg-[#F0FFFF] rounded-full flex items-center justify-center mx-auto mb-6 text-[#d4af37]">
                        <Wind size={32} />
                    </div>
                    <h3 className="font-serif text-2xl text-[#0f172a] mb-3">Year-Round Protection</h3>
                    <p className="text-gray-600 text-sm">From spring pressure washing to fall gutter clearing, we provide seasonal maintenance packages to protect your home from the elements.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="bg-[#0f172a] text-white py-20 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl mb-6">Master Your Home's Maintenance</h2>
            <p className="text-gray-400 mb-10 italic font-light">"Our gutters were overflowing and our driveway was black with moss. Elite Polish handled it all in one afternoon. Absolute professionals." — Resident, Owen Sound</p>
            <Link href="/contact" className="bg-[#d4af37] text-[#0f172a] font-bold py-5 px-12 rounded-full text-xl hover:bg-white transition duration-300 inline-block shadow-2xl">
                Start My Project Estimate
            </Link>
          </div>
      </section>
    </main>
  );
}