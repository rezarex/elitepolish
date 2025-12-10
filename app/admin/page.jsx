import React from 'react';
import { Users, Star, CalendarCheck, MessageSquare } from 'lucide-react';

// Mock stats - integrate with your NodeJS/MongoDB API endpoints here
const stats = [
  { label: 'New Bookings (7d)', value: '18', icon: CalendarCheck, color: 'bg-green-100 text-green-700' },
  { label: 'Pending Reviews', value: '7', icon: Star, color: 'bg-yellow-100 text-yellow-700', link: '/admin/reviews' },
  { label: 'Active Users', value: '452', icon: Users, color: 'bg-blue-100 text-blue-700' },
  { label: 'New Messages (24h)', value: '3', icon: MessageSquare, color: 'bg-red-100 text-red-700' },
];

export default function AdminDashboardOverview() {
  return (
    <div className="font-sans">
      <header className="mb-10">
        <h1 className="text-4xl font-serif text-[#0f172a] mb-2">Welcome, Elite Polish Admin</h1>
        <p className="text-gray-600">Quick view of key operational metrics.</p>
      </header>
      
      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300">
            <div className={`p-2 rounded-full w-fit mb-4 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</p>
            <h2 className="text-3xl font-bold text-[#0f172a] mt-1">{stat.value}</h2>
            {stat.link && (
                <a href={stat.link} className="text-[#d4af37] text-sm font-medium mt-2 block hover:underline">
                    View Details &rarr;
                </a>
            )}
          </div>
        ))}
      </div>

      {/* Recent Activity/System Status */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-serif text-[#0f172a] mb-4">Recent Bookings (Last 3)</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                <span>Residential Cleaning - M. Davis</span>
                <span className="text-sm font-medium text-green-600">Pending</span>
            </li>
            <li className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                <span>Office Cleaning - S. Chen</span>
                <span className="text-sm font-medium text-blue-600">Confirmed</span>
            </li>
            <li className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                <span>Specialty Cleaning- J. Patel</span>
                <span className="text-sm font-medium text-red-600">Canceled</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-serif text-[#0f172a] mb-4">System Notifications</h3>
          <ul className="space-y-3 text-gray-700 text-sm">
            <li className="p-3 bg-yellow-50 rounded-lg">New review pending moderation.</li>
            <li className="p-3 bg-blue-50 rounded-lg">Database backup completed successfully (02:00 AM).</li>
            <li className="p-3 bg-red-50 rounded-lg">High usage alert: Check API limits.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}