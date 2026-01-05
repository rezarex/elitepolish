'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Stethoscope, 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  Microscope, 
  ClipboardCheck, 
  ShieldAlert,
  ArrowRight,
  FlaskConical
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function MedicalCleaningPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] font-sans">
        <Navbar/>
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0f172a] text-white py-24 lg:py-32 overflow-hidden">
        {/* Subtle grid pattern overlay for a "technical" feel */}
        <div className="absolute inset-0 opacity-5 bg-[url('/carbon-fibre.png')]"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Activity className="text-[#d4af37]" size={20} />
                    <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase">Healthcare Facilities Division</span>
                </div>
                <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
                    Clinical <span className="italic">Integrity</span> in Every Corner.
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed font-light">
                    We provide hospital-grade sanitation for private practices, dental clinics, and surgical suites. 
                    Our protocols are designed to exceed provincial health standards and protect your most vulnerable patients.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/contact" className="bg-[#d4af37] text-[#0f172a] font-bold py-4 px-10 rounded-full hover:bg-white transition duration-300 text-center shadow-xl">
                        Request a Clinical Proposal
                    </Link>
                </div>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <Image 
                    src="/placeholder.jpeg"
                    alt="Clinical Medical Office"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
      </section>

      {/* --- CLINICAL STANDARDS (Trust Section) --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
                <ShieldCheck className="text-[#d4af37] mx-auto mb-4" size={40} />
                <h4 className="font-bold text-[#0f172a] mb-2 uppercase text-xs tracking-widest">EPA Registered</h4>
                <p className="text-gray-500 text-xs italic">We use only hospital-grade, EPA-registered disinfectants.</p>
            </div>
            <div className="text-center">
                <ClipboardCheck className="text-[#d4af37] mx-auto mb-4" size={40} />
                <h4 className="font-bold text-[#0f172a] mb-2 uppercase text-xs tracking-widest">HIPAA Aware</h4>
                <p className="text-gray-500 text-xs italic">Staff are trained in patient privacy and document security.</p>
            </div>
            <div className="text-center">
                <FlaskConical className="text-[#d4af37] mx-auto mb-4" size={40} />
                <h4 className="font-bold text-[#0f172a] mb-2 uppercase text-xs tracking-widest">OSHA Compliant</h4>
                <p className="text-gray-500 text-xs italic">Strict adherence to bloodborne pathogen protocols.</p>
            </div>
            <div className="text-center">
                <Microscope className="text-[#d4af37] mx-auto mb-4" size={40} />
                <h4 className="font-bold text-[#0f172a] mb-2 uppercase text-xs tracking-widest">HEPA Filtration</h4>
                <p className="text-gray-500 text-xs italic">Advanced air scrubbing to maintain clinical air quality.</p>
            </div>
        </div>
      </section>

      {/* --- CROSS-CONTAMINATION PROTOCOL --- */}
      <section className="bg-white py-24 px-6 border-y border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 space-y-6">
                <h2 className="font-serif text-4xl text-[#0f172a]">The <span className="text-[#d4af37]">Zero-Transfer</span> Protocol</h2>
                <p className="text-gray-600 leading-relaxed">
                    Our medical cleaning division utilizes a <strong>color-coded microfiber system</strong>. This ensures that tools 
                    used in restroom environments never enter exam rooms or administrative areas, effectively eliminating 
                    the risk of cross-contamination.
                </p>
                <ul className="space-y-4">
                    <li className="flex items-center gap-3 font-medium text-[#0f172a]">
                        <CheckCircle2 className="text-[#d4af37]" size={20} />
                        Disposable mop-head technology
                    </li>
                    <li className="flex items-center gap-3 font-medium text-[#0f172a]">
                        <CheckCircle2 className="text-[#d4af37]" size={20} />
                        Electrospray disinfection for high-touch equipment
                    </li>
                    <li className="flex items-center gap-3 font-medium text-[#0f172a]">
                        <CheckCircle2 className="text-[#d4af37]" size={20} />
                        Stringent dwell-time adherence for chemicals
                    </li>
                </ul>
            </div>
            <div className="flex-1 relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                <Image 
                    src="/placeholder.jpeg"
                    alt="Sanitization Protocol"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
      </section>

      {/* --- CLINICAL CHECKLIST --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-[#0f172a] mb-4">Targeted Facility Care</h2>
            <p className="text-gray-500">Different zones require different standards. We manage them all.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {/* Zone 1 */}
            <div className="bg-[#0f172a] p-10 rounded-3xl text-white">
                <Stethoscope className="text-[#d4af37] mb-6" size={32} />
                <h3 className="font-serif text-2xl mb-4">Exam & Treatment Rooms</h3>
                <ul className="space-y-3 text-sm text-gray-400">
                    <li>• Disinfection of exam tables & stools</li>
                    <li>• Sinks and faucet descaling/sanitation</li>
                    <li>• Waste removal (Standard & Sharps coord.)</li>
                    <li>• Wall-mounted fixture sanitization</li>
                </ul>
            </div>
            {/* Zone 2 */}
            <div className="bg-[#0f172a] p-10 rounded-3xl text-white">
                <ShieldAlert className="text-[#d4af37] mb-6" size={32} />
                <h3 className="font-serif text-2xl mb-4">Waiting & Reception</h3>
                <ul className="space-y-3 text-sm text-gray-400">
                    <li>• High-touch kiosk & counter disinfection</li>
                    <li>• Antimicrobial upholstery treatment</li>
                    <li>• Floor sanitization (Hardwood/Laminate)</li>
                    <li>• Air quality monitoring & purification</li>
                </ul>
            </div>
            {/* Zone 3 */}
            <div className="bg-[#0f172a] p-10 rounded-3xl text-white">
                <FlaskConical className="text-[#d4af37] mb-6" size={32} />
                <h3 className="font-serif text-2xl mb-4">Labs & Diagnostics</h3>
                <ul className="space-y-3 text-sm text-gray-400">
                    <li>• Sterile-environment dusting</li>
                    <li>• Non-corrosive chemical application</li>
                    <li>• Precision floor edge cleaning</li>
                    <li>• Sensitive equipment "No-Touch" zones</li>
                </ul>
            </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="bg-white py-24 px-6 text-center border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl text-[#0f172a] mb-6">Expertise That Inspires Patient Confidence</h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
                A clean office is the first sign of a great physician. Partner with Elite Polish to 
                ensure your facility reflects the high standard of care you provide your patients.
            </p>
            <Link href="/contact" className="bg-[#0f172a] text-white font-bold py-5 px-12 rounded-full text-xl hover:bg-[#d4af37] hover:text-[#0f172a] transition duration-300 inline-block shadow-2xl">
                Book a Clinical Site Survey <ArrowRight className="inline ml-2" size={20} />
            </Link>
          </div>
      </section>

    </main>
  );
}