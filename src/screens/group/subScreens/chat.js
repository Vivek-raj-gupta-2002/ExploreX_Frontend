import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView } from 'react-native';
import CustomIconButton from '../../../components/iconButton';
import CustomTextInput from '../../../components/input';
import TextStyles from '../../../styles/textStyles';
import {useChat} from '../../../scripts/useChat';  // Import useChat hook
import { getData } from '../../../scripts/storage';

const ChatScreen = ({ navigation, route }) => {
    const { groupName, chatId, token, email } = route.params;  // Assuming chatId and token are passed via route params
    
    const [message, setMessage] = useState('');
    const flatListRef = useRef(null);

    // Use the useChat hook to handle WebSocket connection and real-time messaging
    const { messages, sendMessage } = useChat(chatId, token, email);


    // Scroll to the bottom of the FlatList when messages update
    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    const handleSend = () => {
        if (message.trim()) {
            sendMessage(message.trim());  // Send message through WebSocket
            setMessage('');  // Clear input field
        }
    };

    const renderMessage = ({ item }) => (
        <View style={item.sender ? styles.sentMessageBubble : styles.receivedMessageBubble}>
            <Text style={item.sender ? styles.sentMessageText : styles.receivedMessageText}>
                {item.message}
            </Text>
            <Text style={styles.messageTime}>{item.time}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
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
