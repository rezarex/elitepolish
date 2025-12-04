import ServiceCard from './ServiceCard';
import { Home, AppWindow, Key } from 'lucide-react';

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-[#faf9f6] font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase">Our Expertise</span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#0f172a] mt-3">What we offer</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard 
            icon={Home}
            title="Residential Cleaning"
            desc="Comprehensive detailing for living spaces. We don't just clean; we restore balance."
            features={['Weekly Housekeeping', 'Deep Detailing', 'Aromatherapy Finish']}
          />
          <ServiceCard 
            icon={AppWindow}
            title="Office Cleaning"
            desc="Curb appeal matters. We ensure the outside is as immaculate as the inside."
            features={['Pure Water Window Cleaning', 'Gutter Maintenance', 'Pressure Washing']}
          />
          <ServiceCard 
            icon={Key}
            title="Specialty Cleaning"
            desc="Seamless move-in/out services designed for realtors and new owners."
            features={['Appliance Restoration', 'Carpet Steam Cleaning', 'Post-Construction Dust']}
          />
        </div>
      </div>
    </section>
  );
}