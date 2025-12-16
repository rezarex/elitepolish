import React, { useState, useEffect, useCallback } from 'react';
import { Zap, Loader, RefreshCw, MessageCircle } from 'lucide-react'; 
// NOTE: Assuming your config file structure is correct for the import path
import {CHAT_CONFIG} from '@/config/config';


// --- Utility Functions for Data Transformation (Unchanged) ---
// This function groups the flat API message array into structured conversations.
const transformApiData = (apiMessages) => {
   const chatsMap = new Map();

    apiMessages.forEach(msg => {
        const chatId = msg.user; // <-- This is the unique Conversation ID (e.g., Guest-123 or John Doe)
        const senderType = msg.sender.toLowerCase() === 'client' ? 'client' : 'admin';
        const timestamp = new Date(msg.timestamp);
        const time = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (!chatsMap.has(chatId)) {
            chatsMap.set(chatId, {
                id: chatId,
                // Use the unique ID for the title, making it distinct and traceable
                // You can still display the name if available, but the ID is key.
                clientDisplay: `${chatId.substring(0, 8)}...`, // Display a truncated ID
                clientId: chatId, // Keep the full ID for API calls
                messages: [],
                lastMessage: '',
                time: '',
                unread: 0,
            });
        }

        const chat = chatsMap.get(chatId);

        chat.messages.push({
            sender: senderType,
            text: msg.text,
            time: time,
            timestamp: timestamp.getTime(), 
        });

        if (senderType === 'client' && msg.status === 'Unread') {
            chat.unread += 1;
        }
    });

    let chatsArray = Array.from(chatsMap.values());

    chatsArray = chatsArray.map(chat => {
        chat.messages.sort((a, b) => a.timestamp - b.timestamp);

        const latestMessage = chat.messages[chat.messages.length - 1];
        if (latestMessage) {
            chat.lastMessage = latestMessage.text;
            chat.time = latestMessage.time; 
        }
        
        return chat;
    });

    chatsArray.sort((a, b) => {
        const timeA = a.messages.length > 0 ? a.messages[a.messages.length - 1].timestamp : 0;
        const timeB = b.messages.length > 0 ? b.messages[b.messages.length - 1].timestamp : 0;
        return timeB - timeA;
    });
    
    return chatsArray;
};


// --- React Component ---

const Livechat = () => {
    // State management
    const [chats, setChats] = useState([]); 
    const [selectedChat, setSelectedChat] = useState(null);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isClientTyping, setIsClientTyping] = useState(false); 
    
    // Destructure config for cleaner use
    const { 
        CHAT_HISTORY, MARK_READ_URL, TYPING_STATUS_URL, POST_MESSAGE_URL,
        CHAT_POLLING_INTERVAL, TYPING_POLLING_INTERVAL 
    } = CHAT_CONFIG;



      /**
     * Fetches chat history from the API and transforms the data.
     */
const fetchChatHistory = useCallback(async (isPolling = false) => {
        if (!isPolling) setIsLoading(true);
        else setIsRefreshing(true);

        try {
            const response = await fetch(CHAT_HISTORY);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            const transformedChats = transformApiData(data);
            
            setChats(transformedChats);

            // --- NEW SELECTION LOGIC ---
            // Update selectedChat based on the new list and the stable ID
            setSelectedChat(prevSelectedChat => {
                const idToFind = prevSelectedChat?.id || selectedChatId;
                
                if (idToFind) {
                    // Try to find the previously selected chat in the new list
                    const foundChat = transformedChats.find(chat => chat.id === idToFind);
                    return foundChat || null; 
                } else if (transformedChats.length > 0) {
                    // If no chat was selected, select the top one
                    setSelectedChatId(transformedChats[0].id);
                    return transformedChats[0];
                }
                return null;
            });
            
        } catch (error) {
            console.error('Failed to fetch chat history:', error);
        } finally {
            if (!isPolling) setIsLoading(false);
            else setIsRefreshing(false);
        }
    }, [CHAT_HISTORY, selectedChatId]);

    /**
     * API call to notify the server that the admin has read the messages.
     */
  const markChatAsRead = useCallback(async (chatId) => {
        // Find the chat object from the current state using the ID
        const chatToUpdate = chats.find(c => c.id === chatId); 
        if (!chatToUpdate || chatToUpdate.unread === 0) return;

        try {
            // ... API call logic ...
            await fetch(MARK_READ_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: chatId, status: 'read' }),
            });

            // Update local state (Optimistic update)
            setChats(prevChats => 
                prevChats.map(chat => 
                    chat.id === chatId ? { ...chat, unread: 0 } : chat
                )
            );
            // Only update selectedChat if it's the one we just read
            setSelectedChat(prevChat => (prevChat && prevChat.id === chatId) ? ({ ...prevChat, unread: 0 }) : prevChat);

        } catch (error) {
            console.error('Error marking chat as read:', error);
        }
    }, [chats, MARK_READ_URL]);

    // ... fetchTypingStatus and handleSendMessage remain the same ...
    
    // 1. Initial Data Fetch (on mount)
    useEffect(() => {
        // This runs only once now that fetchChatHistory is stable
        fetchChatHistory();
    }, [fetchChatHistory]); 

    // 2. Chat Polling / Auto-Refresh Mechanism
    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchChatHistory(true);
        }, CHAT_POLLING_INTERVAL);

        return () => clearInterval(intervalId);
    }, [fetchChatHistory, CHAT_POLLING_INTERVAL]);

    /**
     * Handles selecting a new chat from the sidebar.
     */
const handleSelectChat = (chat) => {
        setSelectedChat(chat);
        setSelectedChatId(chat.id); // 'id' holds the unique Conversation ID
        setIsClientTyping(false); 
        if (chat.unread > 0) {
            markChatAsRead(chat.id);
        }
    };


  

    /**
     * Polling mechanism to fetch the typing status of the currently selected client.
     */
    const fetchTypingStatus = useCallback(async () => {
        if (!selectedChat) return;

        try {
            const response = await fetch(`${TYPING_STATUS_URL}?userId=${selectedChat.id}`);
            if (!response.ok) {
                // If API fails or user doesn't exist, assume not typing
                throw new Error(`Typing status error: ${response.status}`);
            }
            const data = await response.json();
            
            // Assuming data structure: { isTyping: boolean }
            setIsClientTyping(data.isTyping);
        } catch (error) {
            // console.error('Failed to fetch typing status:', error); 
            setIsClientTyping(false); 
        }
    }, [selectedChat, TYPING_STATUS_URL]);


    // 1. Initial Data Fetch (on mount)
    useEffect(() => {
        fetchChatHistory();
    }, [fetchChatHistory]);

    // 2. Chat Polling / Auto-Refresh Mechanism
    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchChatHistory(true);
        }, CHAT_POLLING_INTERVAL);

        return () => clearInterval(intervalId);
    }, [fetchChatHistory, CHAT_POLLING_INTERVAL]);
    
    // 3. Typing Status Polling Mechanism
    useEffect(() => {
        let typingIntervalId;
        if (selectedChat) {
            typingIntervalId = setInterval(fetchTypingStatus, TYPING_POLLING_INTERVAL);
        }

        return () => {
            if (typingIntervalId) {
                clearInterval(typingIntervalId);
            }
        };
    }, [selectedChat, fetchTypingStatus, TYPING_POLLING_INTERVAL]);


    // 4. Scroll to bottom 
    useEffect(() => {
        const chatWindow = document.getElementById('chat-messages');
        if (chatWindow) {
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    }, [selectedChat, chats]); 


    /**
     * Handles sending a new message.
     */
    const handleSendMessage = async () => {
        if (!messageInput.trim() || !selectedChat || isSending) return;

        setIsSending(true);
        const text = messageInput.trim();
        const sender = 'admin'; 
        
        const apiPayload = {
            user: selectedChat.id, 
            sender: 'admin', 
            text: text,

        };

        console.log('Sending message payload:', apiPayload);
        
        try {
            const response = await fetch(POST_MESSAGE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(apiPayload),
            });

            if (!response.ok) {
                throw new Error(`Failed to send message: ${response.status}`);
            }
            
            // Local state update after successful API call
            const now = new Date();
            const newMessage = {
                sender: sender, 
                text: text,
                time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                timestamp: now.getTime(),
            };
            
            setChats(prevChats => 
                prevChats.map(chat => 
                    chat.id === selectedChat.id ? { 
                        ...chat, 
                        messages: [...chat.messages, newMessage], 
                        lastMessage: newMessage.text, 
                        time: newMessage.time, 
                        unread: 0 
                    } : chat
                )
            );

            setSelectedChat(prevChat => ({
                ...prevChat,
                messages: [...prevChat.messages, newMessage],
                lastMessage: newMessage.text,
                time: newMessage.time,
                unread: 0,
            }));

            setMessageInput('');

        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.'); 
        } finally {
            setIsSending(false);
        }
    };

    // ChatMessage component
    const ChatMessage = ({ message }) => (
        <div className={`flex mb-4 ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl shadow-md ${
                message.sender === 'admin' 
                    ? 'bg-[#d4af37] text-white rounded-tr-none' 
                    : 'bg-gray-200 text-slate-800 rounded-tl-none'
            }`}>
                <p className="text-sm">{message.text}</p>
                <span className={`block text-xs mt-1 ${message.sender === 'admin' ? 'text-white/80' : 'text-gray-500'}`}>{message.time}</span>
            </div>
        </div>
    );

    if (isLoading) {
        return <div className="flex items-center justify-center h-full text-lg font-semibold text-slate-700">Loading conversations...</div>;
    }

    return (
        <div className="flex h-[calc(100vh-100px)] overflow-hidden rounded-lg shadow-xl bg-white">
            {/* Conversation List Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-lg font-serif text-[#0f172a] font-bold">Conversations ({chats.length})</h2>
                    {/* Refresh Indicator */}
                    <div title={`Auto-refreshing every ${CHAT_POLLING_INTERVAL / 1000} seconds`}>
                        <RefreshCw 
                            size={16} 
                            className={`text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} 
                        />
                    </div>
                </div>
                <div className="overflow-y-auto h-full pb-32">
                    {chats.length === 0 ? (
                        <p className="p-4 text-gray-500">No active chats found.</p>
                    ) : (
                        chats.map(chat => (
                            <div
                                key={chat.id}
                                onClick={() => handleSelectChat(chat)} 
                                className={`p-4 cursor-pointer border-b border-gray-100 transition-colors ${
                                    selectedChat?.id === chat.id ? 'bg-[#fcf8e5] border-l-4 border-[#d4af37]' : 'hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-slate-900">{chat.clientDisplay}</span>
                                    {chat.unread > 0 && (
                                        <span className="text-xs bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full">
                                            {chat.unread}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                                <span className="text-xs text-gray-400">{chat.time}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-gray-50">
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-gray-200 bg-white shadow-sm flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900">{selectedChat.client}</h3>
                                <p className="text-sm text-gray-500">Chat ID: {selectedChat.id}</p>
                            </div>
                            {/* Typing Indicator */}
                            {isClientTyping && (
                                <div className="flex items-center text-sm text-green-600 font-medium animate-pulse">
                                    <MessageCircle size={16} className="mr-1" />
                                    Client is typing...
                                </div>
                            )}
                        </div>
                        
                        {/* Messages */}
                        <div id="chat-messages" className="flex-1 overflow-y-auto p-6 space-y-4">
                            {selectedChat.messages.map((msg, index) => (
                                <ChatMessage key={index} message={msg} />
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t">
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Type your reply here..."
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-[#d4af37] focus:border-[#d4af37] focus:outline-none"
                                    disabled={isSending}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="bg-[#0f172a] hover:bg-slate-700 text-white p-3 rounded-r-lg font-bold flex items-center justify-center transition disabled:opacity-50"
                                    disabled={!messageInput.trim() || isSending}
                                >
                                    {isSending ? (
                                        <>
                                            <Loader size={20} className="mr-1 animate-spin" /> Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Zap size={20} className="mr-1" /> Send
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        {isLoading ? 'Fetching data...' : 'Select a conversation to start chatting.'}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Livechat;