'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { io } from 'socket.io-client'; 
import { API_BASE_URL } from '@/config/config';

// const SERVER_URL = 'http://localhost:5000'; 
const SERVER_URL = `${API_BASE_URL}`; 
// socket is no longer needed globally, use socketRef.current instead
// let socket; 

// Utility to generate a unique temporary ID if the user doesn't enter a name
const generateTempId = () => `Guest-${Date.now()}`;

// --- EXTRACTED COMPONENT: Name Submission Form ---
// Now defined outside the main component to prevent re-creation on LiveChatButton state changes
const NameForm = ({ tempUserName, setTempUserName, handleNameSubmit }) => (
    <form onSubmit={handleNameSubmit} className="p-4 flex flex-col items-center justify-center flex-grow">
        <h5 className="font-bold text-lg text-[#0f172a] mb-4">What is your name?</h5>
        <input 
          type="text" 
          placeholder="Enter your name" 
          // The state value and handler are passed as props
          value={tempUserName}
          onChange={(e) => setTempUserName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-500 focus:ring-[#d4af37] focus:border-[#d4af37] mb-4"
          required
        />
        <button 
          type="submit" 
          className="w-full bg-[#d4af37] text-white p-3 rounded-lg hover:bg-[#b5952f] transition disabled:opacity-50"
          disabled={tempUserName.trim() === ''}
        >
          Start Chat
        </button>
    </form>
);

// --- EXTRACTED COMPONENT: Chat Window ---
// Now defined outside the main component to prevent re-creation on LiveChatButton state changes
const ChatWindow = ({ history, messagesEndRef, message, setMessage, handleSendMessage, isConnected }) => (
    <>
        {/* Messages */}
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
            <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-gray-100">
            <input 
            type="text" 
            placeholder="Type your message..." 
            // The state value and handler are passed as props
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-lg text-sm text-gray-500 focus:ring-[#d4af37] focus:border-[#d4af37]"
            />
            <button 
            type="submit" 
            className="bg-[#0f172a] text-white p-2 rounded-lg hover:bg-[#d4af37] transition disabled:opacity-50"
            disabled={message.trim() === '' || !isConnected}                >
            <Send size={20} />
            </button>
        </form>
    </>
);


const LiveChatButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [nameSubmitted, setNameSubmitted] = useState(false);
    const [userName, setUserName] = useState('');
    const [tempUserName, setTempUserName] = useState(''); // Holds input value before submission
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([]);
    const socketRef = useRef(null); 
    const [isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef(null);

    const currentUserId = nameSubmitted ? userName : generateTempId(); 

    // --- Utility for Auto-Scrolling ---
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // --- SOCKET.IO LIFECYCLE MANAGEMENT ---
  useEffect(() => {
        if (nameSubmitted && isOpen && !socketRef.current) {
            // 1. Connect
            const newSocket = io(SERVER_URL);
            socketRef.current = newSocket;
            
            // 2. Set Connection Listeners
            newSocket.on('connect', () => {
                setIsConnected(true);
                console.log(`Socket connected as ${userName}`);
                setHistory([
                    { id: 'welcome', text: `Hello, ${userName}! A concierge will be with you shortly.`, sender: 'concierge' }
                ]);
            });

            newSocket.on('disconnect', () => {
                setIsConnected(false);
                console.log('Socket disconnected.');
            });

            // 3. Listen for incoming messages
            newSocket.on('chat message', (data) => {
                if (data.user === currentUserId) return; 

                const newMessage = {
                    id: Date.now(),
                    text: data.message, 
                    sender: data.user === 'concierge_elite_polish' ? 'concierge' : 'client', 
                };
                setHistory(prev => [...prev, newMessage]);
            });
        }
        
        // 4. Cleanup function: disconnect the socket when unmounting or dependencies change
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
                setIsConnected(false);
                console.log('Socket disconnected on cleanup.');
            }
        };
    }, [nameSubmitted, isOpen, userName, currentUserId]); // Added currentUserId to dependencies to ensure correct message filtering

    // Scroll to bottom whenever history updates
    useEffect(() => {
        scrollToBottom();
    }, [history, isOpen]);

    const handleNameSubmit = (e) => {
        e.preventDefault();
        const cleanName = tempUserName.trim();
        if (cleanName) {
            setUserName(cleanName);
            setNameSubmitted(true);
            setTempUserName(''); // Clear temp input
        }
    };

const toggleChat = () => {
        // Reset state when closing
        if (isOpen) {
             setNameSubmitted(false);
             setUserName('');
             setHistory([]);
             setTempUserName(''); 
             setMessage('');     
        }
        setIsOpen(!isOpen);
    };

 const handleSendMessage = (e) => {
        e.preventDefault();
        const cleanMessage = message.trim();
        // Use the connection status and ref for checks
        if (cleanMessage === '' || !socketRef.current || !isConnected) return; 

        const messageData = {
            user: userName, 
            message: cleanMessage,
        };
        socketRef.current.emit('chat message', messageData);

        const immediateMsg = { id: Date.now(), text: cleanMessage, sender: 'user' };
        setHistory(prev => [...prev, immediateMsg]);
        
        setMessage('');
    };
    
    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            {/* Chat Widget Wrapper */}
            {isOpen && (
                <div className="bg-white border border-gray-200 shadow-2xl rounded-xl w-80 h-[450px] mb-3 p-4 flex flex-col font-sans">
                    {/* Header */}
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <h5 className="font-bold text-[#0f172a]">Elite Polish Live Chat</h5>
                        <button onClick={toggleChat} className="text-gray-500 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 transition">
                            <X size={20} />
                        </button>
                    </div>
                    
                    {/* Conditional Content */}
                    {nameSubmitted ? 
                        <ChatWindow 
                            history={history} 
                            messagesEndRef={messagesEndRef} 
                            message={message} 
                            setMessage={setMessage} 
                            handleSendMessage={handleSendMessage} 
                            isConnected={isConnected} 
                        /> 
                        : 
                        <NameForm 
                            tempUserName={tempUserName} 
                            setTempUserName={setTempUserName} 
                            handleNameSubmit={handleNameSubmit} 
                        />
                    }

                </div>
            )}

            {/* Main Floating Button (Trigger) */}
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
        </div>
    );
};

export default LiveChatButton;