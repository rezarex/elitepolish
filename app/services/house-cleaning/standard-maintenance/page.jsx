'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCircle2, 
  ShieldCheck, 
  ThumbsUp, 
  Waves, 
  Shirt, 
  Clock, 
  GlassWater,
  Sparkles
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function StandardMaintenancePage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] font-sans">
        <Navbar/>
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0f172a] text-white py-24 border-b-4 border-[#d4af37]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
                <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase block mb-4">Residential Collection</span>
                <h1 className="font-serif text-5xl md:text-6xl mb-6">Signature <span className="italic">Maintenance</span> Cleaning</h1>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    Our standard maintenance service is more than a "quick tidy." It is a meticulously executed 
                    program designed to preserve your home’s beauty and health on a recurring weekly, 
                    bi-weekly, or monthly basis.
                </p>
                <Link href="/contact" className="bg-[#d4af37] text-[#0f172a] font-bold py-4 px-10 rounded-full hover:bg-white transition duration-300 inline-block shadow-lg">
                    Book Your First Clean
                </Link>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image 
                    src="/placeholder.jpeg"
                    alt="Pristine Living Room"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
      </section>

      {/* --- DETAILED PHILOSOPHY (Mirroring Reference Image) --- */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h2 className="font-serif text-4xl text-[#0f172a] mb-6">Excellence in Every Detail</h2>
        <p className="text-gray-600 leading-relaxed mb-12 text-lg">
            At Elite Polish, we provide housecleaning services that can be tailored to a high-quality lifestyle. 
            Whether you need a one-time refresh or a permanent partner in home management, 
            our trained professionals deliver consistent, award-winning results every time.
        </p>

        <div className="grid md:grid-cols-2 gap-12 text-left">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck className="text-[#d4af37]" size={28} />
                    <h3 className="font-serif text-2xl text-[#0f172a]">Health & Safety</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                    Our staff is dedicated to maintaining a safe environment for your family and pets. 
                    We use eco-friendly, non-toxic cleaning products whenever possible and follow strict 
                    sanitation protocols, including the use of fresh microfiber cloths for every room to prevent cross-contamination.
                </p>
            </div>
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <ThumbsUp className="text-[#d4af37]" size={28} />
                    <h3 className="font-serif text-2xl text-[#0f172a]">Customer Satisfaction</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                    Quality is our signature. We conduct regular performance audits and welcome your feedback 
                    after every visit. If you are ever unsatisfied with a specific area of your clean, 
                    we will return within 24 hours to rectify it at no additional cost.
                </p>
            </div>
        </div>
      </section>

      {/* --- THE MAINTENANCE CHECKLIST (Detailed Grid) --- */}
      <section className="bg-white py-20 px-6 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl text-[#0f172a] text-center mb-16">The Signature Checklist</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
                {/* Kitchen & Dining */}
                <div className="bg-[#faf9f6] p-8 rounded-2xl border-t-4 border-[#0f172a]">
                    <h3 className="font-serif text-2xl mb-6 flex items-center gap-2">
                        <GlassWater size={24} className="text-[#d4af37]"/> Kitchen
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#d4af37] mt-1"/> Scrub and sanitize sinks and backsplashes</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#d4af37] mt-1"/> Clean appliance exteriors (stove, fridge, dishwasher)</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#d4af37] mt-1"/> Wipe down microwave interior/exterior</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#d4af37] mt-1"/> Sanitize all countertops and small appliances</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#d4af37] mt-1"/> Load dishwasher or wash high-use items</li>
                    </ul>
                </div>

                {/* Bathrooms */}
                <div className="bg-[#faf9f6] p-8 rounded-2xl border-t-4 border-[#0f172a]">
                    <h3 className="font-serif text-2xl mb-6 flex items-center gap-2">
                        <Waves size={24} className="text-[#d4af37]"/> Bathrooms
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#d4af37] mt-1"/> Scrub and disinfect toilets, tubs, and showers</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#d4af37] mt-1"/> Polish mirrors, chrome fixtures, and glass</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#d4af37] mt-1"/> Clean and sanitize vanity and sinks</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#d4af37] mt-1"/> Dust light fixtures and towel racks</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#d4af37] mt-1"/> Mop floors with disinfectant</li>
                    </ul>
                </div>

                {/* Living & Sleeping Areas */}
                <div className="bg-[#faf9f6] p-8 rounded-2xl border-t-4 border-[#0f172a]">
                    <h3 className="font-serif text-2xl mb-6 flex items-center gap-2">
                        <Sparkles size={24} className="text-[#d4af37]"/> Living Areas
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#d4af37] mt-1"/> Dust all furniture, picture frames, and decor</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#d4af37] mt-1"/> Vacuum upholstery and under cushions</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#d4af37] mt-1"/> Clean glass surfaces and electronics (dusting only)</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#d4af37] mt-1"/> Remove cobwebs and dust ceiling fans</li>
                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#d4af37] mt-1"/> Straighten beds and fluff pillows</li>
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* --- ADD-ON SERVICE: WASH & FOLD (From Reference) --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-[#0f172a] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
            <div className="flex-1 p-12 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                    <Shirt className="text-[#d4af37]" size={40} />
                    <span className="text-[#d4af37] font-bold uppercase tracking-widest text-sm">Exclusive Add-on</span>
                </div>
                <h2 className="font-serif text-4xl text-white mb-6">Too Busy? Try Our <br/><span className="text-[#d4af37]">Wash & Fold</span> Service</h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                    Why spend your weekends in the laundry room? We can handle your linens, towels, 
                    and daily wear while we clean your home. Our team will wash, dry, and fold your items, 
                    leaving them neatly stacked and ready to be put away.
                </p>
                <div className="flex gap-6 items-center">
                    <div className="text-center">
                        <Clock className="text-[#d4af37] mx-auto mb-2" />
                        <span className="text-[10px] text-gray-400 uppercase font-bold">Save 3+ Hours</span>
                    </div>
                    <div className="h-10 w-[1px] bg-white/20"></div>
                    <button className="bg-white text-[#0f172a] font-bold py-3 px-8 rounded-full hover:bg-[#d4af37] transition duration-300">
                        Add to My Clean
                    </button>
                </div>
            </div>
            <div className="flex-1 relative min-h-[400px]">
                <Image 
                    src="/placeholder.jpeg"
                    alt="Freshly folded laundry"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="bg-white py-20 px-6 text-center">
        <h2 className="font-serif text-4xl text-[#0f172a] mb-6">Ready to Experience Elite Maintenance?</h2>
        <p className="text-gray-600 mb-10 max-w-xl mx-auto">
            Schedule your first cleaning today and discover why homeowners in [Your Area] 
            always leave the cleaning to the professionals.
        </p>
        <Link href="/contact" className="bg-[#0f172a] text-white font-bold py-5 px-12 rounded-full text-xl hover:bg-[#d4af37] hover:text-[#0f172a] transition duration-300 inline-block shadow-2xl">
            Request My Quote
        </Link>
      </section>

    </main>
  );
}