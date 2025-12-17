import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle, Loader2, Star, Trash2, Clock } from 'lucide-react'; // Added Clock for Pending status
import { API_BASE_URL } from '@/config/config';
import toast from 'react-hot-toast';

// --- API Configuration ---
const REVIEWS_API = `${API_BASE_URL}/review`; 
const REVIEWS_UPDATE_API = `${API_BASE_URL}/review/edit`; 
const RETRY_ATTEMPTS = 3;

// --- Helper Components & Map (Moved out for clarity) ---

const REVIEW_STATUS_MAP = {
  published: { color: 'text-blue-600 bg-blue-100', icon: CheckCircle },
  pending: { color: 'text-amber-600 bg-amber-100', icon: Clock }, // Use Clock icon
  archived: { color: 'text-gray-600 bg-gray-100', icon: Trash2 },
};

const StatusPill = ({ status, map }) => {
    const statusInfo = map[status] || { color: 'text-gray-500 bg-gray-100', icon: 'div' };
    const Icon = statusInfo.icon;
    return (
        <span 
            className={`flex items-center text-xs font-semibold px-3 py-1 rounded-full ${statusInfo.color}`}
        >
            <Icon size={14} className="mr-1" />
            {status}
        </span>
    );
};

// --- Custom Fetch Hook (For fetching from API with retry) ---

/**
 * Fetches data from an API endpoint with built-in retry logic.
 * @param {string} url The API endpoint URL.
 * @returns {Promise<Array | null>} The fetched data or null on failure.
 */
const fetchReviewsFromAPI = async (url) => {
    for (let i = 0; i < RETRY_ATTEMPTS; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                // Throw an error to trigger a retry, unless it's a permanent error like 404
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error.message);
            if (i === RETRY_ATTEMPTS - 1) {
                // Last attempt failed
                return null;
            }
            // Wait before retrying (e.g., exponential backoff is often used)
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); 
        }
    }
    return null;
};

// --- Main Component ---
const ReviewsMgt = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const loadReviews = async () => {
            setLoading(true);
            setError(null);
            
            // --- CRITICAL CHANGE: Calling the API fetch function ---
            const data = await fetchReviewsFromAPI(REVIEWS_API); 
            
            if (data) {
                // Assuming the API returns an array of review objects
                setReviews(data); 
            } else {
                // If fetching fails after all retries
                setError("Failed to load review data after multiple attempts. The API may be unavailable.");
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

const updateReviewStatus = async (id, newStatus) => {
    // 1. Store the previous state in case we need to roll back
    const previousReviews = [...reviews];

    // 2. Optimistically update the UI immediately
    setReviews(prevReviews =>
        prevReviews.map(r => (r.id === id ? { ...r, status: newStatus } : r))
    );

    console.log(newStatus);
    const loadingToast = toast.loading(`Updating status to ${newStatus}...`);
    

    try {
        // 3. Send the PATCH/PUT request to the server
        const response = await fetch(`${REVIEWS_API}/${id}`, {
            method: 'PUT', // or 'PUT' depending on your backend setup
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        });

        if (!response.ok) {
            throw new Error('Failed to update status on the server');
        }

        toast.success(`Review ${newStatus}!`, { id: loadingToast });
        // alert(`Success! Review status has been changed to ${newStatus}.`);

        // Optional: If your API returns the updated object, 
        // you could sync it here to ensure data consistency.
        // const updatedReview = await response.json();

    } catch (err) {
        console.error("API Update Error:", err);
        
        // 4. Rollback: If the API fails, revert to the original state
        setReviews(previousReviews);
        
        // Notify the user of the failure
        // alert("Failed to update review status. Please try again.");
        toast.error("Failed to update status. Reverting changes.", { id: loadingToast });
    }
};

    if (loading) return <div className="p-8 flex items-center justify-center"><Loader2 className="animate-spin mr-3" size={24} /> Loading Reviews...</div>;
    if (error) return <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-700">Error: {error}</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Customer Reviews Management</h2>
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
                        {s} ({reviews.filter(r => s === 'All' ? true : r.status === s).length})
                    </button>
                ))}
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredReviews.map(review => {
                        // 1. Normalize data from API
                        const ratingInt = parseInt(review.rating, 10) || 0;
                        // Normalize status to start with Capital letter to match your Status Map
                        const normalizedStatus = review.status.charAt(0).toUpperCase() + review.status.slice(1);

                        return (
                            <div key={review._id} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#d4af37]">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="font-bold text-lg text-slate-800">{review.name}</div>
                                    <StatusPill status={normalizedStatus} map={REVIEW_STATUS_MAP} />
                                </div>
                                
                                {/* Corrected Star Rendering */}
                                <div className="flex mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            size={16} 
                                            fill={i < ratingInt ? "#d4af37" : "none"} 
                                            stroke={i < ratingInt ? "none" : "#d1d5db"} 
                                            className={i < ratingInt ? "text-[#d4af37]" : "text-gray-300"} 
                                        />
                                    ))}
                                </div>

                                <p className="text-sm italic text-gray-700 mb-4 line-clamp-3">
                                    "{review.experience || "No feedback provided."}"
                                </p>
                                
                                <div className="text-xs text-gray-500 mb-4">
                                    {/* Date formatting for MongoDB ISO strings */}
                                    Date: {new Date(review.createdAt).toLocaleDateString()}
                                </div>

                                <div className="flex space-x-2 border-t pt-4">
                                    <button
                                        onClick={() => updateReviewStatus(review._id, 'published')}
                                        disabled={review.status === 'published'}
                                        className="flex items-center text-xs px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:opacity-50"
                                    >
                                        <CheckCircle size={14} className="mr-1" /> Publish
                                    </button>
                                    <button
                                        onClick={() => updateReviewStatus(review._id, 'archived')}
                                        disabled={review.status === 'archived'}
                                        className="flex items-center text-xs px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 disabled:opacity-50"
                                    >
                                        <Trash2 size={14} className="mr-1" /> Archive
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default ReviewsMgt;