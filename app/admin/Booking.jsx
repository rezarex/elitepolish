import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
// Import only the necessary icons for buttons and loading
import { Search, Loader2, CheckCircle, XCircle, Edit } from 'lucide-react'; 

// Import shared files
import StatusPill from './StatusPill';
import { STATUSES } from './StatusConstants';

// Assuming API_BASE_URL is defined somewhere accessible, like a config file or environment
// In this case, we'll keep the direct definition as in your original code:
import { API_BASE_URL } from '@/config/config';

const BOOKINGS_API = `${API_BASE_URL}/booking`; 
const UPDATE_BOOKING = `${API_BASE_URL}/booking/edit/{id}`
const DELETE_BOOKING = `${API_BASE_URL}/booking/delete/{id}`


// --- API UTILITY FUNCTIONS (No Change) ---
const apiCall = async (url, method = 'GET', body = null) => {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };
    if (body) {
        options.body = JSON.stringify(body);
    }
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP error! Status: ${response.status}` }));
        throw new Error(errorData.message || `API call failed with status: ${response.status}`);
    }
    return response.status === 204 ? null : response.json();
};

const fetchBookings = async () => {
    const MAX_RETRIES = 3;
    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            const response = await fetch(BOOKINGS_API);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Data Mapping Transformation
            const mappedData = data.map((item, index) => ({
                No: index + 1,              
                id: item._id,               
                name: item.name,
                service: item.service,
                phone: item.phone,
                status: item.status,
                date: item.bookingDate,     
                time: item.timeslot,        
                address: item.address,
                createdAt: item.createdAt,
            }));
            
            return mappedData;

        } catch (err) {
            console.error(`Attempt ${i + 1} failed:`, err);
            if (i === MAX_RETRIES - 1) {
                throw new Error("Failed to fetch booking data after multiple attempts.");
            }
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); 
        }
    }
};
// --- END API UTILITY FUNCTIONS ---


// **NEW COMPONENT: Dropdown Menu for Status Selection**
const StatusDropdown = ({ bookingId, currentStatus, onSelectStatus, onClose }) => {
    // Only allow changing to these statuses in the dropdown
    const workflowStatuses = ['Pending', 'Approved', 'In Progress', 'Completed', 'Cancelled']; 
    const dropdownRef = useRef(null);

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    // Handle status selection and trigger confirmation
    const handleSelection = (newStatus) => {
        if (newStatus !== currentStatus) {
            // Confirmation alert box shows up on selection, then action happens
            if (window.confirm(`Confirm status change from ${currentStatus} to ${newStatus}?`)) {
                onSelectStatus(bookingId, newStatus);
            }
        }
        onClose();
    };

    return (
        <div 
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20"
            role="menu"
            aria-orientation="vertical"
        >
            <div className="py-1">
                {workflowStatuses
                    .filter(s => s !== currentStatus) // Optionally hide current status
                    .map(status => (
                        <button
                            key={status}
                            onClick={() => handleSelection(status)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                            role="menuitem"
                        >
                            {status}
                        </button>
                    ))}
            </div>
        </div>
    );
};


const Booking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    // **NEW STATE: Tracks which dropdown is open**
    const [openDropdownId, setOpenDropdownId] = useState(null);

    // Toggle dropdown visibility
    const toggleDropdown = useCallback((id) => {
        setOpenDropdownId(prevId => (prevId === id ? null : id));
    }, []);

    // --- useEffect for Initial Load (No Change) ---
    useEffect(() => {
        const loadBookings = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchBookings();
                setBookings(data);
            } catch (err) {
                console.error("Final data load failure:", err);
                setError(err.message || "Failed to load booking data. Check console for details.");
            } finally {
                setLoading(false);
            }
        };

        loadBookings();
    }, []);
    

    // --- useMemo for Filtering and Sorting (No Change) ---
    const filteredBookings = useMemo(() => {
        return bookings.filter(booking => {
            const statusMatch = filter === 'All' || booking.status === filter;
            const searchMatch = searchTerm === '' ||
                booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.id.toLowerCase().includes(searchTerm.toLowerCase());
            return statusMatch && searchMatch;
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [bookings, filter, searchTerm]);
    
    // --- Action Handlers ---
    
    // **UPDATED: Removed internal confirm since the dropdown handler now has it**
    const updateBookingStatus = async (bookingId, newStatus) => {
        // Confirmation is handled *before* this function is called by the Dropdown component
        try {
            const statusUpdateBody = { 
                status: newStatus 
            };
            
            const url = UPDATE_BOOKING.replace('{id}', bookingId);
            
            await apiCall(url, 'PUT', statusUpdateBody); 

            setBookings(prevBookings =>
                prevBookings.map(b => (b.id === bookingId ? { ...b, status: newStatus } : b))
            );
            alert(`Booking status updated to ${newStatus}.`);

        } catch (err) {
            console.error(`Status update to ${newStatus} failed:`, err);
            alert(`Failed to update status. Error: ${err.message}`);
        }
    };
    
    // handleApprove now uses the main update function, relying on the new confirmation flow 
    // (though in this specific case, the Approve button is a direct action)
    const handleApprove = (bookingId) => {
        if (window.confirm(`Confirm status change to Approved?`)) {
            updateBookingStatus(bookingId, 'Approved');
        }
    };
    
    // **REMOVED: handleStatusChange is replaced by StatusDropdown component**
    
    const handleDeleteBooking = async (bookingId, bookingNo) => {
        if (!confirm(`Are you sure you want to CANCEL (delete) booking ${bookingNo}? This cannot be undone.`)) return;

        try {
            const url = DELETE_BOOKING.replace('{id}', bookingId);
            
            await apiCall(url, 'DELETE');
            alert(`Booking ${bookingNo} successfully cancelled (deleted)!`);
            setBookings(prevBookings => prevBookings.filter(b => b.id !== bookingId));

        } catch (err) {
            console.error("Delete failed:", err);
            alert(`Failed to cancel booking ${bookingNo}. Error: ${err.message}`);
        }
    };
    
    // --- Start of JSX Render ---

    if (loading) { /* ... loading JSX ... */ }
    if (error) { /* ... error JSX ... */ }

    return (
        <div className="p-8"> {/* Added wrapper div for better page context */}
            <h2 className="text-3xl font-bold mb-6 text-slate-800">Booking Management</h2>
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
                    {STATUSES.map(s => (
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
                            {['No.', 'Client', 'Service', 'Date/Time', 'Status', 'Actions'].map(header => (
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-800">{booking.No}</td>
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
                                        <div className="flex space-x-2 relative">
                                            
                                            {booking.status === 'Pending' && (
                                                <button
                                                    title="Approve Booking"
                                                    onClick={() => handleApprove(booking.id)}
                                                    className="p-1 rounded-full text-green-600 hover:bg-green-100"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                            )}

                                            {/* **UPDATED: Button to toggle the Dropdown** */}
                                            <button
                                                title="Change Status"
                                                onClick={() => toggleDropdown(booking.id)}
                                                className="p-1 rounded-full text-blue-600 hover:bg-blue-100"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            
                                            <button
                                                title="Cancel/Delete Booking"
                                                onClick={() => handleDeleteBooking(booking.id, booking.No)}
                                                className="p-1 rounded-full text-red-600 hover:bg-red-100"
                                            >
                                                <XCircle size={18} />
                                            </button>

                                            {/* **Render Dropdown conditionally** */}
                                            {openDropdownId === booking.id && (
                                                <StatusDropdown 
                                                    bookingId={booking.id}
                                                    currentStatus={booking.status}
                                                    onSelectStatus={updateBookingStatus}
                                                    onClose={() => setOpenDropdownId(null)}
                                                />
                                            )}
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
        </div>
    );
};

export default Booking;