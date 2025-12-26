'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // If scrolling down, hide navbar. If scrolling up, show navbar.
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 bg-[#F0FFFF]/80 backdrop-blur-md text-gray-800 shadow-lg font-sans transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="hover:text-[#d4af37] transition">
          <Image src="/logo.png" alt="Logo" width={60} height={20} />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm tracking-wide">
          <Link href="/gallery" className="hover:text-[#d4af37] transition">GALLERY</Link>
          <Link href="/services" className="hover:text-[#d4af37] transition">SERVICES</Link>
          <Link href="/contact" className="hover:text-[#d4af37] transition">CONTACT</Link>
          <Link href="/blog" className="hover:text-[#d4af37] transition">BLOG</Link>
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
      {isOpen && (isVisible) && (
        <div className="md:hidden bg-white p-4 space-y-4 text-center border-t border-gray-200">
          <Link href="/gallery" className="block hover:text-[#d4af37]" onClick={() => setIsOpen(false)}>Gallery</Link>
          <Link href="/services" className="block hover:text-[#d4af37]" onClick={() => setIsOpen(false)}>Services</Link>
          <button className="w-full bg-[#d4af37] text-white py-3 mt-4 rounded-sm font-bold">Book Now</button>
        </div>
      )}
    </nav>
  );
}