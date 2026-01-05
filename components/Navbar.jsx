'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const serviceCategories = [
    {
      title: 'House Cleaning',
      path: '/services/house-cleaning',
      subs: ['Standard Maintenance', 'Deep Cleaning', 'Airbnb Turnovers', 'move-in-move-out']
    },
    {
      title: 'Office Cleaning',
      path: '/services/office-cleaning',
      subs: ['Medical & Professional', 'Post-Construction']
    },
    {
      title: 'Specialty & Handywork',
      path: '/services/specialty',
      subs: ['Pressure Washing', 'Gutter & Roof Care', 'Handyman Services']
    }
  ];

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
        <div className="hidden md:flex gap-8 text-sm tracking-wide items-center">
          <Link href="/gallery" className="hover:text-[#d4af37] transition font-semibold">GALLERY</Link>
          
          {/* Services Dropdown */}
          <div className="relative group py-2">
            <Link href="/services" className="hover:text-[#d4af37] transition font-semibold flex items-center gap-1">
              SERVICES <ChevronDown size={14} />
            </Link>
            
            {/* Mega Dropdown Menu */}
            <div className="absolute left-0 top-full hidden group-hover:block w-[600px] bg-white shadow-xl border-t-2 border-[#d4af37] p-6 rounded-b-sm">
              <div className="grid grid-cols-3 gap-6">
                {serviceCategories.map((cat) => (
                  <div key={cat.title}>
                    <Link href={cat.path} className="font-bold text-[#d4af37] block mb-2 hover:underline">
                      {cat.title.toUpperCase()}
                    </Link>
                    <ul className="space-y-2">
                      {cat.subs.map((sub) => (
                        <li key={sub}>
                          <Link 
                            href={`${cat.path}/${sub.toLowerCase().replace(/\s+/g, '-')}`} 
                            className="text-gray-600 hover:text-black transition text-xs"
                          >
                            {sub}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link href="/contact" className="hover:text-[#d4af37] transition font-semibold">CONTACT</Link>
          <Link href="/blog" className="hover:text-[#d4af37] transition font-semibold">BLOG</Link>
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
        <div className="md:hidden bg-white p-4 space-y-4 border-t border-gray-200 max-h-[80vh] overflow-y-auto">
          <Link href="/gallery" className="block hover:text-[#d4af37] font-semibold" onClick={() => setIsOpen(false)}>Gallery</Link>
          
          <div className="space-y-2">
            <p className="text-[#d4af37] font-bold text-xs tracking-widest uppercase">Our Services</p>
            {serviceCategories.map((cat) => (
              <div key={cat.title} className="pl-2">
                <Link href={cat.path} className="block font-semibold py-1 text-sm" onClick={() => setIsOpen(false)}>{cat.title}</Link>
                <div className="grid grid-cols-1 pl-4 border-l border-gray-100">
                  {cat.subs.map((sub) => (
                    <Link 
                      key={sub} 
                      href={`${cat.path}/${sub.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="py-1 text-xs text-gray-500"
                      onClick={() => setIsOpen(false)}
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Link href="/contact" className="block hover:text-[#d4af37] font-semibold" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link href="/blog" className="block hover:text-[#d4af37] font-semibold" onClick={() => setIsOpen(false)}>Blog</Link>
          <button className="w-full bg-[#d4af37] text-white py-3 mt-4 rounded-sm font-bold">Book Now</button>
        </div>
      )}
    </nav>
  );
}