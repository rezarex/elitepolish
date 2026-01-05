'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Wrench, 
  Hammer, 
  Maximize, 
  Lightbulb, 
  Drill, 
  Tv, 
  PenTool, 
  CheckCircle2, 
  ArrowRight,
  ClipboardSignature
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const handymanTasks = [
  {
    title: "Mounting & Installation",
    icon: <Tv className="text-[#d4af37]" />,
    items: ["TV Wall Mounting (Hidden cables)", "Art & Mirror Hanging", "Curtain rod & Blind installation", "Floating shelf mounting"]
  },
  {
    title: "Assembly Services",
    icon: <Hammer className="text-[#d4af37]" />,
    items: ["IKEA & Flat-pack furniture", "Exercise equipment assembly", "Outdoor furniture & BBQs", "Office workstation setup"]
  },
  {
    title: "Minor Repairs",
    icon: <PenTool className="text-[#d4af37]" />,
    items: ["Drywall patch & Paint touch-ups", "Door handle & Lock replacement", "Cabinet hinge adjustments", "Weather stripping installation"]
  },
  {
    title: "Electrical & Smart Home",
    icon: <Lightbulb className="text-[#d4af37]" />,
    items: ["Light fixture & Sconce swaps", "Smart doorbell installation", "Dimmer switch upgrades", "Smoke detector maintenance"]
  }
];

export default function HandymanServicesPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] font-sans">
        <Navbar/>
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0f172a] text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/pinstriped-suit.png')]"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
                <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase block mb-4">Precision Craftsmanship</span>
                <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
                    Your Household <span className="italic text-[#d4af37]">Concierge</span>.
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed font-light">
                    Stop managing a dozen contractors. From mounting art to repairing drywall, our 
                    skilled technicians handle your "to-do" list with the same elite standard we 
                    bring to our cleaning.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/book" className="bg-[#d4af37] text-[#0f172a] font-bold py-4 px-10 rounded-full hover:bg-white transition duration-300 text-center shadow-xl flex items-center justify-center gap-2">
                        Get a Project Quote <ArrowRight size={18}/>
                    </Link>
                </div>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                <Image 
                    src="/placeholder.jpeg"
                    alt="Handyman service in action"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>
        </div>
      </section>

      {/* --- SERVICE CATEGORIES --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-[#0f172a] mb-4">A Master of Every Trade</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Professional, insured, and equipped. We specialize in the small-to-medium tasks that make a house a home.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {handymanTasks.map((category, index) => (
                <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-[#d4af37] transition-all">
                    <div className="bg-[#faf9f6] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                        {category.icon}
                    </div>
                    <h3 className="font-serif text-2xl mb-6 text-[#0f172a]">{category.title}</h3>
                    <ul className="space-y-3">
                        {category.items.map((item, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                <CheckCircle2 size={14} className="text-[#d4af37] mt-1 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </section>

      {/* --- HOW TO REQUEST A QUOTE (The Multi-Step Funnel) --- */}
      <section className="bg-[#0f172a] py-24 px-6 rounded-t-[3rem] lg:rounded-t-[6rem] text-white">
        <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-serif text-4xl mb-16">Our Seamless <span className="text-[#d4af37]">Quote Process</span></h2>
            <div className="grid md:grid-cols-3 gap-12 relative">
                {/* Step 1 */}
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-2 border-[#d4af37] flex items-center justify-center mb-6 bg-[#0f172a] z-10">
                        <span className="font-serif text-2xl text-[#d4af37]">01</span>
                    </div>
                    <h4 className="font-bold mb-2">Details & Photos</h4>
                    <p className="text-gray-400 text-sm">Use our multi-step form to tell us about your project. Uploading a photo helps us provide a precise estimate.</p>
                </div>
                {/* Step 2 */}
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-2 border-[#d4af37] flex items-center justify-center mb-6 bg-[#0f172a] z-10">
                        <span className="font-serif text-2xl text-[#d4af37]">02</span>
                    </div>
                    <h4 className="font-bold mb-2">Instant Review</h4>
                    <p className="text-gray-400 text-sm">Our lead technician reviews your request and sends a digital quote for your approval within 24 hours.</p>
                </div>
                {/* Step 3 */}
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-2 border-[#d4af37] flex items-center justify-center mb-6 bg-[#0f172a] z-10">
                        <span className="font-serif text-2xl text-[#d4af37]">03</span>
                    </div>
                    <h4 className="font-bold mb-2">Schedule & Execute</h4>
                    <p className="text-gray-400 text-sm">Once approved, pick a time that works for you. Our pro arrives with all necessary tools to get the job done.</p>
                </div>
                
                {/* Connector Line (Hidden on mobile) */}
                <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-[1px] bg-[#d4af37]/30 z-0"></div>
            </div>
        </div>
      </section>

      {/* --- FINAL CONVERSION --- */}
      <section className="py-24 px-6 text-center">
          <div className="max-w-3xl mx-auto bg-white p-12 lg:p-20 rounded-[3rem] shadow-xl border border-gray-100">
            <ClipboardSignature className="text-[#d4af37] mx-auto mb-6" size={48} />
            <h2 className="font-serif text-4xl text-[#0f172a] mb-6">Ready to clear your to-do list?</h2>
            <p className="text-gray-600 mb-10 text-lg">
                Join our **Elite Membership** for priority handyman scheduling and a 
                discounted hourly rate on all property repairs.
            </p>
            <Link href="/book" className="bg-[#0f172a] text-white font-bold py-5 px-12 rounded-full text-xl hover:bg-[#d4af37] transition duration-300 inline-block shadow-2xl">
                Start My Multi-Step Quote
            </Link>
          </div>
      </section>

    </main>
  );
}