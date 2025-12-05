'use client'
import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Send } from 'lucide-react';

// --- MOCK DATA SOURCE (Will be replaced by API call) ---
const MOCK_REVIEWS = [
  { id: 1, name: "Jessica R.", rating: 5, excerpt: "My home has never looked so pristine! Truly five-star service." },
  { id: 2, name: "Mark L.", rating: 5, excerpt: "The attention to detail was incredible. Highly recommend Elite Polish." },
  { id: 3, name: "Sarah K.", rating: 4, excerpt: "Very professional and friendly team. My granite surfaces sparkle." },
];

// Simulated asynchronous data fetching function
async function fetchReviews() {
  await new Promise(resolve => setTimeout(resolve, 300)); 
  return MOCK_REVIEWS;
}

const FloatingReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // State for new review form
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newExcerpt, setNewExcerpt] = useState('');

  useEffect(() => {
    const loadReviews = async () => {
      const fetchedReviews = await fetchReviews();
      setReviews(fetchedReviews);
      setLoading(false);
    };
    loadReviews();
  }, []);

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1) 
    : 0;

  const renderStars = (rating, size = 14) => (
    Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={size} 
        className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
      />
    ))
  );

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !newExcerpt.trim() || newRating < 1 || newRating > 5) return;

    const newReview = {
      id: Date.now(), // Unique ID for the new review
      name: newName.trim() || 'Anonymous',
      rating: newRating,
      excerpt: newExcerpt.trim(),
      isNew: true, // Marker for temporary local display
    };

    // --------------------------------------------------------
    // TODO: Replace this section with your actual backend API call
    // Example: 
    /*
    try {
      const response = await fetch('YOUR_BACKEND_API_ENDPOINT/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });
      if (response.ok) {
        // If successful, update local state or re-fetch reviews
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
    */
    // --------------------------------------------------------

    // TEMPORARY: Add to local state for instant feedback (will disappear on page refresh)
    setReviews(prevReviews => [newReview, ...prevReviews]);
    
    // Reset form fields
    setNewName('');
    setNewRating(5);
    setNewExcerpt('');
    
    console.log("Review submitted (locally saved):", newReview);
  };

  return (
    // Fixed positioning for bottom-left visibility
    <div className="fixed bottom-6 left-6 z-40 font-sans">
      
      {/* Expanded Reviews List & Form */}
      {isExpanded && (
        <div className="bg-white border border-gray-200 shadow-2xl rounded-xl w-80 h-[550px] p-4 mb-3 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center pb-3 border-b border-gray-100 mb-3">
            <h5 className="font-bold text-[#0f172a] flex items-center">
              <Star size={18} className="text-yellow-500 mr-1 fill-yellow-500" />
              Customer Reviews
            </h5>
            <button onClick={() => setIsExpanded(false)} className="text-gray-500 hover:text-red-500 text-sm">
              Close
            </button>
          </div>

          {/* Review Submission Form */}
          <div className="border-b border-gray-100 pb-3 mb-3">
            <h6 className="font-semibold text-sm mb-2 text-[#0f172a]">Leave a Review</h6>
            <form onSubmit={handleReviewSubmit} className="space-y-2">
              <input 
                type="text"
                placeholder="Your Name (e.g., Jane D.)"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-xs text-black"
                required
              />
              <textarea
                placeholder="Your Experience (max 50 words)"
                value={newExcerpt}
                onChange={(e) => setNewExcerpt(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-xs resize-none text-black"
                rows="3"
                maxLength="50"
                required
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-600">Your Rating:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star} 
                        size={18} 
                        onClick={() => setNewRating(star)}
                        className={`cursor-pointer transition ${
                          star <= newRating 
                            ? 'text-yellow-500 fill-yellow-500' 
                            : 'text-gray-300 hover:text-yellow-400 hover:fill-yellow-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="bg-[#d4af37] text-white text-xs px-3 py-1 rounded-lg hover:bg-[#b5952f] transition disabled:opacity-50 flex items-center"
                  disabled={!newName.trim() || !newExcerpt.trim()}
                >
                  <Send size={14} className="mr-1"/> Post
                </button>
              </div>
            </form>
          </div>

          {/* Review History */}
          <div className="overflow-y-auto space-y-4 pr-1 flex-grow">
            <h6 className="font-semibold text-sm mb-2 text-[#0f172a]">Recent Feedback</h6>
            {loading ? (
              <p className="text-sm text-gray-500 text-center">Loading reviews...</p>
            ) : reviews.map(review => (
              <div key={review.id} className={`border-b border-gray-100 pb-2 last:border-b-0 ${review.isNew ? 'bg-yellow-50/50 p-2 rounded-lg' : ''}`}>
                <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-gray-500">{review.name}</span>
                    <div className="flex">{renderStars(review.rating, 14)}</div>
                </div>
                <p className="text-xs text-gray-600 italic mt-1 line-clamp-2">"{review.excerpt}"</p>
                {review.isNew && <span className="text-xs text-green-600 font-medium"> (Pending Moderation)</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compact Floating Button (Always visible) */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label="View Customer Reviews"
        className="flex items-center p-3 rounded-full bg-white text-[#0f172a] shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] border-2 border-[#d4af37]"
        title="View latest customer reviews"
      >
        <div className="flex items-center space-x-2">
            <Star size={20} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold">
                {loading ? 'Reviews' : `${averageRating} (${totalReviews})`}
            </span>
        </div>
      </button>
    </div>
  );
};

export default FloatingReviews;