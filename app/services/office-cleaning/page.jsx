'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ClipboardCheck, 
  ArrowRight, 
  Stethoscope, 
  HardHat, 
  Building2, 
  ShieldCheck, 
  Zap,
  MessageSquare 
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const subServices = [
  {
    title: "Professional & Corporate Offices",
    description: "First impressions are everything. We provide discreet, high-frequency cleaning for reception areas, boardrooms, and workstations, ensuring a workspace that reflects your brand's excellence.",
    features: ["Daily/Weekly customized schedules", "High-touch surface disinfection", "Restroom & Breakroom sanitation", "Floor buffing & carpet care"],
    imagePlaceholder: "/placeholder.jpeg",
    link: "/services/office-cleaning/corporate"
  },
  {
    title: "Medical & Clinical Sanitation",
    description: "Where health is the priority, our standards are clinical. We use EPA-registered hospital-grade disinfectants to maintain waiting rooms and patient areas, following strict cross-contamination protocols.",
    features: ["Bio-hazard awareness training", "Terminal cleaning procedures", "HEPA-filter air purification", "Non-toxic, scent-free products"],
    imagePlaceholder: "/placeholder.jpeg",
    link: "/services/office-cleaning/medical"
  },
  {
    title: "Post-Construction Cleanup",
    description: "From construction site to move-in ready. We specialize in the removal of fine drywall dust, paint splatters, and adhesive residue, providing a 3-phase clean for a perfect grand opening.",
    features: ["Rough, Detail, and Final cleans", "Fine dust air scrubbing", "Window track & frame detailing", "Industrial floor scrubbing"],
    imagePlaceholder: "/placeholder.jpeg",
    link: "/services/office-cleaning/post-construction"
  },
  {
    title: "Retail & Hospitality",
    description: "Create an inviting atmosphere for your customers. We focus on high-traffic floor care, glass transparency, and odor control to ensure your storefront remains pristine 24/7.",
    features: ["Window & Glass polishing", "High-traffic floor maintenance", "Deep upholstery cleaning", "After-hours service availability"],
    imagePlaceholder: "/placeholder.jpeg",
    link: "/services/office-cleaning/retail"
  },
];

export default function OfficeCleaningPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] font-sans">
        <Navbar/>
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0f172a] text-white py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <Image 
                src="/placeholder.jpeg"
                alt="Background"
                fill
                className="object-cover"
            />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
                <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase block mb-4">Commercial Solutions</span>
                <h1 className="font-serif text-5xl md:text-6xl mb-6 leading-tight">
                    Clinical Precision for <span className="italic text-[#d4af37]">Elite Workspaces</span>.
                </h1>
                <p className="text-lg text-gray-300 max-w-xl mb-8">
                    Healthy employees are productive employees. We provide clinical-grade sanitation that protects your team and impresses your clients.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link href="#commercial-grid" className="bg-[#d4af37] text-[#0f172a] font-bold py-4 px-8 rounded-full text-lg hover:bg-white transition duration-300 text-center">
                        Explore Commercial Services
                    </Link>
                    <Link href="/contact" className="border-2 border-white text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white/10 transition duration-300 flex items-center justify-center gap-2 text-center">
                        <Building2 size={20}/> Site Survey & Quote
                    </Link>
                </div>
            </div>
             {/* Hero Image - Staff working in a professional setting */}
            <div className="flex-1 relative h-[500px] w-full hidden md:block rounded-2xl overflow-hidden shadow-2xl border-4 border-[#d4af37]/30">
                <Image 
                    src="/placeholder.jpeg"
                    alt="Commercial cleaner in uniform"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
      </section>

      {/* --- COMMERCIAL GRID --- */}
      <section id="commercial-grid" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-[#0f172a] mb-4">Built for Business</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From boutique offices to medical clinics and construction sites, we have the specialized equipment and trained staff to handle your commercial requirements.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {subServices.map((service, index) => (
                <div key={index} className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
                    <div className="relative h-64 overflow-hidden">
                        <Image 
                            src={service.imagePlaceholder}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 to-transparent"></div>
                        <h3 className="absolute bottom-6 left-6 font-serif text-3xl text-white">{service.title}</h3>
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                        <p className="text-gray-600 leading-relaxed mb-8 flex-grow">{service.description}</p>
                        
                        <div className="bg-[#faf9f6] p-6 rounded-xl mb-8">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] mb-4">Service Standards:</h4>
                            <ul className="space-y-3">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center text-gray-700">
                                        <ShieldCheck size={18} className="text-[#d4af37] mr-3 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link href={service.link} className="inline-flex items-center justify-center w-full bg-[#0f172a] text-white font-bold py-4 rounded-lg hover:bg-[#d4af37] hover:text-[#0f172a] transition duration-300">
                            Book {service.title} Survey <ArrowRight size={20} className="ml-2"/>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* --- COMMERCIAL TRUST SECTION --- */}
      <section className="bg-white py-24 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 px-4">
                <div className="text-center">
                    <div className="w-16 h-16 bg-[#F0FFFF] rounded-full flex items-center justify-center mx-auto mb-6 text-[#d4af37]">
                        <ClipboardCheck size={32} />
                    </div>
                    <h3 className="font-serif text-2xl text-[#0f172a] mb-3">Compliance & Insurance</h3>
                    <p className="text-gray-600 text-sm">Fully bonded, insured, and WSIB compliant. We provide complete peace of mind for property managers and business owners.</p>
                </div>
                <div className="text-center">
                    <div className="w-16 h-16 bg-[#F0FFFF] rounded-full flex items-center justify-center mx-auto mb-6 text-[#d4af37]">
                        <Zap size={32} />
                    </div>
                    <h3 className="font-serif text-2xl text-[#0f172a] mb-3">High-Frequency Sanitation</h3>
                    <p className="text-gray-600 text-sm">Our "Hot-Spot" protocol ensures that elevator buttons, door handles, and kitchenettes are disinfected every single visit.</p>
                </div>
                <div className="text-center">
                    <div className="w-16 h-16 bg-[#F0FFFF] rounded-full flex items-center justify-center mx-auto mb-6 text-[#d4af37]">
                        <Stethoscope size={32} />
                    </div>
                    <h3 className="font-serif text-2xl text-[#0f172a] mb-3">Clinical Grade Tools</h3>
                    <p className="text-gray-600 text-sm">We utilize industrial HEPA filtration and EPA-registered disinfectants that are safe for both staff and patients.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="bg-[#0f172a] text-white py-20 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl mb-6">Schedule Your Professional Site Survey</h2>
            <p className="text-gray-400 mb-10 italic">"Elite Polish has transformed our medical suite—consistent, professional, and thorough every night." — Local Business Partner</p>
            <Link href="/contact" className="bg-[#d4af37] text-[#0f172a] font-bold py-5 px-12 rounded-full text-xl hover:bg-white transition duration-300 inline-block shadow-2xl">
                Get a Commercial Proposal
            </Link>
          </div>
      </section>
    </main>
  );
}