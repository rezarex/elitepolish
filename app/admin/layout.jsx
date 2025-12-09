'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AuthPage from '../../components/Auth'; 

// Constants
const AUTH_TOKEN_KEY = 'elitepolish_admin_jwt';
const USER_ID_KEY = 'elitepolish_admin_user_id';

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Check for existing token on initial load
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    // In a real app, you would validate this token against your API here (e.g., /api/auth/validate)
    if (token) {
      // Mock validation success
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // 2. Handler for successful login/register
  const handleAuthSuccess = (token, userId) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USER_ID_KEY, userId); // Storing user ID, useful for API headers/requests
    setIsAuthenticated(true);
  };
  
  // 3. Handler for logout (pass this down to AdminSidebar)
  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    setIsAuthenticated(false);
  };
  
  // 4. Loading state while checking token
  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0f172a] mx-auto mb-3"></div>
                <p className="text-gray-600">Verifying session...</p>
            </div>
        </div>
    );
  }

  // 5. Render Auth Page if not authenticated
  if (!isAuthenticated) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  // 6. Render Protected Dashboard if authenticated
  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Sidebar - Pass logout handler */}
      <aside className="w-64 flex-shrink-0">
        <AdminSidebar onLogout={handleLogout} /> 
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto p-8">
        {children}
      </main>

    </div>
  );
}