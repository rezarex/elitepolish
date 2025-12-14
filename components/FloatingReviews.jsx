'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Star, MessageSquare, Send } from 'lucide-react';
// Assuming '@/config/config' exports API_BASE_URL correctly
import { API_BASE_URL } from '@/config/config'; 


// --- API Endpoints ---
// Using the provided configuration variables
const REVIEWS_API = `${API_BASE_URL}/review`; 
const ADD_REVIEW_API = `${API_BASE_URL}/review/add`; // Renamed local const for clarity


const FloatingReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', 'submitting'
  
  // State for new review form
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newExcerpt, setNewExcerpt] = useState('');

  // Function to fetch reviews from the actual API
  const loadReviews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(REVIEWS_API);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedReviews = await response.json();
      // Assuming the API returns an array of review objects: [{ id, name, rating, excerpt }, ...]
      setReviews(fetchedReviews);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      // Optionally show an error message to the user
      setReviews([]); 
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load of reviews
  useEffect(() => {
    loadReviews();
  }, [loadReviews]); // Dependency array ensures it runs once and whenever loadReviews changes

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

    setSubmitStatus('submitting');

    const reviewData = {
      name: newName.trim(),
      rating: newRating,
      excerpt: newExcerpt.trim(),
      // Add any other necessary fields for your API (e.g., date, product_id)
    };
    
    // --- ACTUAL BACKEND API CALL ---
    try {
      const response = await fetch(ADD_REVIEW_API, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // Add any necessary authentication headers here
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        // Handle API error responses (e.g., validation failure, server error)
        const errorBody = await response.json(); 
        throw new Error(errorBody.message || `Failed to submit review. Status: ${response.status}`);
      }
      
      // Assuming the API returns the newly created review object upon success
      const submittedReview = await response.json(); 

      // OPTION 1: Add the new review to the local state (requires the API to return the full object)
      // submittedReview.isNew = true; // Mark for temporary display
      // setReviews(prevReviews => [submittedReview, ...prevReviews]);
      
      // OPTION 2: Re-fetch all reviews to ensure state is synchronized (safer)
      await loadReviews(); 

      // Success feedback
      setSubmitStatus('success');
      
      // Reset form fields
      setNewName('');
      setNewRating(5);
      setNewExcerpt('');

    } catch (error) {
      console.error('Failed to submit review:', error);
      setSubmitStatus('error');
    }

    // Clear status message after a few seconds
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const isSubmitting = submitStatus === 'submitting';

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
                disabled={isSubmitting}
              />
              <textarea
                placeholder="Your Experience (max 50 words)"
                value={newExcerpt}
                onChange={(e) => setNewExcerpt(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-xs resize-none text-black"
                rows="3"
                maxLength="50"
                required
                disabled={isSubmitting}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-600">Your Rating:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star} 
                        size={18} 
                        onClick={() => !isSubmitting && setNewRating(star)}
                        className={`cursor-pointer transition ${
                          star <= newRating 
                            ? 'text-yellow-500 fill-yellow-500' 
                            : 'text-gray-300 hover:text-yellow-400 hover:fill-yellow-400'
                        } ${isSubmitting ? 'opacity-50' : ''}`}
                      />
                    ))}
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="bg-[#d4af37] text-white text-xs px-3 py-1 rounded-lg hover:bg-[#b5952f] transition disabled:opacity-50 flex items-center"
                  disabled={isSubmitting || !newName.trim() || !newExcerpt.trim()}
                >
                  <Send size={14} className="mr-1"/> 
                  {isSubmitting ? 'Posting...' : 'Post'}
                </button>
              </div>
              {/* Submission Status Message */}
              {submitStatus === 'success' && (
                <p className="text-xs text-green-600 font-medium mt-1">Review successfully submitted!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-xs text-red-600 font-medium mt-1">Failed to submit review. Please try again.</p>
              )}
            </form>
          </div>

          {/* Review History */}
          <div className="overflow-y-auto space-y-4 pr-1 flex-grow">
            <h6 className="font-semibold text-sm mb-2 text-[#0f172a]">Recent Feedback</h6>
            {loading ? (
              <p className="text-sm text-gray-500 text-center">Loading reviews...</p>
            ) : reviews.length === 0 ? (
                <p className="text-sm text-gray-500 text-center">No reviews found yet.</p>
            ) : reviews.map(review => (
              <div key={review.id} className={`border-b border-gray-100 pb-2 last:border-b-0 ${review.isNew ? 'bg-yellow-50/50 p-2 rounded-lg' : ''}`}>
                <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-gray-500">{review.name}</span>
                    <div className="flex">{renderStars(review.rating, 14)}</div>
                </div>
                <p className="text-xs text-gray-600 italic mt-1 line-clamp-2">"{review.excerpt}"</p>
                {review.isNew && <span className="text-xs text-green-600 font-medium"> (New/Pending)</span>}
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