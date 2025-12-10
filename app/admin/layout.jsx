'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { LayoutDashboard, Users, Calendar, Settings, Search, Edit, CheckCircle, XCircle, Clock, Loader2, MessageSquare, Star, Trash2, Rss, PlusCircle, PenTool, Eye, Zap, Save, ChevronLeft } from 'lucide-react';
import AdminDashboardOverview from './page';

// --- CONFIGURATION & MOCK DATA ---
const API_BASE_URL = 'http://localhost:3000'; 
const BOOKINGS_API = `${API_BASE_URL}/api/bookings`; // Keeping APIs defined for future integration
const REVIEWS_API = `${API_BASE_URL}/api/reviews`; 
const CHAT_API = `${API_BASE_URL}/api/livechat`; 
const BLOG_API = `${API_BASE_URL}/api/blog`; 

const MOCK_BOOKINGS = [
  { id: 'B001', name: 'Alice Johnson', service: 'The Interior Edit', date: '2025-12-15', time: '9:00 AM - 12:00 PM', status: 'Pending', phone: '555-1001', address: '123 King St W' },
  { id: 'B002', name: 'Robert Smith', service: 'The Exterior Refresh', date: '2025-12-17', time: '12:00 PM - 3:00 PM', status: 'Confirmed', phone: '555-1002', address: '45 Lake Shore Blvd' },
  { id: 'B003', name: 'Sarah Chen', service: 'The Transition', date: '2025-12-18', time: '3:00 PM - 6:00 PM', status: 'Pending', phone: '555-1003', address: '789 Queen St E' },
  { id: 'B004', name: 'David Lee', service: 'The Interior Edit', date: '2025-12-20', time: '9:00 AM - 12:00 PM', status: 'Cancelled', phone: '555-1004', address: '10 Yonge St' },
  { id: 'B005', name: 'Emily White', service: 'The Transition', date: '2025-12-22', time: '12:00 PM - 3:00 PM', status: 'Confirmed', phone: '555-1005', address: '99 Bay St' },
];

const MOCK_REVIEWS = [
  { id: 'R101', client: 'Jane Doe', rating: 5, service: 'Interior Edit', date: '2025-11-29', content: 'Absolutely spotless! It felt like walking into a brand new home. The attention to detail was exceptional.', status: 'Published' },
  { id: 'R102', client: 'Mike V.', rating: 4, service: 'Exterior Refresh', date: '2025-11-25', content: 'Great window cleaning service, but the gutter cleaning was a bit pricey. Overall satisfied.', status: 'Pending' },
  { id: 'R103', client: 'Sarah K.', rating: 5, service: 'Transition', date: '2025-11-20', content: 'Our new place was sparkling clean for the move-in. Saved us a ton of stress!', status: 'Published' },
  { id: 'R104', client: 'Anonymous', rating: 2, service: 'Interior Edit', date: '2025-11-18', content: 'One room was missed. They offered to come back, but it was an inconvenience.', status: 'Archived' },
];

const MOCK_CHATS = [
    { id: 'C001', client: 'Alex B.', lastMessage: 'Is weekend service available?', time: '10:30 AM', unread: 2, messages: [{ sender: 'client', text: 'Hi, I saw your services online. Are you available for a full home clean this Saturday?', time: '10:28 AM' }, { sender: 'admin', text: 'Hello Alex! We have a few slots available. What size is your home?', time: '10:30 AM' }, { sender: 'client', text: 'Is weekend service available?', time: '10:30 AM' }] },
    { id: 'C002', client: 'Priya L.', lastMessage: 'Need to change my booking date.', time: 'Yesterday', unread: 0, messages: [{ sender: 'client', text: 'I need to reschedule my Transition clean from Friday to Monday. Is that possible?', time: 'Yesterday' }, { sender: 'admin', text: 'Let me check our availability for Monday. I will get back to you shortly!', time: 'Yesterday' }] },
    { id: 'C003', client: 'Guest 123', lastMessage: 'What are your prices?', time: '1 hour ago', unread: 1, messages: [{ sender: 'client', text: 'What are your prices?', time: '1 hour ago' }] },
];

const MOCK_BLOG_POSTS = [
    { id: 'P001', title: '5 Tips for Seasonal Deep Cleaning', author: 'Staff', date: '2025-12-01', status: 'Published', views: 1240 },
    { id: 'P002', title: 'The Benefits of Professional Window Washing', author: 'Jane Admin', date: '2025-11-25', status: 'Draft', views: 12 },
    { id: 'P003', title: 'Eco-Friendly Cleaning Products We Love', author: 'Staff', date: '2025-11-10', status: 'Published', views: 890 },
    { id: 'P004', title: 'Moving Out? How to Ace Your Security Deposit Clean', author: 'Staff', date: '2025-10-30', status: 'Archived', views: 2500 },
];

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
    // ... (State and useEffect remain the same for data fetching)
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      const loadBookings = async () => {
        setLoading(true);
        setError(null);
        const data = await fetchWithRetry(BOOKINGS_API, MOCK_BOOKINGS);
        if (data) {
          setBookings(data);
        } else {
          setError("Failed to load booking data. Check console for details.");
        }
        setLoading(false);
      };
      loadBookings();
    }, []);
  
    const filteredBookings = useMemo(() => {
      return bookings.filter(booking => {
        const statusMatch = filter === 'All' || booking.status === filter;
        const searchMatch = searchTerm === '' ||
          booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.id.toLowerCase().includes(searchTerm.toLowerCase());
        return statusMatch && searchMatch;
      }).sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [bookings, filter, searchTerm]);
  
    const updateBookingStatus = (id, newStatus) => {
      setBookings(prevBookings => 
        prevBookings.map(b => (b.id === id ? { ...b, status: newStatus } : b))
      );
    };

    if (loading) {
      return (
        <div className="flex items-center justify-center h-full min-h-60 p-8 text-slate-600">
          <Loader2 className="animate-spin mr-3" size={24} />
          <p className="font-semibold">Loading Bookings...</p>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-700">
          <h4 className="font-bold">Data Load Error</h4>
          <p className="text-sm">{error}</p>
        </div>
      );
    }

    return (
      <>
        <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white p-4 rounded-lg shadow-md">
          <div className="relative flex-grow">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Client, Service, or ID..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-[#d4af37] focus:border-[#d4af37]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2 flex-wrap">
            {['All', 'Pending', 'Confirmed', 'Cancelled'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === s 
                    ? 'bg-[#d4af37] text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['ID', 'Client', 'Service', 'Date/Time', 'Status', 'Actions'].map(header => (
                  <th 
                    key={header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.length > 0 ? (
                filteredBookings.map(booking => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-800">{booking.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{booking.name}</div>
                      <div className="text-xs text-gray-500">{booking.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.service}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div className="font-medium">{booking.date}</div>
                      <div className="text-xs text-gray-500">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusPill status={booking.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          title="Confirm Booking"
                          onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                          disabled={booking.status === 'Confirmed'}
                          className="p-1 rounded-full text-green-600 hover:bg-green-100 disabled:opacity-50"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button
                          title="Cancel Booking"
                          onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                          disabled={booking.status === 'Cancelled'}
                          className="p-1 rounded-full text-red-600 hover:bg-red-100 disabled:opacity-50"
                        >
                          <XCircle size={18} />
                        </button>
                        <button
                          title="Edit Details"
                          className="p-1 rounded-full text-blue-600 hover:bg-blue-100"
                        >
                          <Edit size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-500 text-lg">
                    No bookings match the current filter/search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
            Total Bookings: <span className="font-bold">{bookings.length}</span> | 
            Showing: <span className="font-bold">{filteredBookings.length}</span>
        </div>
      </>
    );
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
    const [chats, setChats] = useState(MOCK_CHATS); 
    const [selectedChat, setSelectedChat] = useState(MOCK_CHATS[0]);
    const [messageInput, setMessageInput] = useState('');
    
    useEffect(() => {
      // API call to fetch chat list in a real app
      if (chats.length > 0) {
        setSelectedChat(chats[0]);
      }
    }, [chats]);

    const handleSendMessage = () => {
        if (!messageInput.trim()) return;

        const newMessage = {
            sender: 'admin',
            text: messageInput.trim(),
            time: 'Just now',
        };

        const newChats = chats.map(chat => {
            if (chat.id === selectedChat.id) {
                const newMessages = [...chat.messages, newMessage];
                return { ...chat, messages: newMessages, lastMessage: newMessage.text, unread: 0 };
            }
            return chat;
        });
        
        setChats(newChats);
        setSelectedChat(prevChat => ({
            ...prevChat,
            messages: [...prevChat.messages, newMessage],
            lastMessage: newMessage.text,
            unread: 0,
        }));

        setMessageInput('');
        
        const chatWindow = document.getElementById('chat-messages');
        if (chatWindow) {
            // Wait for DOM update, then scroll
            setTimeout(() => {
                chatWindow.scrollTop = chatWindow.scrollHeight;
            }, 0);
        }
    };

    const ChatMessage = ({ message }) => (
        <div className={`flex mb-4 ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl shadow-md ${
                message.sender === 'admin' 
                    ? 'bg-[#d4af37] text-white rounded-tr-none' 
                    : 'bg-gray-200 text-slate-800 rounded-tl-none'
            }`}>
                <p className="text-sm">{message.text}</p>
                <span className={`block text-xs mt-1 ${message.sender === 'admin' ? 'text-white/80' : 'text-gray-500'}`}>{message.time}</span>
            </div>
        </div>
    );

    return (
        <div className="flex h-[calc(100vh-100px)] overflow-hidden rounded-lg shadow-xl bg-white">
            {/* Conversation List Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-serif text-[#0f172a] font-bold">Conversations</h2>
                </div>
                <div className="overflow-y-auto h-full pb-32">
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(chat)}
                            className={`p-4 cursor-pointer border-b border-gray-100 transition-colors ${
                                selectedChat?.id === chat.id ? 'bg-[#fcf8e5] border-l-4 border-[#d4af37]' : 'hover:bg-gray-50'
                            }`}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-slate-900">{chat.client}</span>
                                {chat.unread > 0 && (
                                    <span className="text-xs bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full">
                                        {chat.unread}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                            <span className="text-xs text-gray-400">{chat.time}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-gray-50">
                {selectedChat ? (
                    <>
                        {/* Messages */}
                        <div id="chat-messages" className="flex-1 overflow-y-auto p-6 space-y-4">
                            {selectedChat.messages.map((msg, index) => (
                                <ChatMessage key={index} message={msg} />
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t">
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Type your reply here..."
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-[#d4af37] focus:border-[#d4af37] focus:outline-none"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="bg-[#0f172a] hover:bg-slate-700 text-white p-3 rounded-r-lg font-bold flex items-center justify-center transition disabled:opacity-50"
                                    disabled={!messageInput.trim()}
                                >
                                    <Zap size={20} className="mr-1" /> Send
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Select a conversation to start chatting.
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Blog Sub-components ---

const NewPostForm = ({ newPost, setNewPost, handleFormSubmit, onCancel }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPost(prev => ({ ...prev, [name]: value }));
    };

    const isFormValid = newPost.title.trim() !== '' && newPost.content.trim() !== '';

    return (
        <form onSubmit={handleFormSubmit} className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-serif text-slate-800 mb-6 border-b pb-3 flex items-center">
                <PenTool size={24} className="mr-3 text-[#d4af37]" /> Create New Blog Post
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={newPost.title}
                        onChange={handleChange}
                        placeholder="e.g., 5 Tips for Seasonal Deep Cleaning"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#d4af37] focus:border-[#d4af37]"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={newPost.author}
                        onChange={handleChange}
                        placeholder="Admin Name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#d4af37] focus:border-[#d4af37]"
                        required
                    />
                </div>
            </div>

            <div className="mb-6">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                    id="status"
                    name="status"
                    value={newPost.status}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#d4af37] focus:border-[#d4af37]"
                >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                </select>
            </div>

            <div className="mb-8">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Post Content (Markdown supported)</label>
                <textarea
                    id="content"
                    name="content"
                    value={newPost.content}
                    onChange={handleChange}
                    rows="10"
                    placeholder="Start writing your compelling blog post here..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#d4af37] focus:border-[#d4af37]"
                    required
                ></textarea>
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
                >
                    <ChevronLeft size={18} className="mr-2" /> Back to Posts
                </button>
                <button
                    type="submit"
                    disabled={!isFormValid}
                    className="flex items-center px-6 py-2 bg-[#0f172a] text-white rounded-lg font-medium hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                    <Save size={18} className="mr-2" /> Save {newPost.status}
                </button>
            </div>
        </form>
    );
};


// Blog Page (UPDATED)
const BlogManagement = () => {
    const [posts, setPosts] = useState(MOCK_BLOG_POSTS);
    const [loading, setLoading] = useState(false); // Mock data is already set, so setting to false
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newPost, setNewPost] = useState({
        title: '',
        author: 'Jane Admin', // Default author for new posts
        content: '',
        status: 'Draft'
    });
    
    // Simulating initial load (can remove the loadPosts logic if using MOCK data directly)
    useEffect(() => {
        setLoading(true);
        // Simulate a quick fetch
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    const filteredPosts = useMemo(() => {
        return posts.filter(post => 
            filter === 'All' || post.status === filter
        ).sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [posts, filter]);

    const updatePostStatus = (id, newStatus) => {
        setPosts(prevPosts => 
            prevPosts.map(p => (p.id === id ? { ...p, status: newStatus } : p))
        );
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!newPost.title.trim() || !newPost.content.trim()) return;

        const postToAdd = {
            id: `P${String(posts.length + 1).padStart(3, '0')}`,
            ...newPost,
            date: new Date().toISOString().split('T')[0],
            views: 0,
        };

        setPosts(prevPosts => [postToAdd, ...prevPosts]);
        
        // Reset form and close
        setNewPost({ title: '', author: 'Jane Admin', content: '', status: 'Draft' });
        setIsFormOpen(false);
    };

    if (loading) return <div className="flex items-center justify-center h-full min-h-60 p-8 text-slate-600"><Loader2 className="animate-spin mr-3" size={24} /> Loading Blog Posts...</div>;
    if (error) return <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-700">Error: {error}</div>;

    if (isFormOpen) {
        return (
            <NewPostForm
                newPost={newPost}
                setNewPost={setNewPost}
                handleFormSubmit={handleFormSubmit}
                onCancel={() => {
                    setIsFormOpen(false);
                    // Reset new post data if cancelled
                    setNewPost({ title: '', author: 'Jane Admin', content: '', status: 'Draft' });
                }}
            />
        );
    }

    return (
        <>
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
                <div className="flex space-x-2 flex-wrap">
                    {['All', 'Published', 'Draft', 'Archived'].map(s => (
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
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center px-4 py-2 bg-[#d4af37] text-white rounded-lg font-medium hover:bg-[#c0a030] transition shadow-md"
                >
                    <PlusCircle size={18} className="mr-2" /> New Post
                </button>
            </div>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Title', 'Author', 'Date', 'Status', 'Views', 'Actions'].map(header => (
                                <th 
                                    key={header}
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map(post => (
                                <tr key={post.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-800">{post.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{post.author}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{post.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusPill status={post.status} map={POST_STATUS_MAP} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{post.views.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                title="Edit Post"
                                                className="p-1 rounded-full text-blue-600 hover:bg-blue-100"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            {post.status !== 'Published' && (
                                                <button
                                                    title="Publish"
                                                    onClick={() => updatePostStatus(post.id, 'Published')}
                                                    className="p-1 rounded-full text-green-600 hover:bg-green-100"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            )}
                                            {post.status !== 'Archived' && (
                                                <button
                                                    title="Archive"
                                                    onClick={() => updatePostStatus(post.id, 'Archived')}
                                                    className="p-1 rounded-full text-red-600 hover:bg-red-100"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-12 text-center text-gray-500 text-lg">
                                    No posts match the current filter.
                                
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
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