'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Wind, 
  ShieldAlert, 
  CheckCircle2, 
  Droplets, 
  Camera, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function GutterCleaningPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] font-sans">
        <Navbar/>
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0f172a] text-white py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="z-10">
                <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase block mb-4">Exterior Maintenance</span>
                <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
                    Protect Your <span className="italic text-[#d4af37]">Foundation</span>.
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed font-light">
                    Blocked gutters are the leading cause of basement flooding and foundation cracks. 
                    Our Elite Gutter service ensures free-flowing drainage and safe debris disposal 
                    without you ever having to climb a ladder.
                </p>
                <Link href="/contact" className="bg-[#d4af37] text-[#0f172a] font-bold py-4 px-10 rounded-full hover:bg-white transition duration-300 inline-block shadow-xl">
                    Book Gutter Service
                </Link>
            </div>
            <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/5">
                <Image 
                    src="/placeholder.jpeg"
                    alt="Professional Gutter Cleaning"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
      </section>

      {/* --- THE RISK SECTION --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-[2rem] p-10 md:p-16 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
                <div className="bg-red-50 text-red-600 p-4 rounded-xl inline-flex items-center gap-2 mb-6 uppercase text-xs font-bold tracking-widest">
                    <AlertTriangle size={16} /> Seasonal Risk Warning
                </div>
                <h2 className="font-serif text-3xl text-[#0f172a] mb-6">Why Professionals Matter</h2>
                <p className="text-gray-600 mb-6">Over 500,000 ladder-related injuries occur annually. Beyond safety, amateur cleaning often leaves debris in the downspouts, causing hidden clogs that burst pipes during winter freezes.</p>
                <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-gray-700 font-medium">
                        <CheckCircle2 size={20} className="text-[#d4af37]" /> Full Downspout Flush included
                    </li>
                    <li className="flex items-center gap-3 text-gray-700 font-medium">
                        <CheckCircle2 size={20} className="text-[#d4af37]" /> Seam & Bracket Integrity Check
                    </li>
                    <li className="flex items-center gap-3 text-gray-700 font-medium">
                        <CheckCircle2 size={20} className="text-[#d4af37]" /> Debris disposal (We take it with us)
                    </li>
                </ul>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="bg-[#faf9f6] p-6 rounded-2xl text-center">
                    <ShieldAlert className="text-[#d4af37] mx-auto mb-2" />
                    <span className="block text-[#0f172a] font-bold text-lg">Prevent</span>
                    <span className="text-gray-500 text-xs">Foundation Cracks</span>
                </div>
                <div className="bg-[#faf9f6] p-6 rounded-2xl text-center">
                    <Droplets className="text-[#d4af37] mx-auto mb-2" />
                    <span className="block text-[#0f172a] font-bold text-lg">Avoid</span>
                    <span className="text-gray-500 text-xs">Water Staining</span>
                </div>
                <div className="bg-[#faf9f6] p-6 rounded-2xl text-center">
                    <Wind className="text-[#d4af37] mx-auto mb-2" />
                    <span className="block text-[#0f172a] font-bold text-lg">Stop</span>
                    <span className="text-gray-500 text-xs">Ice Damming</span>
                </div>
                <div className="bg-[#faf9f6] p-6 rounded-2xl text-center">
                    <Camera className="text-[#d4af37] mx-auto mb-2" />
                    <span className="block text-[#0f172a] font-bold text-lg">Photos</span>
                    <span className="text-gray-500 text-xs">Before & After</span>
                </div>
            </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="bg-[#0f172a] py-20 px-6 text-center">
        <h2 className="font-serif text-4xl text-white mb-6">Don't Wait for the Next Storm</h2>
        <p className="text-gray-400 mb-10 max-w-2xl mx-auto italic font-light">"The peace of mind knowing my gutters are clear and my house is protected is worth every penny. The team was fast, safe, and professional." — Resident, Collingwood</p>
        <Link href="/contact" className="bg-[#d4af37] text-[#0f172a] font-bold py-5 px-12 rounded-full text-xl hover:bg-white transition duration-300 inline-block shadow-2xl">
            Request Gutter Estimate
        </Link>
      </section>
    </main>
  );
}