'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { LayoutDashboard, Users, Calendar, Settings, Search, Edit, CheckCircle, XCircle, Clock, Loader2, MessageSquare, Star, Trash2, Rss, PlusCircle, PenTool, Eye, Zap, Save, ChevronLeft } from 'lucide-react';
import AdminDashboardOverview from './page';
import Booking from './Booking';
import { API_BASE_URL } from '@/config/config';
import Blog from './Blog';
import Livechat from './Livechat';
import ReviewsMgt from './ReviewsManagement';
// --- CONFIGURATION & MOCK DATA ---

// Keeping APIs defined for future integration
const REVIEWS_API = `${API_BASE_URL}/reviews`; 
const CHAT_API = `${API_BASE_URL}/livechat`; 







// const MOCK_BLOG_POSTS = [
//     { id: 'P001', title: '5 Tips for Seasonal Deep Cleaning', author: 'Staff', date: '2025-12-01', status: 'Published', views: 1240 },
//     { id: 'P002', title: 'The Benefits of Professional Window Washing', author: 'Jane Admin', date: '2025-11-25', status: 'Draft', views: 12 },
//     { id: 'P003', title: 'Eco-Friendly Cleaning Products We Love', author: 'Staff', date: '2025-11-10', status: 'Published', views: 890 },
//     { id: 'P004', title: 'Moving Out? How to Ace Your Security Deposit Clean', author: 'Staff', date: '2025-10-30', status: 'Archived', views: 2500 },
// ];

const STATUS_MAP = {
  Pending: { color: 'text-amber-600 bg-amber-100', icon: Clock, button: 'bg-amber-500 hover:bg-amber-600' },
  Confirmed: { color: 'text-green-600 bg-green-100', icon: CheckCircle, button: 'bg-green-500 hover:bg-green-600' },
  Cancelled: { color: 'text-red-600 bg-red-100', icon: XCircle, button: 'bg-red-500 hover:bg-red-600' },
};



const POST_STATUS_MAP = {
  Published: { color: 'text-green-600 bg-green-100', icon: Eye },
  Draft: { color: 'text-yellow-600 bg-yellow-100', icon: PenTool },
  Archived: { color: 'text-red-600 bg-red-100', icon: Trash2 },
};

/**
 * Utility function to simulate fetching data with exponential backoff.
 */
const fetchWithRetry = async (api, mockData) => {
  const maxRetries = 3;
  let lastError = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 300)); 
      
      console.log(`Attempting to fetch data from: ${api}`);
      
      // Simulate occasional API failure to test backoff
      if (Math.random() < 0.1 && i < maxRetries - 1) { 
        throw new Error("Simulated Server Error");
      }

      return mockData.map(b => ({ ...b })); 
      
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error("Failed to fetch data after all retries:", lastError.message);
      }
    }
  }
  return null; 
};

// --- LAYOUT COMPONENTS ---

const StatusPill = ({ status, map = STATUS_MAP }) => {
  const { color, icon: Icon } = map[status] || { color: 'text-gray-500 bg-gray-200', icon: Clock };
  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${color}`}>
      <Icon size={14} className="mr-1" />
      {status}
    </span>
  );
};

// Sidebar component (from Layout folder concept)
const Sidebar = ({ currentView, setView }) => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' },
    { name: 'Bookings', icon: Calendar, view: 'bookings' },
    { name: 'Reviews', icon: Star, view: 'reviews' },
    { name: 'Live Chat', icon: MessageSquare, view: 'live-chat' },
    { name: 'Blog', icon: Rss, view: 'blog' }, 
    // { name: 'Clients', icon: Users, view: 'clients' },
    { name: 'Settings', icon: Settings, view: 'settings' },
  ];

  return (
    <div className="w-64 bg-slate-800 text-white flex flex-col p-4 shadow-xl flex-shrink-0">
      <div className="text-2xl font-serif text-[#d4af37] mb-8 p-2 border-b border-slate-700">Elite Polish Admin</div>
      <nav className="flex-grow space-y-2">
        {navItems.map(item => (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            className={`flex items-center w-full p-3 rounded-lg transition-colors font-medium ${
              currentView === item.view ? 'bg-slate-700 text-[#d4af37]' : 'hover:bg-slate-700/50 text-slate-300'
            }`}
          >
            <item.icon size={20} className="mr-3" />
            {item.name}
          </button>
        ))}
      </nav>
      <div className="text-sm text-slate-500 border-t border-slate-700 pt-4 mt-4">
        User: admin@elitepolish.ca
      </div>
    </div>
  );
};

// ContentWrapper component (from Layout folder concept - The main content area for pages)
const ContentWrapper = ({ children, title }) => (
    <main className="flex-1 overflow-y-auto">
        <header className="p-6 bg-white shadow-sm sticky top-0 z-10 border-b border-gray-200">
            <h1 className="text-2xl md:text-3xl font-serif text-[#0f172a]">{title}</h1>
        </header>
        <div className="p-8 bg-gray-50 min-h-[calc(100%-68px)]">
            {children}
        </div>
    </main>
);

// --- PAGE COMPONENTS (Children concept) ---

// Bookings Page (Unchanged)
const BookingsDashboard = () => {
    return (
      <div>
        <Booking/>
      </div>
  )
};

// Reviews Page (Unchanged)
const ReviewsManagement = () => {
return (
  <>
   <ReviewsMgt/>
  </>
)
};

// Live Chat Page (Unchanged)
const LiveChat = () => {
return (
  <>
    <Livechat/>
  </>
)
};

// --- Blog Sub-components ---




// Blog Page (UPDATED)
const BlogManagement = () => {
  return (
    <div>
        <Blog/>
    </div>
  )
};

// Placeholder Pages (Unchanged)
const PlaceholderPage = ({ title }) => (
    <div className="flex items-center justify-center h-[calc(100vh-140px)] bg-white rounded-lg shadow-md">
        <p className="text-xl text-gray-500 font-semibold">{title} Content Coming Soon...</p>
    </div>
);


const DashboardPage = () => {
  return (
    <div>
      <AdminDashboardOverview/>
    </div>
  )
}


// --- Main Admin Panel App (Layout Orchestration) ---

export default function AdminApp() {
  const [isAuth, setIsAuth] = useState(true);
  const [currentView, setCurrentView] = useState('blog'); 

  // Mapping views to their corresponding component and title
  const VIEW_MAP = {
    'dashboard': { component: DashboardPage, title: 'Dashboard Overview' },
    'bookings': { component: BookingsDashboard, title: 'Booking Management' },
    'reviews': { component: ReviewsManagement, title: 'Client Reviews' },
    'live-chat': { component: LiveChat, title: 'Live Customer Support' },
    'blog': { component: BlogManagement, title: 'Blog Content' },
    // 'clients': { component: PlaceholderPage, title: 'Client Database' },
    'settings': { component: PlaceholderPage, title: 'Application Settings' },
  };

  const { component: CurrentComponent, title: pageTitle } = VIEW_MAP[currentView] || VIEW_MAP['bookings'];

  if (!isAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100 font-sans">
        <div className="p-8 bg-white shadow-xl rounded-lg w-96 text-center">
          <h2 className="text-3xl font-serif text-[#0f172a] mb-6">Admin Login</h2>
          <p className="text-sm text-gray-500 mb-4">Simulated Auth: Click to proceed.</p>
          <button 
            onClick={() => setIsAuth(true)}
            className="w-full bg-[#0f172a] hover:bg-slate-700 text-white p-3 rounded-md font-bold transition"
          >
            Log In (Simulated)
          </button>
        </div>
      </div>
    );
  }

  // The main layout combines the Sidebar and the ContentWrapper, 
  // with the CurrentComponent being loaded as a "child" inside the ContentWrapper.
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <ContentWrapper title={pageTitle}>
        <CurrentComponent title={pageTitle} />
      </ContentWrapper>
    </div>
  );
}