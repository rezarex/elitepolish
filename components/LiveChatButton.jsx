// 'use client';

// import React from 'react';
// import { MessageSquare } from 'lucide-react';

// const LiveChatButton = () => {
//   // Replace this placeholder number with the actual WhatsApp phone number 
//   // of the Elite Polish team (e.g., in international format).
//   const whatsappNumber = '+254720370015'; 
  
//   // Define a pre-filled message to guide the user/concierge.
//   const prefilledMessage = encodeURIComponent("Hello Elite Polish, I would like to inquire about booking a service.");

//   // Construct the full WhatsApp deep link URL.
//   const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${prefilledMessage}`;

//   const handleChatClick = () => {
//     // Open the WhatsApp chat link in a new tab
//     window.open(whatsappUrl, '_blank');
//   };

//   return (
//     // Fixed positioning for visibility on all pages/scroll
//     <div className="fixed bottom-6 right-6 z-[100]">
//       {/* Main Floating Button - now a direct link */}
//       <button 
//         onClick={handleChatClick}
//         aria-label="Chat via WhatsApp"
//         // Switched to a WhatsApp green/teal color for better recognition
//         className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#128C7E] transition duration-300 transform hover:scale-105"
//         title="Chat with us on WhatsApp"
//       >
//         <MessageSquare size={24} />
//       </button>
//     </div>
//   );
// };

// export default LiveChatButton;






'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

const LiveChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([
    { id: 1, text: "Welcome! How can we help you book your luxury cleaning service today?", sender: 'concierge' }
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // Reset chat history/state when closing for a clean start
    if (isOpen) {
      setHistory([{ id: 1, text: "Welcome! How can we help you book your luxury cleaning service today?", sender: 'concierge' }]);
      setMessage('');
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const newMessage = { id: Date.now(), text: message, sender: 'user' };
    
    // Add user message to history
    setHistory(prev => [...prev, newMessage]);
    
    // Simulate immediate response (for demo purposes)
    setTimeout(() => {
        const botResponse = { id: Date.now() + 1, text: "Thank you for your message. A concierge will be with you shortly to assist.", sender: 'concierge' };
        setHistory(prev => [...prev, botResponse]);
    }, 500);

    // Clear the input field
    setMessage('');

    // In a real app, you would send 'message' to a server/API here.
    console.log("User sent message:", message); 
  };

  return (
    // Fixed positioning for visibility on all pages/scroll
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Chat Widget Placeholder (shown when open) */}
      {isOpen && (
        <div className="bg-white border border-gray-200 shadow-2xl rounded-xl w-80 h-[450px] mb-3 p-4 flex flex-col font-sans">
          {/* Header */}
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <h5 className="font-bold text-[#0f172a]">Elite Polish</h5>
            <button onClick={toggleChat} className="text-gray-500 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 transition">
              <X size={20} />
            </button>
          </div>
          
          {/* Message History */}
          <div className="flex-grow overflow-y-auto py-3 space-y-3">
            {history.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl shadow-sm ${
                  msg.sender === 'user' 
                  ? 'bg-[#d4af37] text-white rounded-br-none' 
                  : 'bg-gray-100 text-[#0f172a] rounded-tl-none'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Form (Active) */}
          <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-gray-100">
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-lg text-sm text-gray-500 focus:ring-[#d4af37] focus:border-[#d4af37]"
              
            />
            <button 
              type="submit" 
              className="bg-[#0f172a] text-white p-2 rounded-lg hover:bg-[#d4af37] transition disabled:opacity-50"
              disabled={message.trim() === ''}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}

      {/* Main Floating Button */}
 {!isOpen && (
        <div className="flex items-center space-x-3">
          <span className="text-sm font-semibold text-[#0f172a] bg-white px-4 py-2 rounded-full shadow-lg transition duration-300 hover:shadow-xl">
            Talk to us
          </span>
          <button 
            onClick={toggleChat}
            aria-label="Open Live Chat"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-[#d4af37] text-white shadow-xl hover:bg-[#b5952f] transition duration-300 transform hover:scale-105"
            title="Open Live Chat"
          >
            <MessageSquare size={24} />
          </button>
        </div>
      )}
      {/* If open, just show the button (already inside the widget, or hidden behind it) */}
      {isOpen && (
        <button 
            onClick={toggleChat}
            aria-label="Open Live Chat"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-[#d4af37] text-white shadow-xl hover:bg-[#b5952f] transition duration-300 transform hover:scale-105"
            title="Open Live Chat"
            style={{visibility: 'hidden'}} // Hide the button when widget is open to prevent overlap/redundancy
          >
            <MessageSquare size={24} />
          </button>
      )}
    </div>
  );
};

export default LiveChatButton;