'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Key, 
  CheckCircle2, 
  Truck, 
  ClipboardList, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Home
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function MoveInOutPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] font-sans">
        <Navbar/>
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0f172a] text-white py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="z-10">
                <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase block mb-4">Real Estate & Transitions</span>
                <h1 className="font-serif text-5xl md:text-7xl mb-6">The <span className="italic">Perfect</span> Transition</h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed font-light">
                    Whether you are moving in or moving out, we provide a "Total-Void" clean. We ensure every 
                    trace of the previous occupant is erased, leaving a pristine canvas for the new chapter.
                </p>
                <Link href="/contact" className="bg-[#d4af37] text-[#0f172a] font-bold py-4 px-10 rounded-full hover:bg-white transition duration-300 inline-block shadow-xl">
                    Get My Move Quote
                </Link>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                    src="/placeholder.jpeg"
                    alt="Empty pristine room"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
      </section>

      {/* --- WHY IT MATTERS --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="bg-[#faf9f6] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Key className="text-[#d4af37]" />
                </div>
                <h3 className="font-serif text-2xl mb-4 text-[#0f172a]">Secure Your Deposit</h3>
                <p className="text-gray-600 text-sm">Our "Move-Out" protocol is designed to satisfy even the strictest landlords, ensuring your security deposit is returned in full.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="bg-[#faf9f6] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Truck className="text-[#d4af37]" />
                </div>
                <h3 className="font-serif text-2xl mb-4 text-[#0f172a]">Stress-Free Move</h3>
                <p className="text-gray-600 text-sm">Focus on the logistics of moving; we’ll handle the heavy lifting. Move into a home that is sanitized and ready for your family.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="bg-[#faf9f6] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Home className="text-[#d4af37]" />
                </div>
                <h3 className="font-serif text-2xl mb-4 text-[#0f172a]">Increased Value</h3>
                <p className="text-gray-600 text-sm">Preparing a home for sale? A professionally deep-cleaned house sells faster and often for a higher price point.</p>
            </div>
        </div>
      </section>

      {/* --- THE TOTAL VOID CHECKLIST --- */}
      <section className="bg-white py-24 px-6 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="font-serif text-4xl text-[#0f172a] mb-4">The "Total-Void" Checklist</h2>
                <p className="text-gray-500">Every corner, cabinet, and crevice detailed.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-6">
                    <h3 className="font-serif text-2xl text-[#0f172a] border-b-2 border-[#d4af37] pb-2 inline-block">Deep Detailing</h3>
                    <ul className="space-y-4">
                        {[
                            "Inside all kitchen cabinets & drawers",
                            "Inside refrigerator, freezer & dishwasher",
                            "Inside oven and warming drawer",
                            "Deep cleaning of pantry shelves",
                            "Sanitizing inside bathroom vanities",
                            "Dusting inside all bedroom closets"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-600">
                                <CheckCircle2 size={18} className="text-[#d4af37] mt-1 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="space-y-6">
                    <h3 className="font-serif text-2xl text-[#0f172a] border-b-2 border-[#d4af37] pb-2 inline-block">Structure & Surrounds</h3>
                    <ul className="space-y-4">
                        {[
                            "Wiping door frames, knobs & light switches",
                            "Baseboards hand-wiped throughout",
                            "Window tracks and sills vacuumed",
                            "Cobweb removal in garage & basement",
                            "Hard floor scrubbing & edge-to-edge vacuuming",
                            "Cleaning of air vents and register covers"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-600">
                                <CheckCircle2 size={18} className="text-[#d4af37] mt-1 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="bg-[#0f172a] py-20 px-6 text-center">
        <h2 className="font-serif text-4xl text-white mb-6">Planning a Transition?</h2>
        <p className="text-gray-400 mb-10 max-w-2xl mx-auto">Book your turnover service at least 7 days in advance to ensure availability on your moving date.</p>
        <Link href="/contact" className="bg-[#d4af37] text-[#0f172a] font-bold py-5 px-12 rounded-full text-xl hover:bg-white transition duration-300 inline-block shadow-2xl">
            Request My Quote
        </Link>
      </section>
    </main>
  );
}