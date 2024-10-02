import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { API_HOST, CHAT_HOST } from '@env';
import { getData, storeData } from './storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the server URL for your WebSocket connection
const SERVER_URL = API_HOST;

export const useChat = (chatId, token, email) => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    // Function to save messages to AsyncStorage
    const saveMessagesToStorage = async (chatId, newMessages) => {
        try {
            await AsyncStorage.setItem(`${chatId}`, JSON.stringify(newMessages));
        } catch (error) {
            console.error('Error saving messages to AsyncStorage:', error);
        }
    };

    // Retrieve messages from AsyncStorage when the component mounts
    const loadMessagesFromStorage = async (chatId) => {
        try {
            const storedMessages = await AsyncStorage.getItem(`${chatId}`);
            if (storedMessages !== null) {
                setMessages(JSON.parse(storedMessages));
            }
        } catch (error) {
            console.error('Error loading messages from AsyncStorage:', error);
        }
    };

    useEffect(() => {
        // Load saved messages on component mount
        loadMessagesFromStorage(chatId);

        const newSocket = new WebSocket(`${CHAT_HOST}${chatId}/?token=${token}`);

        // Set up the WebSocket connection
        newSocket.onopen = () => {
            console.log('WebSocket connection established');
        };

        // Listen for incoming messages
        newSocket.onmessage = async (event) => {
            const messageData = JSON.parse(event.data);
            messageData.sender = email === messageData.sender ? 1 : 0;
            const d = new Date();
            let time = d.toLocaleTimeString();
            messageData.time = time;
            
            // Update messages state and store new message in AsyncStorage
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, messageData];
                saveMessagesToStorage(chatId, updatedMessages);  // Save to AsyncStorage
                return updatedMessages;
            });
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

    return { messages, sendMessage };
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


// Function to delete chat
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
            console.log('Chat successfully deleted');
            Alert.alert("Success", "Chat deleted successfully");
            // Navigate back to group list after deletion
            navigation.goBack();
        } else {
            console.error('Failed to delete chat', response.status);
            Alert.alert("Error", "Failed to delete the chat.");
        }
    } catch (error) {
        console.error('Error deleting chat:', error);
        Alert.alert("Error", "Something went wrong while deleting the chat.");
    }
};

// Function to show alert for confirmation
export const confirmDeleteChat = (chatId, token, navigation) => {
    Alert.alert(
        "Delete Chat",
        "Do you really want to delete this chat?",
        [
            {
                text: "Cancel",
                onPress: () => console.log("Delete chat canceled"),
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
