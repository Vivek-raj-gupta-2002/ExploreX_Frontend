import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView } from 'react-native';
import CustomIconButton from '../../../components/iconButton';
import CustomTextInput from '../../../components/input';
import CustomButton from '../../../components/button';

const ChatScreen = ({ navigation, route }) => {
    const { groupName } = route.params; // Assuming you're passing the group name as a parameter
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSend = () => {
        if (message.trim()) {
            setMessages(prevMessages => [...prevMessages, message.trim()]);
            setMessage(''); // Clear the input field after sending
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            {/* Header with Back Button */}
            <View style={styles.header}>
                <CustomIconButton
                    iconName="arrow-back"
                    onPress={() => navigation.goBack()} // Go back to the Groups screen
                />
                <Text style={styles.chatTitle}>{groupName}</Text>
                <CustomIconButton
                    iconName="exit-outline"
                    onPress={() => console.log("Leave Group")}
                />
            </View>

            {/* Chat Content */}
            <View style={styles.chatContent}>
                <FlatList
                    data={messages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.messageBubble}>
                            <Text style={styles.messageText}>{item}</Text>
                        </View>
                    )}
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
                <CustomButton
                    title="Send"
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
    messageBubble: {
        backgroundColor: '#ececec',
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f1f1f1',
    },
    textInput: {
        flex: 1, // Ensures the text input takes all available space
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
