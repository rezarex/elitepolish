'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { LayoutDashboard, Users, Calendar, Settings, Search, Edit, CheckCircle, XCircle, Clock, Loader2, MessageSquare, Star, Trash2, Rss, PlusCircle, PenTool, Eye, Zap, Save, ChevronLeft } from 'lucide-react';
import AdminDashboardOverview from './page';
import Booking from './Booking';
import { API_BASE_URL } from '@/config/config';
import Blog from './Blog';
import Livechat from './Livechat';
// --- CONFIGURATION & MOCK DATA ---

// Keeping APIs defined for future integration
const REVIEWS_API = `${API_BASE_URL}/reviews`; 
const CHAT_API = `${API_BASE_URL}/livechat`; 



const MOCK_REVIEWS = [
  { id: 'R101', client: 'Jane Doe', rating: 5, service: 'Interior Edit', date: '2025-11-29', content: 'Absolutely spotless! It felt like walking into a brand new home. The attention to detail was exceptional.', status: 'Published' },
  { id: 'R102', client: 'Mike V.', rating: 4, service: 'Exterior Refresh', date: '2025-11-25', content: 'Great window cleaning service, but the gutter cleaning was a bit pricey. Overall satisfied.', status: 'Pending' },
  { id: 'R103', client: 'Sarah K.', rating: 5, service: 'Transition', date: '2025-11-20', content: 'Our new place was sparkling clean for the move-in. Saved us a ton of stress!', status: 'Published' },
  { id: 'R104', client: 'Anonymous', rating: 2, service: 'Interior Edit', date: '2025-11-18', content: 'One room was missed. They offered to come back, but it was an inconvenience.', status: 'Archived' },
];



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

const REVIEW_STATUS_MAP = {
  Published: { color: 'text-blue-600 bg-blue-100', icon: CheckCircle },
  Pending: { color: 'text-amber-600 bg-amber-100', icon: Clock },
  Archived: { color: 'text-gray-600 bg-gray-100', icon: Trash2 },
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
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const loadReviews = async () => {
            setLoading(true);
            setError(null);
            const data = await fetchWithRetry(REVIEWS_API, MOCK_REVIEWS);
            if (data) {
                setReviews(data);
            } else {
                setError("Failed to load review data.");
            }
            setLoading(false);
        };
        loadReviews();
    }, []);

    const filteredReviews = useMemo(() => {
        return reviews.filter(review => 
            filter === 'All' || review.status === filter
        );
    }, [reviews, filter]);

    const updateReviewStatus = (id, newStatus) => {
        setReviews(prevReviews => 
            prevReviews.map(r => (r.id === id ? { ...r, status: newStatus } : r))
        );
    };

    if (loading) return <div className="p-8"><Loader2 className="animate-spin mr-3" size={24} /> Loading Reviews...</div>;
    if (error) return <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-700">Error: {error}</div>;

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             <div className="col-span-full flex space-x-2 mb-4 bg-white p-4 rounded-lg shadow-md">
                {['All', 'Pending', 'Published', 'Archived'].map(s => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                            filter === s 
                                ? 'bg-[#0f172a] text-white shadow-md' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {filteredReviews.length > 0 ? (
                filteredReviews.map(review => (
                    <div key={review.id} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#d4af37]">
                        <div className="flex justify-between items-start mb-3">
                            <div className="font-bold text-lg text-slate-800">{review.client}</div>
                            <StatusPill status={review.status} map={REVIEW_STATUS_MAP} />
                        </div>
                        <div className="flex mb-3">
                            {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} size={16} fill="#d4af37" stroke="none" className="text-[#d4af37]" />
                            ))}
                            {[...Array(5 - review.rating)].map((_, i) => (
                                <Star key={i + review.rating} size={16} className="text-gray-300" />
                            ))}
                        </div>
                        <p className="text-sm italic text-gray-700 mb-4 line-clamp-3">"{review.content}"</p>
                        <div className="text-xs text-gray-500 mb-4">
                            Service: {review.service} | Date: {review.date}
                        </div>
                        <div className="flex space-x-2 border-t pt-4">
                            <button
                                onClick={() => updateReviewStatus(review.id, 'Published')}
                                disabled={review.status === 'Published'}
                                className="flex items-center text-xs px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:opacity-50"
                            >
                                <CheckCircle size={14} className="mr-1" /> Publish
                            </button>
                            <button
                                onClick={() => updateReviewStatus(review.id, 'Archived')}
                                disabled={review.status === 'Archived'}
                                className="flex items-center text-xs px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 disabled:opacity-50"
                            >
                                <Trash2 size={14} className="mr-1" /> Archive
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-span-3 py-12 text-center text-gray-500 text-lg bg-white rounded-lg shadow-md">
                    No reviews match the current filter.
                </div>
            )}
        </div>
    );
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