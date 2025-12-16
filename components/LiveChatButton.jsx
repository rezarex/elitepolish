'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { io } from 'socket.io-client'; 
import { CHAT_CONFIG, API_BASE_URL } from '@/config/config.jsx'; // Import CHAT_CONFIG

// Constants from config (using config for API_BASE_URL)
const { CLIENT_MESSAGE_URL, TYPING_STATUS_URL, SERVER_URL } = CHAT_CONFIG;

// Utility to generate a unique temporary ID if the user doesn't enter a name
const generateTempId = () => `Guest-${Date.now()}`;


// --- Utility: Debounce for Typing Status ---
// This ensures we only fire the "stop typing" event after the user has paused for a moment.
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

// --- EXTRACTED COMPONENT: Name Submission Form (Unchanged) ---
const NameForm = ({ tempUserName, setTempUserName, handleNameSubmit }) => (
    <form onSubmit={handleNameSubmit} className="p-4 flex flex-col items-center justify-center flex-grow">
        <h5 className="font-bold text-lg text-[#0f172a] mb-4">What is your name?</h5>
        <input 
          type="text" 
          placeholder="Enter your name" 
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

// --- UPDATED COMPONENT: Chat Window ---
const ChatWindow = ({ history, messagesEndRef, message, setMessage, handleSendMessage, handleTyping, isConnected }) => (
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleTyping} // <-- NEW: Typing status initiation
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
    const [tempUserName, setTempUserName] = useState(''); 
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([]);
    const socketRef = useRef(null); 
    const [isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef(null);
    const isTypingRef = useRef(false);// To prevent sending "start typing" repeatedly
    const [conversationId, setConversationId] = useState(null);

    // const currentUserId = nameSubmitted ? userName : generateTempId(); 

    // --- Utility for Auto-Scrolling ---
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    // --- API Call to Report Typing Status ---
    const sendTypingStatus = useCallback(async (isTyping) => {
        if (!conversationId || !nameSubmitted) return;

        try {
            // Log the payload to ensure correct data is sent
            const payload = { userId: conversationId, isTyping };
            console.log('Reporting typing status:', payload);

            await fetch(TYPING_STATUS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            isTypingRef.current = isTyping; // Update ref after successful send
        } catch (error) {
            console.error('Failed to report typing status:', error);
            // On error, let isTypingRef remain unchanged to retry on next key stroke
        }
    }, [conversationId, nameSubmitted, TYPING_STATUS_URL]);


    // --- Debounced function to stop typing ---
    const debouncedStopTyping = useRef(
        debounce(() => {
            sendTypingStatus(false);
        }, 1500) // Stop status sent 1.5 seconds after the last key stroke
    ).current;


    // --- NEW: Typing Handler ---
    const handleTyping = () => {
        if (!nameSubmitted || !isConnected) return;

        // 1. Send START TYPING status immediately if not already typing
        if (!isTypingRef.current) {
            sendTypingStatus(true);
        }

        // 2. Reset the debounced function, so the "stop typing" is postponed
        debouncedStopTyping();
    };


    // --- SOCKET.IO LIFECYCLE MANAGEMENT ---

useEffect(() => {
    if (nameSubmitted && isOpen && conversationId && !socketRef.current) {
        console.log(conversationId);
        
        // 1. Connect
        const newSocket = io(API_BASE_URL, {
            path: "/socket.io/",
            autoConnect: false,
            transports: ['websocket', 'polling'] 
        });
        socketRef.current = newSocket;

        newSocket.connect();
        
        // 2. Set Connection Listeners
        newSocket.on('connect', () => {
            console.log("connected vizuri");
            setIsConnected(true);
            setHistory([
                { id: 'welcome', text: `Hello, ${userName}! A concierge will be with you shortly.`, sender: 'concierge' }
            ]);
        });

        newSocket.on('connect_error', (err) => {
            console.error('Socket Connection Error:', err.message);
            setIsConnected(false);
            setHistory(prev => [...prev, {
                id: 'error-' + Date.now(), 
                text: `Connection failed. Please refresh. Error: ${err.message}`, 
                sender: 'system' 
            }]);
        });

        newSocket.on('disconnect', () => {
            setIsConnected(false);
            sendTypingStatus(false); 
            console.log('Socket disconnected.');
        });

        // 3. Listen for incoming messages
        newSocket.on('chat message', (data) => {
            if (data.user === conversationId) return;
            
            const newMessage = {
                id: Date.now(),
                text: data.message, 
                sender: data.user === 'admin' ? 'concierge' : 'client', 
            };
            setHistory(prev => [...prev, newMessage]);
        });
    }
    
    // 4. Cleanup function
    return () => {
        if (socketRef.current) {
            sendTypingStatus(false); 
            socketRef.current.disconnect();
            socketRef.current = null;
            setIsConnected(false);
            console.log('Socket disconnected on cleanup.');
        }
        debouncedStopTyping.cancel && debouncedStopTyping.cancel();
    };
}, [nameSubmitted, isOpen, userName, conversationId, sendTypingStatus, debouncedStopTyping]);





//   useEffect(() => {
//         if (nameSubmitted && isOpen && conversationId && !socketRef.current) {

//             console.log(conversationId);
            
//             // 1. Connect
//             // const newSocket = io(CLIENT_MESSAGE_URL);
//             const newSocket = io(SERVER_URL, {
//                 path: "/socket.io/",
//                 autoConnect: false,
//                 transports: ['websocket', 'polling'] 
//             });
//             socketRef.current = newSocket;

//             newSocket.connect()
            
//             // 2. Set Connection Listeners
//             newSocket.on('connect', () => {
//                 console.log("connected vizuri");
                
//                 setIsConnected(true);
//                 // console.log(`Socket connected as ${userName} (${conversationId})`);
//                 setHistory([
//                     { id: 'welcome', text: `Hello, ${userName}! A concierge will be with you shortly.`, sender: 'concierge' }
//                 ]);
//             });

//             newSocket.on('connect_error', (err) => {
//                 console.error('Socket Connection Error:', err.message);
//                 setIsConnected(false); // Ensure button is disabled and state reflects failure
//                 // Display error message to user
//                 setHistory(prev => [...prev, {
//                     id: 'error-' + Date.now(), 
//                     text: `Connection failed. Please refresh. Error: ${err.message}`, 
//                     sender: 'system' 
//                 }]);
//             });

//             newSocket.on('disconnect', () => {
//                 setIsConnected(false);
//                 // Report stop typing on disconnection
//                 sendTypingStatus(false); 
//                 console.log('Socket disconnected.');
//             });

//             // 3. Listen for incoming messages (unchanged)
//             newSocket.on('chat message', (data) => {
//                 // Ignore messages sent by this client
//                 if (data.user === conversationId) return; 

//                 const newMessage = {
//                     id: Date.now(),
//                     text: data.message, 
//                     sender: data.user === 'admin' ? 'concierge' : 'client', 
//                 };
//                 setHistory(prev => [...prev, newMessage]);
//             });
//         }
        
//         // 4. Cleanup function: disconnect the socket when unmounting or dependencies change
//         return () => {
//             if (socketRef.current) {
//                 // Ensure stop typing is sent when the chat closes
//                 sendTypingStatus(false); 
//                 socketRef.current.disconnect();
//                 socketRef.current = null;
//                 setIsConnected(false);
//                 console.log('Socket disconnected on cleanup.');
//             }
//             // Also ensure the debounced function is cleaned up
//             debouncedStopTyping.cancel && debouncedStopTyping.cancel(); 
//         };
//     }, [nameSubmitted, isOpen, userName, conversationId, sendTypingStatus, debouncedStopTyping]); 
    // Note: Debounced functions and useCallback dependencies require careful handling.

    // Scroll to bottom whenever history updates
    useEffect(() => {
        scrollToBottom();
    }, [history, isOpen]);

const handleNameSubmit = (e) => {
        e.preventDefault();
        const cleanName = tempUserName.trim();
        if (cleanName) {
            setUserName(cleanName);
            // 💡 FIX: Generate the truly unique and stable Conversation ID
            const uniqueId = cleanName.replace(/\s/g, '_') + '-' + Date.now();
            setConversationId(uniqueId);
            
            setNameSubmitted(true);
            setTempUserName(''); 
        }
    };

const toggleChat = () => {
        if (isOpen) {
             sendTypingStatus(false);
             // 💡 FIX: Reset all conversation state variables on close
             setNameSubmitted(false);
             setUserName('');
             setConversationId(null); // <-- Reset the ID
             setHistory([]);
             setTempUserName(''); 
             setMessage('');     
        }
        setIsOpen(!isOpen);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        const cleanMessage = message.trim();
        if (cleanMessage === '' || !socketRef.current || !isConnected || !conversationId) return;

        // 1. Ensure typing status is stopped after sending a message
        debouncedStopTyping.cancel && debouncedStopTyping.cancel(); // Clear pending stop
        sendTypingStatus(false);

        const messageData = {
            user: conversationId, 
            message: cleanMessage,
            sender: 'client',
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
                                    handleTyping={handleTyping} // <-- Passed down to input
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