'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, Star, CalendarCheck, Settings, LogOut, MessageSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/reviews', icon: Star, label: 'Reviews' },
  { href: '/admin/bookings', icon: CalendarCheck, label: 'Bookings (TODO)' },
  { href: '/admin/users', icon: Users, label: 'Users (TODO)' },
  // ADDED: Live Chat Link
  { href: '/admin/chat', icon: MessageSquare, label: 'Live Chat' },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  const handleLogout = () => {
    // In a real Firebase app, this would sign out the user.
    // Since AuthGuard handles initial setup, a simple page refresh will trigger re-auth check.
    console.log("Admin Logout initiated. (Firebase signOut and redirect would occur here)");
    window.location.href = '/'; 
  };

  return (
    <div className="flex flex-col h-full bg-[#0f172a] text-white p-6 shadow-2xl">
      <div className="mb-10">
        <h1 className="text-2xl font-serif text-[#d4af37]">Elite Polish Admin</h1>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-grow space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={`flex items-center p-3 rounded-lg transition duration-200 ${
                isActive 
                  ? 'bg-[#d4af37] text-[#0f172a] font-semibold shadow-md' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Settings / Logout */}
      <div className="pt-6 border-t border-gray-800 space-y-2">
        <Link 
          href="/admin/settings"
          className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition duration-200"
        >
          <Settings size={20} className="mr-3" />
          Settings (TODO)
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center p-3 rounded-lg text-red-400 hover:bg-gray-800 transition duration-200"
        >
          <LogOut size={20} className="mr-3" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;