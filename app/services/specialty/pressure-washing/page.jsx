'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Droplets, 
  Sparkles, 
  CheckCircle2, 
  Home, 
  Waves, 
  Sun, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function PressureWashingPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] font-sans">
        <Navbar/>
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0f172a] text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <Image 
                src="/placeholder.jpeg"
                alt="Pressure Washing Background"
                fill
                className="object-cover"
            />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
                <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase block mb-4">Surface Restoration</span>
                <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
                    Instant <span className="italic text-[#d4af37]">Curb Appeal</span>.
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed font-light">
                    Years of dirt, mold, and algae can be erased in a single afternoon. We use 
                    specialized soft-washing and high-pressure techniques to restore your property's 
                    surfaces to their original glory.
                </p>
                <Link href="/contact" className="bg-[#d4af37] text-[#0f172a] font-bold py-4 px-10 rounded-full hover:bg-white transition duration-300 inline-block shadow-xl">
                    Get a Washing Quote
                </Link>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#d4af37]/20">
                <Image 
                    src="/placeholder.jpeg"
                    alt="Professional Pressure Washing in action"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
      </section>

      {/* --- SERVICE BOXES --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 bg-[#0f172a] rounded-2xl flex items-center justify-center mb-6">
                    <Home className="text-[#d4af37]" />
                </div>
                <h3 className="font-serif text-2xl mb-4 text-[#0f172a]">Soft-Wash Siding</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">For delicate vinyl, stucco, and wood. We use eco-friendly detergents and low-pressure water to kill mold at the root without damaging your home's exterior.</p>
                <div className="h-[1px] w-full bg-gray-100 mb-6"></div>
                <span className="text-[#d4af37] font-bold text-xs uppercase tracking-widest">Safe for all siding</span>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 bg-[#0f172a] rounded-2xl flex items-center justify-center mb-6">
                    <Waves className="text-[#d4af37]" />
                </div>
                <h3 className="font-serif text-2xl mb-4 text-[#0f172a]">Concrete & Interlock</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">High-pressure restoration for driveways, walkways, and patios. We remove oil stains, tire marks, and deeply embedded weeds from interlock joints.</p>
                <div className="h-[1px] w-full bg-gray-100 mb-6"></div>
                <span className="text-[#d4af37] font-bold text-xs uppercase tracking-widest">Industrial Grade Equipment</span>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 bg-[#0f172a] rounded-2xl flex items-center justify-center mb-6">
                    <Sun className="text-[#d4af37]" />
                </div>
                <h3 className="font-serif text-2xl mb-4 text-[#0f172a]">Decks & Fences</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">Refresh your outdoor living space. We safely strip away grey, weathered wood fibers to reveal the natural grain underneath, ready for staining.</p>
                <div className="h-[1px] w-full bg-gray-100 mb-6"></div>
                <span className="text-[#d4af37] font-bold text-xs uppercase tracking-widest">Wood Restoration Experts</span>
            </div>
        </div>
      </section>

      {/* --- THE TRANSFORMATION --- */}
      <section className="bg-[#0f172a] py-24 px-6 text-white rounded-t-[3rem] lg:rounded-t-[6rem]">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1 relative h-[400px] w-full rounded-2xl overflow-hidden">
                  <Image 
                    src="/placeholder.jpeg"
                    alt="Transformation results"
                    fill
                    className="object-cover"
                  />
              </div>
              <div className="flex-1 space-y-8">
                  <h2 className="font-serif text-4xl leading-tight">The Power of <br/><span className="text-[#d4af37]">Professional Grade</span></h2>
                  <p className="text-gray-400 leading-relaxed font-light">
                      Consumer-grade pressure washers often lack the PSI and volume to get deep into 
                      porous concrete. Our industrial equipment ensures a uniform clean without 
                      the "zebra stripes" often left behind by DIY attempts.
                  </p>
                  <div className="space-y-4">
                      <div className="flex items-center gap-4">
                          <Zap size={20} className="text-[#d4af37]" />
                          <span className="font-medium">4,000 PSI + 4GPM Industrial Capability</span>
                      </div>
                      <div className="flex items-center gap-4">
                          <ShieldCheck size={20} className="text-[#d4af37]" />
                          <span className="font-medium">Surface-specific nozzle selection</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 px-6 text-center bg-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-4xl text-[#0f172a] mb-6">Ready for a Total Property Refresh?</h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
                Combine your Pressure Washing with a Gutter Clean for a full exterior restoration 
                and receive a multi-service discount.
            </p>
            <Link href="/contact" className="bg-[#0f172a] text-white font-bold py-5 px-12 rounded-full text-xl hover:bg-[#d4af37] hover:text-[#0f172a] transition duration-300 inline-block shadow-2xl">
                Get My Exterior Quote
            </Link>
          </div>
      </section>
    </main>
  );
}