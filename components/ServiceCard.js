import { CheckCircle } from 'lucide-react';

export default function ServiceCard({ icon: Icon, title, desc, features }) {
  return (
    <div className="bg-white p-8 shadow-lg hover:shadow-2xl transition duration-500 border-t-2 border-transparent hover:border-[#d4af37] group rounded-sm">
      <div className="bg-[#0f172a] w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#d4af37] transition duration-300">
        <Icon className="text-white" size={24} />
      </div>
      <h3 className="font-serif text-2xl text-[#0f172a] mb-4">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{desc}</p>
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
            <CheckCircle size={16} className="text-[#d4af37]" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
