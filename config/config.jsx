//DEV
export const API_BASE_URL = 'https://eliteapi-vsc8.onrender.com/api'; 
export const CHAT_API_BASE_URL = 'https://eliteapi-vsc8.onrender.com';
// export const CHAT_API_BASE_URL = 'http://localhost:5000'; 
// export const API_BASE_URL = 'http://localhost:5000/api';
// export { API_BASE_URL };

// --- Chat Configuration ---
export const CHAT_CONFIG = {
    // API Endpoints
    CHAT_HISTORY: `${API_BASE_URL}/chat/history`, 
    SERVER_URL: `${API_BASE_URL}`,
    MARK_READ_URL: `${API_BASE_URL}/chat/mark-read`, 
    TYPING_STATUS_URL: `${API_BASE_URL}/chat/typing`, 
    POST_MESSAGE_URL: `${API_BASE_URL}/chat/admin`,
    CLIENT_MESSAGE_URL: `${API_BASE_URL}/chat/client`, // Explicit post endpoint

    // Polling Intervals (in milliseconds)
    CHAT_POLLING_INTERVAL: 15000, // General chat refresh (15 seconds)
    TYPING_POLLING_INTERVAL: 3000,  // Typing status refresh (3 seconds)
};
//PROD


// export { API_BASE_URL };