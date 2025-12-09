'use client';

import React, { useState } from 'react';
import { LogIn, UserPlus, Mail, Lock } from 'lucide-react';

// Mock API endpoints for demonstration. Replace these with your actual JWT endpoints.
const LOGIN_API = 'https://eliteapi-vsc8.onrender.com/api/api/auth/login';
const REGISTER_API = 'https://eliteapi-vsc8.onrender.com/api/api/auth/register';

// This component presents the Login or Register form.
const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const title = isLogin ? 'Admin Login' : 'Register Account';
  const icon = isLogin ? LogIn : UserPlus;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const endpoint = isLogin ? LOGIN_API : REGISTER_API;
    const action = isLogin ? 'Login' : 'Register';

    // --- MOCK JWT API CALL ---
    try {
     
    //   const response = await fetch(endpoint, {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ email, password })
    //   });
      
      // Simulating network delay and response
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
     
      if (email === 'admin@elitpolish.ca' && password === 'admin') {
          // Mock JWT Payload (replace with actual token from your NodeJS API)
          const mockToken = `mock-jwt-token-${new Date().getTime()}`;
          const mockUserId = 'admin-user-id-123'; 
          
          setMessage(`${action} successful! Redirecting...`);
          onAuthSuccess(mockToken, mockUserId); // Pass token back to layout
      } else {
          throw new Error('Invalid credentials or registration failed (Mocked).');
      }

    } catch (error) {
      console.error(`${action} Error:`, error);
      setMessage(`Error: ${action} failed. Invalid credentials or network error.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl">
        <div className="flex justify-center mb-6">
          {React.createElement(icon, { size: 48, className: 'text-[#0f172a]' })}
        </div>
        <h1 className="text-3xl font-serif text-[#0f172a] text-center mb-6">{title}</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Input */}
          <div className="relative">
            <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
            <input
              type="email"
              placeholder="Email Address (use admin@elitpolish.ca)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition text-gray-500"
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
            <input
              type="password"
              placeholder="Password (use admin)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition text-gray-500"
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0f172a] text-white py-3 rounded-lg font-semibold hover:bg-[#d4af37] hover:text-[#0f172a] transition duration-300 shadow-md flex items-center justify-center disabled:opacity-50"
          >
            {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
                isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        {/* Status Message */}
        {message && (
          <p className={`mt-4 text-center text-sm ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}

        {/* Switch Mode Link */}
        <p className="mt-6 text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#d4af37] font-semibold ml-2 hover:underline disabled:opacity-50"
            disabled={loading}
          >
            {isLogin ? 'Register Now' : 'Login Here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;