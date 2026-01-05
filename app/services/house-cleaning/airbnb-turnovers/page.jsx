'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Star, 
  RefreshCcw, 
  Camera, 
  Shirt, 
  ShieldCheck, 
  Calendar,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function AirbnbTurnoverPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] font-sans">
        <Navbar/>
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0f172a] text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#d4af37]/5 hidden lg:block skew-x-12"></div>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="z-10">
                <div className="flex items-center gap-2 mb-4">
                    <Star className="text-[#d4af37]" size={20} fill="#d4af37" />
                    <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase">Host Partner Program</span>
                </div>
                <h1 className="font-serif text-5xl md:text-7xl mb-6">5-Star <span className="italic">Hospitality</span> Standard</h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed font-light">
                    We don't just clean; we stage. Our turnover specialists are trained in hotel-standard hospitality, 
                    ensuring every guest enters a "photo-ready" environment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/contact" className="bg-[#d4af37] text-[#0f172a] font-bold py-4 px-10 rounded-full hover:bg-white transition duration-300 text-center shadow-xl">
                        Become a Partner
                    </Link>
                </div>
            </div>
            <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/5">
                <Image 
                    src="/placeholder.jpeg"
                    alt="Airbnb Guest Bedroom"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
      </section>

      {/* --- HOST BENEFITS --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <Camera className="text-[#d4af37] mb-6" size={36} />
                <h3 className="font-serif text-2xl mb-3">Photo Verification</h3>
                <p className="text-gray-600 text-sm">Receive timestamped photos of your property after every clean, giving you peace of mind from anywhere in the world.</p>
            </div>
            <div className="p-10 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <RefreshCcw className="text-[#d4af37] mb-6" size={36} />
                <h3 className="font-serif text-2xl mb-3">Same-Day Turnovers</h3>
                <p className="text-gray-600 text-sm">Our team is optimized for the 11am-4pm window, ensuring your property is ready for back-to-back bookings.</p>
            </div>
            <div className="p-10 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <ShieldCheck className="text-[#d4af37] mb-6" size={36} />
                <h3 className="font-serif text-2xl mb-3">Damage Reporting</h3>
                <p className="text-gray-600 text-sm">We act as your eyes on the ground, immediately reporting any guest damages or maintenance needs.</p>
            </div>
        </div>
      </section>

      {/* --- THE HOST CHECKLIST --- */}
      <section className="bg-[#faf9f6] py-24 px-6 border-y border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
                <h2 className="font-serif text-4xl text-[#0f172a] mb-8">The Elite Hospitality Checklist</h2>
                <div className="space-y-8">
                    <div className="flex gap-4">
                        <div className="bg-[#0f172a] text-[#d4af37] w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                        <div>
                            <h4 className="font-bold text-[#0f172a] mb-1">Linens & Laundry</h4>
                            <p className="text-gray-600 text-sm">On-site laundry of towels and bedsheets, or off-site service for high-volume units.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-[#0f172a] text-[#d4af37] w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                        <div>
                            <h4 className="font-bold text-[#0f172a] mb-1">Staging & Presentation</h4>
                            <p className="text-gray-600 text-sm">Pillow fluffing, towel folding, and guest basket arrangement for that "Wow" factor.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-[#0f172a] text-[#d4af37] w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                        <div>
                            <h4 className="font-bold text-[#0f172a] mb-1">Essential Restocking</h4>
                            <p className="text-gray-600 text-sm">Replenishment of soaps, coffee, toilet paper, and other guest consumables.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-[#0f172a] p-12 rounded-[2rem] text-white shadow-2xl">
                <h3 className="font-serif text-3xl mb-6 text-[#d4af37]">Recurring Host Rates</h3>
                <p className="text-gray-400 mb-8 font-light">We offer tiered pricing for multi-unit owners and high-occupancy rentals.</p>
                <ul className="space-y-4 mb-10">
                    <li className="flex justify-between border-b border-white/10 pb-2">
                        <span>Studio / 1-Bedroom</span>
                        <span className="font-bold">$[Price]+</span>
                    </li>
                    <li className="flex justify-between border-b border-white/10 pb-2">
                        <span>2-3 Bedroom Home</span>
                        <span className="font-bold">$[Price]+</span>
                    </li>
                    <li className="flex justify-between border-b border-white/10 pb-2">
                        <span>Luxury Estates</span>
                        <span className="font-bold">Custom</span>
                    </li>
                </ul>
                <button className="w-full bg-[#d4af37] text-[#0f172a] font-bold py-4 rounded-xl hover:bg-white transition duration-300">
                    Get My Host Pricing
                </button>
            </div>
        </div>
      </section>

      {/* --- REVIEWS CTA --- */}
      <section className="py-24 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-serif text-4xl text-[#0f172a] mb-6">Drive 5-Star Reviews</h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
                "Since switching to Elite Polish, my cleaning score has been a perfect 5.0. 
                They are the most reliable partner I've had in 3 years of hosting." 
                — <span className="font-bold text-[#0f172a]">Sarah M., Superhost</span>
            </p>
            <Link href="/contact" className="inline-flex items-center text-[#d4af37] font-bold text-lg hover:underline">
                Let's discuss your properties <ChevronRight size={20} />
            </Link>
          </div>
      </section>
    </main>
  );
}