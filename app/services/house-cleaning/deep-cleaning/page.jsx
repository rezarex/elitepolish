'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Wind, 
  ThermometerSnowflake, 
  FlameKindling, 
  ArrowRight,
  ShieldCheck,
  Search
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function DeepCleaningPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] font-sans">
        <Navbar/>
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0f172a] text-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-[2px] w-8 bg-[#d4af37]"></div>
                    <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase">The Restoration Series</span>
                </div>
                <h1 className="font-serif text-5xl md:text-7xl mb-6">Deep Cleaning <span className="italic">Excellence</span></h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed font-light">
                    A comprehensive, top-to-bottom reset for your home. We target the neglected 
                    areas—drywall dust, grease buildup, and hidden grime—that standard cleaning 
                    services overlook.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/contact" className="bg-[#d4af37] text-[#0f172a] font-bold py-4 px-10 rounded-full hover:bg-white transition duration-300 text-center shadow-xl">
                        Schedule a Deep Clean
                    </Link>
                    <Link href="#checklist" className="border border-white/30 text-white font-bold py-4 px-10 rounded-full hover:bg-white/10 transition duration-300 text-center">
                        View Full Checklist
                    </Link>
                </div>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                <Image 
                    src="/placeholder.jpeg"
                    alt="Deep Cleaning Detail"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-8 left-8 flex items-center gap-4">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                        <p className="text-[#d4af37] font-bold text-2xl">100%</p>
                        <p className="text-xs uppercase tracking-tighter">Detail Guarantee</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- THE DIFFERENTIATOR: Maintenance vs. Deep --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-[#0f172a] mb-4">Why Choose a Deep Clean?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto italic">Recommended for first-time visits, seasonal refreshes, or homes that haven't been professionally cleaned in over 30 days.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:border-[#d4af37] transition-colors">
                <Layers className="text-[#d4af37] mb-6" size={40} />
                <h3 className="font-serif text-2xl mb-4">Vertical Surfaces</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Unlike standard cleaning, we hand-wipe all vertical surfaces, including baseboards, door frames, window sills, and cabinet fronts.</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:border-[#d4af37] transition-colors">
                <Wind className="text-[#d4af37] mb-6" size={40} />
                <h3 className="font-serif text-2xl mb-4">High-Reach Areas</h3>
                <p className="text-gray-600 text-sm leading-relaxed">We remove dust and cobwebs from ceiling fans, crown molding, and high-reach light fixtures that collect allergens over time.</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:border-[#d4af37] transition-colors">
                <Search className="text-[#d4af37] mb-6" size={40} />
                <h3 className="font-serif text-2xl mb-4">Hidden Grime</h3>
                <p className="text-gray-600 text-sm leading-relaxed">We focus on the areas "behind the scenes," including inside appliances, vent covers, and grout lines in showers and backsplashes.</p>
            </div>
        </div>
      </section>

      {/* --- THE DEEP CLEAN CHECKLIST --- */}
      <section id="checklist" className="bg-[#0f172a] text-white py-24 px-6 rounded-t-[3rem] lg:rounded-t-[6rem]">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                    <span className="text-[#d4af37] font-bold uppercase tracking-widest text-sm">Every Inch Covered</span>
                    <h2 className="font-serif text-4xl md:text-5xl mt-2">The Restoration Checklist</h2>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-4 rounded-xl">
                    <ShieldCheck size={24} className="text-[#d4af37]" />
                    <span className="text-sm font-medium">Hospital-Grade Disinfectants Used</span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Kitchen Detail */}
                <div className="space-y-6">
                    <h3 className="text-[#d4af37] font-serif text-2xl border-b border-[#d4af37]/30 pb-4">Kitchen Restoration</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-sm text-gray-400">
                            <CheckCircle2 size={16} className="text-[#d4af37] mt-1 flex-shrink-0" />
                            <span>Inside Oven & Stove hood degreasing</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-400">
                            <CheckCircle2 size={16} className="text-[#d4af37] mt-1 flex-shrink-0" />
                            <span>Inside Refrigerator & Freezer sanitization</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-400">
                            <CheckCircle2 size={16} className="text-[#d4af37] mt-1 flex-shrink-0" />
                            <span>Detailed scrubbing of backsplash & grout</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-400">
                            <CheckCircle2 size={16} className="text-[#d4af37] mt-1 flex-shrink-0" />
                            <span>Exterior & Top of cabinetry detailing</span>
                        </li>
                    </ul>
                </div>

                {/* Bathroom Sanitization */}
                <div className="space-y-6">
                    <h3 className="text-[#d4af37] font-serif text-2xl border-b border-[#d4af37]/30 pb-4">Full Sanitization</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-sm text-gray-400">
                            <CheckCircle2 size={16} className="text-[#d4af37] mt-1 flex-shrink-0" />
                            <span>Intense descaling of shower heads & faucets</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-400">
                            <CheckCircle2 size={16} className="text-[#d4af37] mt-1 flex-shrink-0" />
                            <span>Grout scrubbed with professional pH-neutral cleaner</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-400">
                            <CheckCircle2 size={16} className="text-[#d4af37] mt-1 flex-shrink-0" />
                            <span>Inside vanity cabinets & drawers organized</span>
                        </li>
                    </ul>
                </div>

                {/* All Living Areas */}
                <div className="space-y-6">
                    <h3 className="text-[#d4af37] font-serif text-2xl border-b border-[#d4af37]/30 pb-4">Detailed Living</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-sm text-gray-400">
                            <CheckCircle2 size={16} className="text-[#d4af37] mt-1 flex-shrink-0" />
                            <span>Hand-wiping of all baseboards & door frames</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-400">
                            <CheckCircle2 size={16} className="text-[#d4af37] mt-1 flex-shrink-0" />
                            <span>Window tracks & sills vacuumed & wiped</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-400">
                            <CheckCircle2 size={16} className="text-[#d4af37] mt-1 flex-shrink-0" />
                            <span>Light fixtures & ceiling fans detailed by hand</span>
                        </li>
                    </ul>
                </div>

                {/* Specialized Add-ons */}
                <div className="space-y-6">
                    <h3 className="text-[#d4af37] font-serif text-2xl border-b border-[#d4af37]/30 pb-4">Specialty Tasks</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-sm text-gray-400">
                            <CheckCircle2 size={16} className="text-[#d4af37] mt-1 flex-shrink-0" />
                            <span>Wall spot-cleaning (scuffs & marks)</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-400">
                            <CheckCircle2 size={16} className="text-[#d4af37] mt-1 flex-shrink-0" />
                            <span>Vent & Register intake vacuuming</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-400">
                            <CheckCircle2 size={16} className="text-[#d4af37] mt-1 flex-shrink-0" />
                            <span>Basement & Garage stair sweeping</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* --- RECURRING CONVERSION --- */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
          <div className="bg-[#faf9f6] p-12 lg:p-20 rounded-3xl border border-gray-200">
            <Sparkles className="text-[#d4af37] mx-auto mb-6" size={48} />
            <h2 className="font-serif text-4xl text-[#0f172a] mb-6">Transition to Excellence</h2>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                Most our clients begin with a **Deep Clean** to establish a baseline of perfection, 
                then transition to our **Signature Maintenance** plan to keep their home 
                flawless year-round.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
                <Link href="/contact" className="bg-[#0f172a] text-white font-bold py-5 px-10 rounded-full hover:bg-[#d4af37] transition duration-300">
                    Get an Instant Estimate
                </Link>
                <Link href="/services/house-cleaning/standard-maintenance" className="text-[#0f172a] font-bold py-5 px-10 rounded-full flex items-center justify-center gap-2 hover:bg-white transition">
                    Learn About Maintenance <ArrowRight size={20} />
                </Link>
            </div>
          </div>
      </section>
    </main>
  );
}