import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { API_HOST, CHAT_HOST } from '@env';
import { getData, storeData } from './storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the server URL for WebSocket
const SERVER_URL = API_HOST;

export const useChat = (chatId, token, email) => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    // AsyncStorage helper for saving messages
    const saveMessagesToStorage = async (chatId, newMessages) => {
        try {
            await AsyncStorage.setItem(`chat_${chatId}_messages`, JSON.stringify(newMessages));
        } catch (error) {
            console.error('Error saving messages:', error);
        }
    };

    // Load messages from AsyncStorage when the component mounts
    const loadMessagesFromStorage = async (chatId) => {
        try {
            const storedMessages = await AsyncStorage.getItem(`chat_${chatId}_messages`);
            if (storedMessages) setMessages(JSON.parse(storedMessages));
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    useEffect(() => {
        // Load messages from storage
        loadMessagesFromStorage(chatId);

        const newSocket = new WebSocket(`${CHAT_HOST}${chatId}/?token=${token}`);
        newSocket.onopen = () => console.log('WebSocket connected');
        newSocket.onclose = () => console.log('WebSocket disconnected');
        newSocket.onerror = (error) => console.error('WebSocket error:', error);

        newSocket.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            messageData.sender = email === messageData.sender ? 1 : 0;

            
            messageData.time = new Date().toLocaleTimeString();
            

            console.log(messageData)
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, messageData];
                saveMessagesToStorage(chatId, updatedMessages);
                return updatedMessages;
            });
        };

        setSocket(newSocket);

        return () => newSocket.close();
    }, [chatId, token]);

    // Send message to WebSocket server
    const sendMessage = (content) => {
        if (socket && content) {
            const messageData = { roomId: chatId, message: content };
            socket.send(JSON.stringify(messageData));
        }
    };

    return { messages, sendMessage };
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
