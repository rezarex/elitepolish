'use client';

'use client';

import React, { useState } from 'react';
import { LogIn, UserPlus, Mail, Lock } from 'lucide-react';

// IMPORTANT: Updated placeholder with the base URL you provided in the context.
// Ensure this URL is correct and pointing to your live backend.
const API_BASE_URL = 'https://eliteapi-vsc8.onrender.com'; 

// Use the actual API endpoints
const LOGIN_API = `${API_BASE_URL}/api/auth/login`;
const REGISTER_API = `${API_BASE_URL}/api/auth/register`;

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
    
    // --- START DEBUGGING LOGIC ---
    const requestBody = JSON.stringify({ email, password });
    
    console.log("--- FRONTEND REQUEST DEBUG ---");
    console.log("Endpoint:", endpoint);
    console.log("Method:", 'POST');
    console.log("Request Body:", requestBody); 
    console.log("------------------------------");
    // --- END DEBUGGING LOGIC ---


    try {
      // 1. Perform the actual API call
      const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
            'accept' : '*/*'
           },
          body: requestBody, // Use the logged body
          // credentials: 'include' // This is essential for sending and receiving HTTP-only cookies in a CORS environment
      });
      
      // 2. Check if the response was successful (HTTP 200-299)
      if (response.ok) {
          // 3. Parse the JSON body
          const data = await response.json(); 
          
          // 4. Extract the Access Token and User ID from the backend response
          const accessToken = data.token;
          console.log(accessToken);
          
          const userId = data._id; // Matches the key in userController.js response
          console.log(userId);
          

          if (!accessToken || !userId) {
             // THIS IS THE ERROR YOU ARE HITTING: Backend is not returning 'token' or 'userId' in the JSON body.
             throw new Error("Missing authentication tokens in the response.");
          }

          // 5. Success: Pass token and ID to the layout for saving
          setMessage(`${action} successful! Redirecting...`);
          onAuthSuccess(accessToken, userId); // Pass token and ID back to layout
          
      } else {
          // --- IMPROVED ERROR HANDLING ---
          const status = response.status;
          let errorDetail = `Authentication failed (Status: ${status}).`;
          
          // Clone the response to read the body twice (once as text, once as JSON)
          const responseClone = response.clone();
          const responseText = await responseClone.text();
          
          try {
              // Attempt to parse server error message from JSON
              const errorData = JSON.parse(responseText);
              // Use the message property if available, otherwise default to status
              errorDetail = errorData.message || `Server Error (Status ${status}): ${responseText}`;
          } catch (e) {
              // If JSON parsing fails, use the raw text as the error detail
              errorDetail = `Server Error (Status ${status}): ${responseText.substring(0, 100)}... (Check console for full response)`;
          }

          // Log the full text response for detailed debugging
          console.error("Full Server Error Response Text:", responseText);

          // Throw a new error with the detailed message
          throw new Error(errorDetail);
      }

    } catch (error) {
      console.error(`${action} Error:`, error);
      setMessage(`Error: ${error.message || `${action} failed due to a network or server error.`}`);
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
            <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address (use admin@luxeshine.com for mock access)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password (use admin for mock access)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition"
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


// import React, { useState } from 'react';
// import { LogIn, UserPlus, Mail, Lock } from 'lucide-react';


// const API_BASE_URL = "https://eliteapi-vsc8.onrender.com/api/"

// // Mock API endpoints for demonstration. Replace these with your actual JWT endpoints.
// const LOGIN_API = 'https://eliteapi-vsc8.onrender.com/api/auth/login';
// const REGISTER_API = 'https://eliteapi-vsc8.onrender.com/api/auth/register';

// // This component presents the Login or Register form.
// const AuthPage = ({ onAuthSuccess }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const title = isLogin ? 'Admin Login' : 'Register Account';
//   const icon = isLogin ? LogIn : UserPlus;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     const endpoint = isLogin ? LOGIN_API : REGISTER_API;
//     const action = isLogin ? 'Login' : 'Register';
//     const requestBody = JSON.stringify({ email, password });

//     console.log("--- FRONTEND REQUEST DEBUG ---");
//     console.log("Endpoint:", endpoint);
//     console.log("Method:", 'POST');
//     console.log("Request Body:", requestBody); 
//     console.log("------------------------------");

//  try {
//       // 1. Perform the API call
//       const response = await fetch(endpoint, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json',
//             'accept' : '*/*'
//            },
//           body: requestBody,
//           // credentials: 'include'
//       });

   
      
      
//       // 2. Check if the response was successful (HTTP 200-299)
//       if (response.ok) {
//           // 3. Parse the JSON body
//           const data = await response.json(); 
          
//           // 4. Extract the Access Token and User ID from the backend response
//           const accessToken = data.token;
//           const userId = data.userId; // Matches the key in userController.js response

//           if (!accessToken || !userId) {
//              throw new Error("Missing authentication tokens in the response.");
//           }

//           // 5. Success: Pass token and ID to the layout for saving
//           setMessage(`${action} successful! Redirecting...`);
//           onAuthSuccess(accessToken, userId); // Pass token and ID back to layout
          
//       } else {
//           // Handle non-2xx status codes (e.g., 401, 409, 500)
//           let errorDetail = "Authentication failed.";
//           try {
//               // Attempt to parse server error message
//               const errorData = await response.json();
//               errorDetail = errorData.message || errorDetail;
//           } catch (e) {
//               // Ignore JSON parse error if server didn't send a JSON body
//           }
//           throw new Error(errorDetail);
//       }
//      } catch (error) {
//       console.error(`${action} Error:`, error);
//       setMessage(`Error: ${action} failed. Invalid credentials or network error.`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl">
//         <div className="flex justify-center mb-6">
//           {React.createElement(icon, { size: 48, className: 'text-[#0f172a]' })}
//         </div>
//         <h1 className="text-3xl font-serif text-[#0f172a] text-center mb-6">{title}</h1>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
          
//           {/* Email Input */}
//           <div className="relative">
//             <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
//             <input
//               type="email"
//               placeholder="Email Address (use admin@elitpolish.ca)"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition text-gray-500"
//               disabled={loading}
//             />
//           </div>

//           {/* Password Input */}
//           <div className="relative">
//             <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
//             <input
//               type="password"
//               placeholder="Password (use admin)"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition text-gray-500"
//               disabled={loading}
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-[#0f172a] text-white py-3 rounded-lg font-semibold hover:bg-[#d4af37] hover:text-[#0f172a] transition duration-300 shadow-md flex items-center justify-center disabled:opacity-50"
//           >
//             {loading ? (
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//             ) : (
//                 isLogin ? 'Sign In' : 'Create Account'
//             )}
//           </button>
//         </form>

//         {/* Status Message */}
//         {message && (
//           <p className={`mt-4 text-center text-sm ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
//             {message}
//           </p>
//         )}

//         {/* Switch Mode Link */}
//         <p className="mt-6 text-center text-gray-600">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-[#d4af37] font-semibold ml-2 hover:underline disabled:opacity-50"
//             disabled={loading}
//           >
//             {isLogin ? 'Register Now' : 'Login Here'}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;