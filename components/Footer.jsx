import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F0FFFF] text-gray-500 py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-12 border-b border-gray-800 pb-12">
        <div className="col-span-1 md:col-span-2">
          <Image src="/logo.png" alt="Logo" width={150} height={40} />
          <p className="text-gray-400 max-w-sm">
            Redefining luxury home care with eco-friendly products, vetted professionals, and an obsession with detail.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4">Contact</h4>
          <div className="space-y-3 text-gray-400 text-sm">
            <p className="flex items-center gap-2"><Phone size={16} /> (555) 123-4567</p>
            <p className="flex items-center gap-2"><Mail size={16} /> concierge@elitepolish.ca</p>
            <p className="flex items-center gap-2"><MapPin size={16} /> Toronto, ON</p>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4">Service Area</h4>
          <div className="space-y-2 text-gray-400 text-sm">
            <p>Downtown Core</p>
            <p>The Beaches</p>
            <p>North York</p>
            <p>Rosedale</p>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Elite Polish. All rights reserved.</p>
      </div>
    </footer>
  );
}