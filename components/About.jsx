import Image from 'next/image';
import { Star } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
        {/* Image Side - Ensure 'cleaner.jpg' is in your /public folder */}
        <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-2xl">
          <Image
            src="/cleaner.avif"
            alt="Staff folding towels"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Content Side */}
        <div>
          <h2 className="font-serif text-4xl text-[#0f172a] mb-6">Who We are. <br/>We Curate.</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light">
            Elite Home and Business Cleaning, in Wasaga Beach, Ontario, offers exceptional cleaning services residential and commercial clients. Our skilled team ensures your space is spotless, specializing in Airbnbs, move-in and-out cleans, and deep cleaning.
          </p>
          
          <div className="bg-[#faf9f6] p-6 border-l-4 border-[#d4af37]">
            <div className="flex text-[#d4af37] mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#d4af37" />)}
            </div>
            <p className="italic text-slate-700 mb-4">
              "I didn't realize how much stress I was carrying until I walked into my home after LuxeShine had been there. It felt like a hotel."
            </p>
            <p className="font-bold text-[#0f172a]">– Sarah Jenkins, Homeowner</p>
          </div>
        </div>
      </div>
    </section>
  );
}