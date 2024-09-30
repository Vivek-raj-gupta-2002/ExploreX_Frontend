import { useState, useEffect } from 'react';
import { API_HOST, CHAT_HOST } from '@env';
import { getData } from './storage';

// Define the server URL for your WebSocket connection
const SERVER_URL = API_HOST;

export const useChat = (chatId, token, email) => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        
        const newSocket = new WebSocket(`${CHAT_HOST}${chatId}/?token=${token}`);

        // Set up the connection
        newSocket.onopen = () => {
            console.log('WebSocket connection established');
        };

        // Listen for incoming messages
        newSocket.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            messageData.sender = email === messageData.sender ? 1 : 0;

            messages.push(messageData)
            
        };

        // Handle socket closure
        newSocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // Handle errors
        newSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        setSocket(newSocket);

        // Clean up on component unmount
        return () => {
            newSocket.close();
        };
    }, [chatId, token]); // Re-establish connection when chatId or token changes

    // Function to send a message to the server
    const sendMessage = (content) => {
        if (socket && content) {
            const messageData = {
                roomId: chatId,
                message: content,
            };
            // Send the message data as a JSON string
            socket.send(JSON.stringify(messageData));
        }
    };

    // Function to handle removing a chat without deleting the entry
    const removeChat = (messageId) => {
        setMessages((prevMessages) =>
            prevMessages.filter((message) => message.id !== messageId)
        );
    };

    return { messages, sendMessage, removeChat };
};

// Function to fetch chat data
export const fetchChats = async () => {
    try {
        const token = await getData('access');

        // Fetch chat data from the API
        const response = await fetch(`${API_HOST}/chats`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Include token in Authorization header
                'Content-Type': 'application/json',
            },
        });

        // Check if the response is successful
        if (response.ok) {
            const data = await response.json();
            return data; // Return fetched chat data
        } else {
            console.error('Failed to fetch chats', response.status);
            return null; // Return null on failure
        }
    } catch (error) {
        console.error('Error fetching chats:', error);
        return null; // Return null on error
    }
};
