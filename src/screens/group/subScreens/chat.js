import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView } from 'react-native';
import CustomIconButton from '../../../components/iconButton';
import CustomTextInput from '../../../components/input';

const ChatScreen = ({ navigation, route }) => {
    const { groupName } = route.params;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const flatListRef = useRef(null);

    const handleSend = () => {
        if (message.trim()) {
            const timestamp = new Date().toLocaleTimeString();
            // Add the message as a sent message
            setMessages(prevMessages => [
                ...prevMessages,
                { text: message.trim(), sent: true, time: timestamp }
            ]);
            setMessage(''); // Clear input field

            // Simulate receiving a message after sending
            simulateReceiveMessage();

            // Scroll to the bottom after updating messages
            setTimeout(() => {
                flatListRef.current.scrollToEnd({ animated: true });
            }, 100);
        }
    };

    const simulateReceiveMessage = () => {
        const randomMessages = [
            "Hello! How are you?",
            "What are you doing?",
            "Let's catch up soon!",
            "Do you have any plans for the weekend?",
            "That's interesting!"
        ];
        const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
        const timestamp = new Date().toLocaleTimeString();

        // Add a delay before simulating the received message
        setTimeout(() => {
            setMessages(prevMessages => [
                ...prevMessages,
                { text: randomMessage, sent: false, time: timestamp }
            ]);
            flatListRef.current.scrollToEnd({ animated: true });
        }, 2000); // Simulate receiving message after 2 seconds
    };

    const renderMessage = ({ item }) => (
        <View style={item.sent ? styles.sentMessageBubble : styles.receivedMessageBubble}>
            <Text style={item.sent ? styles.sentMessageText : styles.receivedMessageText}>
                {item.text}
            </Text>
            <Text style={styles.messageTime}>{item.time}</Text>
        </View>
    );

    useEffect(() => {
        flatListRef.current.scrollToEnd({ animated: true });
    }, [messages]);

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            {/* Header with Back Button */}
            <View style={styles.header}>
                <Text style={styles.chatTitle}>{groupName}</Text>
            </View>

            {/* Chat Content */}
            <View style={styles.chatContent}>
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderMessage}
                    
                />
            </View>

            {/* Input Box and Send Button */}
            <View style={styles.inputContainer}>
                <CustomTextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type your message..."
                    styleInput={styles.textInput}
                    width={"75%"}
                />
                <CustomIconButton
                    iconName="send"
                    onPress={handleSend}
                    style={styles.sendButton}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f1f1f1',
    },
    chatTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    chatContent: {
        flex: 1,
        padding: 10,
    },
    sentMessageBubble: {
        backgroundColor: 'tomato',
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        alignSelf: 'flex-end',
    },
    receivedMessageBubble: {
        backgroundColor: '#ececec',
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    sentMessageText: {
        fontSize: 16,
        color: 'white',
    },
    receivedMessageText: {
        fontSize: 16,
        color: 'black',
    },
    messageTime: {
        fontSize: 12,
        color: 'gray',
        textAlign: 'right',
        marginTop: 2,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f1f1f1',
    },
    textInput: {
        flex: 1,
        marginRight: 10,
    },
    sendButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: 'tomato',
        borderRadius: 8,
    },
});

export default ChatScreen;
