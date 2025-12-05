'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#F0FFFF] opacity-50 text-gray-800 shadow-lg font-sans">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="hover:text-[#d4af37] transition">
          <Image  src="/logo.png" alt="Logo" width={60} height={20} />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm tracking-wide">
          <Link href="/gallery" className="hover:text-[#d4af37] transition">GALLERY</Link>
          <Link href="/services" className="hover:text-[#d4af37] transition">SERVICES</Link>
          <Link href="/contact" className="hover:text-[#d4af37] transition">CONTACT</Link>
        </div>

        {/* CTA Button */}
        <button className="hidden md:block border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-white px-6 py-2 rounded-sm text-sm font-semibold transition duration-300">
          SCHEDULE CLEANING
        </button>

        {/* Mobile Menu Icon */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#1e293b] p-4 space-y-4 text-center border-t border-slate-700">
          <Link href="#services" className="block hover:text-[#d4af37]" onClick={() => setIsOpen(false)}>Collections</Link>
          <Link href="#about" className="block hover:text-[#d4af37]" onClick={() => setIsOpen(false)}>Standards</Link>
          <button className="w-full bg-[#d4af37] text-white py-3 mt-4 rounded-sm font-bold">Book Now</button>
        </div>
      )}
    </nav>
  );
}