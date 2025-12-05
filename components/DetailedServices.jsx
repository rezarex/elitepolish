import React from 'react';
import { Home, Briefcase, Sparkles, Clock, DollarSign } from 'lucide-react';

const detailedServices = [
  {
    icon: Home,
    title: "Residential Cleaning",
    desc: "Our signature luxury housekeeping for private homes. Includes deep cleaning of kitchens, bathrooms, and living areas.",
    duration: "1 hr 30 min",
    cost: "Starts at $150",
    key: "residence"
  },
  {
    icon: Briefcase,
    title: "Office Cleaning",
    desc: "Professional and discreet sanitation services for small to medium-sized corporate offices, optimized for after-hours scheduling.",
    duration: "1 hr",
    cost: "Starts at $120",
    key: "office"
  },
  {
    icon: Sparkles,
    title: "Specialty Cleaning",
    desc: "Tailored services for major events: post-construction debris removal, pre-sale staging, and comprehensive move-in/move-out cleans.",
    duration: "45 min",
    cost: "Starts at $100",
    key: "specialty"
  }
];

export default function DetailedServiceList() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto font-sans">
      <div className="text-center mb-16">
        <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase">Our Offerings</span>
        <h2 className="font-serif text-4xl md:text-5xl text-[#0f172a] mt-3">Comprehensive Cleaning Services</h2>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          Explore our range of curated services designed to meet the highest standards of hygiene and luxury care.
        </p>
      </div>

      <div className="space-y-12">
        {detailedServices.map((service) => (
          <div key={service.key} className="bg-white p-8 lg:p-10 shadow-xl rounded-lg grid md:grid-cols-3 gap-8 items-start border-l-4 border-[#0f172a] hover:shadow-2xl transition duration-300">
            <div className="md:col-span-1">
              <service.icon size={48} className="text-[#d4af37] mb-4" />
              <h3 className="font-serif text-3xl text-[#0f172a] mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
            
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 md:pl-8">
              <div>
                <div className="flex items-center text-[#d4af37] mb-2">
                  <Clock size={20} className="mr-2" />
                  <span className="font-bold text-sm uppercase tracking-wider">Duration</span>
                </div>
                <p className="text-xl font-semibold text-[#0f172a]">{service.duration}</p>
              </div>

              <div>
                <div className="flex items-center text-[#d4af37] mb-2">
                  <DollarSign size={20} className="mr-2" />
                  <span className="font-bold text-sm uppercase tracking-wider">Cost</span>
                </div>
                <p className="text-xl font-semibold text-[#0f172a]">{service.cost}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}