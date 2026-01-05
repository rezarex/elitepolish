'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  HardHat, 
  Construction, 
  Trash2, 
  ScanEye, 
  Wind, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Ruler
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function PostConstructionPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] font-sans">
        <Navbar/>
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0f172a] text-white py-24 lg:py-32 overflow-hidden border-b border-[#d4af37]/20">
        <div className="absolute inset-0 opacity-10 bg-[url('/gplay.png')]"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Construction className="text-[#d4af37]" size={20} />
                    <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase">Industrial & New Builds</span>
                </div>
                <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
                    From Site to <span className="italic text-[#d4af37]">Showcase</span>.
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed font-light">
                    The build is done, but the work isn't finished until the dust is gone. We provide 
                    meticulous 3-phase cleaning to remove the fine particulate matter and adhesive 
                    residue left behind by construction crews.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/contact" className="bg-[#d4af37] text-[#0f172a] font-bold py-4 px-10 rounded-full hover:bg-white transition duration-300 text-center shadow-xl">
                        Request a Project Quote
                    </Link>
                </div>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                <Image 
                    src="/placeholder.jpeg"
                    alt="Pristine New Construction"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
            </div>
        </div>
      </section>

      {/* --- THE 3-PHASE PROCESS --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-[#0f172a] mb-4">Our 3-Phase Methodology</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We follow a systematic approach to ensure that fine drywall dust and hazardous debris are completely eliminated.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
            {/* Phase 1 */}
            <div className="relative p-10 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="absolute -top-5 left-10 bg-[#d4af37] text-[#0f172a] font-bold px-4 py-1 rounded-full text-xs uppercase">Phase 01</div>
                <h3 className="font-serif text-2xl mb-4 text-[#0f172a]">The Rough Clean</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Removal of large debris, leftover materials, and stickers. We perform an initial vacuuming of all surfaces to prepare the site for detail work.</p>
            </div>
            {/* Phase 2 */}
            <div className="relative p-10 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="absolute -top-5 left-10 bg-[#d4af37] text-[#0f172a] font-bold px-4 py-1 rounded-full text-xs uppercase">Phase 02</div>
                <h3 className="font-serif text-2xl mb-4 text-[#0f172a]">The Detail Clean</h3>
                <p className="text-gray-600 text-sm leading-relaxed">The labor-intensive stage. Scrubbing grout, wiping inside cabinets, cleaning window tracks, and hand-polishing fixtures to remove paint and adhesive.</p>
            </div>
            {/* Phase 3 */}
            <div className="relative p-10 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="absolute -top-5 left-10 bg-[#d4af37] text-[#0f172a] font-bold px-4 py-1 rounded-full text-xs uppercase">Phase 03</div>
                <h3 className="font-serif text-2xl mb-4 text-[#0f172a]">The Final Punch</h3>
                <p className="text-gray-600 text-sm leading-relaxed">A high-speed "walk-through" clean 24 hours later to catch any settled dust. We ensure every surface is fingerprint-free and ready for the homeowner.</p>
            </div>
        </div>
      </section>

      {/* --- SPECIALIZED EQUIPMENT (Trust Section) --- */}
      <section className="bg-[#0f172a] py-24 px-6 rounded-t-[3rem] lg:rounded-t-[6rem] text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
                <h2 className="font-serif text-4xl mb-8">Industrial Power. <span className="text-[#d4af37]">Boutique Results.</span></h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="flex gap-4">
                        <Wind className="text-[#d4af37] flex-shrink-0" size={24} />
                        <div>
                            <h4 className="font-bold mb-1">HEPA Air Scrubbing</h4>
                            <p className="text-gray-400 text-sm">We use industrial air scrubbers to remove airborne silica and drywall dust.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <ScanEye className="text-[#d4af37] flex-shrink-0" size={24} />
                        <div>
                            <h4 className="font-bold mb-1">UV Inspection</h4>
                            <p className="text-gray-400 text-sm">Spotting adhesive residue and paint overspray that is invisible to the naked eye.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Trash2 className="text-[#d4af37] flex-shrink-0" size={24} />
                        <div>
                            <h4 className="font-bold mb-1">Debris Disposal</h4>
                            <p className="text-gray-400 text-sm">Authorized disposal of construction waste and hazardous remnants.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Ruler className="text-[#d4af37] flex-shrink-0" size={24} />
                        <div>
                            <h4 className="font-bold mb-1">Precision Polishing</h4>
                            <p className="text-gray-400 text-sm">Safe removal of concrete splatter from glass and sensitive metal fixtures.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-white/5 border border-white/10 p-12 rounded-[2rem] backdrop-blur-sm">
                <h3 className="font-serif text-2xl text-[#d4af37] mb-6">Contractor Partnerships</h3>
                <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                    We offer specialized pricing for developers, general contractors, and staging 
                    professionals in the [Your Region] area. Let us handle the final 1% of the 
                    project so you can focus on the handover.
                </p>
                <ul className="space-y-3 mb-8 text-sm">
                    <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#d4af37]"/> WSIB & Full Liability Insurance</li>
                    <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#d4af37]"/> Bonded Professional Staff</li>
                    <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#d4af37]"/> Flexible Overnight Scheduling</li>
                </ul>
                <button className="w-full bg-white text-[#0f172a] font-bold py-4 rounded-xl hover:bg-[#d4af37] transition duration-300">
                    Partner With Us
                </button>
            </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl text-[#0f172a] mb-6">The Final Piece of Your Build</h2>
            <p className="text-gray-600 mb-10 max-w-xl mx-auto">
                Don't let construction dust ruin a multi-month renovation. Ensure the grand 
                reveal is perfect with Elite Polish.
            </p>
            <div className="flex justify-center gap-4">
                <Link href="/contact" className="bg-[#0f172a] text-white font-bold py-5 px-12 rounded-full text-xl hover:bg-[#d4af37] transition duration-300 inline-block shadow-2xl">
                    Get a Post-Build Quote
                </Link>
            </div>
          </div>
      </section>
    </main>
  );
}