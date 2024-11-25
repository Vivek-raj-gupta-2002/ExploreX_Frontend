import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { API_HOST, CHAT_HOST } from '../scripts/var';
import { getData, storeData } from './storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the server URL for WebSocket
const SERVER_URL = API_HOST;

export const useChat = (chatId, token, email) => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(true); // New state for loading

    const saveMessagesToStorage = async (chatId, newMessages) => {
        try {
            await AsyncStorage.setItem(`chat_${chatId}_messages`, JSON.stringify(newMessages));
        } catch (error) {
            console.error('Error saving messages:', error);
        }
    };

    const loadMessagesFromStorage = async (chatId) => {
        try {
            const storedMessages = await AsyncStorage.getItem(`chat_${chatId}_messages`);
            if (storedMessages) setMessages(JSON.parse(storedMessages));
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    useEffect(() => {
        loadMessagesFromStorage(chatId);

        const newSocket = new WebSocket(`${CHAT_HOST}${chatId}/?token=${token}`);
        newSocket.onopen = () => {
            console.log('WebSocket connected');
            setLoading(false); // Connection established
        };
        newSocket.onclose = () => console.log('WebSocket disconnected');
        newSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
            setLoading(false); // Stop loading even if there's an error
        };

        newSocket.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            messageData.sender = email === messageData.sender ? 1 : 0;
            messageData.time = new Date().toLocaleTimeString();

            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, messageData];
                saveMessagesToStorage(chatId, updatedMessages);
                return updatedMessages;
            });
        };

        setSocket(newSocket);

        return () => newSocket.close();
    }, [chatId, token]);

    const sendMessage = (content) => {
        if (socket && content) {
            const messageData = { roomId: chatId, message: content };
            socket.send(JSON.stringify(messageData));
        }
    };

    return { messages, sendMessage, loading };
};


// Fetch chat data
export const fetchChats = async () => {
    try {
        const token = await getData('access');
        const response = await fetch(`${API_HOST}/chats`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch chats', response.status);
            return [];
        }
    } catch (error) {
        console.error('Error fetching chats:', error);
        return [];
    }
};

// Delete chat function
export const deleteChat = async (chatId, token, navigation) => {
    try {
        const response = await fetch(`${API_HOST}/chats/${chatId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            Alert.alert("Success", "Chat deleted successfully");
            navigation.goBack();
        } else {
            Alert.alert("Error", "Failed to delete the chat.");
            console.error('Delete chat failed:', response.status);
        }
    } catch (error) {
        Alert.alert("Error", "Something went wrong while deleting the chat.");
        console.error('Error deleting chat:', error);
    }
};

// Confirm chat deletion with alert
export const confirmDeleteChat = (chatId, token, navigation) => {
    Alert.alert(
        "Delete Chat",
        "Do you really want to delete this chat?",
        [
            {
                text: "Cancel",
                onPress: () => console.log("Delete canceled"),
                style: "cancel",
            },
            {
                text: "Yes",
                onPress: () => deleteChat(chatId, token, navigation),
            },
        ],
        { cancelable: true }
    );
};
