import React from 'react';

// Mock data for the gallery demonstrating the structure
const galleryItems = [
  {
    category: "Kitchen Detail",
    beforeUrl: "beforekitchen.png",
    afterUrl: "afterkitchen.png",
    description: "Grease and residue removed from stainless steel and grout, restoring the kitchen to its pristine condition."
  },
  {
    category: "Bathroom Restoration",
    beforeUrl: "beforebath.png",
    afterUrl: "afterbath.png",
    description: "Complete sanitation and polishing of tile, glass, and chrome fixtures for a spa-like feel."
  },
  {
    category: "Hardwood Floor Polish",
    beforeUrl: "beforefloor.png",
    afterUrl: "afterfloor.png",
    description: "Deep conditioning and polish applied to wood floors, minimizing scratches and enhancing luster."
  }
];

export default function Gallery() {
  return (
    <section className="min-h-[calc(100vh-80px)] mt-[80px] py-20 px-6 bg-white font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#d4af37] font-bold tracking-widest text-sm uppercase">The Proof is in the Polish</span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#0f172a] mt-3">Visual Transformation Gallery</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            See the dramatic difference between our standard of clean and the rest.
          </p>
        </div>

        <div className="space-y-16">
          {galleryItems.map((item, index) => (
            <div key={index} className="bg-[#faf9f6] p-4 md:p-8 rounded-xl shadow-xl">
              <h3 className="font-serif text-3xl text-[#0f172a] mb-6 text-center border-b pb-3 border-gray-200">
                {item.category}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {/* Before Image */}
                <div className="relative overflow-hidden rounded-lg shadow-lg group">
                  <img src={item.beforeUrl} alt={`${item.category} Before`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold border-2 border-white px-4 py-2">BEFORE</span>
                  </div>
                </div>

                {/* After Image */}
                <div className="relative overflow-hidden rounded-lg shadow-lg group">
                  <img src={item.afterUrl} alt={`${item.category} After`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold border-2 border-white px-4 py-2 bg-[#d4af37]/70">AFTER</span>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-center text-gray-700 italic max-w-2xl mx-auto">
                "{item.description}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}