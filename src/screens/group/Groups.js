import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import TextStyles from '../../styles/textStyles';
import { fetchChats } from '../../scripts/useChat';
import { getData } from '../../scripts/storage';

const GroupScreen = ({ navigation }) => {
    const [groups, setGroups] = useState([]);
    const [token, setToken] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        const getChats = async () => {
            try {
                const [data, tokenValue, userInfoJson] = await Promise.all([
                    fetchChats(),
                    getData('access'),
                    getData('userDetails')
                ]);

                const userInfo = JSON.parse(userInfoJson);
                setGroups(data);
                setToken(tokenValue);
                setUser(userInfo);

                
            } catch (error) {
                console.error("Failed to load chats or user info:", error);
            }
        };

        getChats();

        const unsubscribe = navigation.addListener('focus', getChats);
        return unsubscribe;
    }, [navigation]);

    const navigateToChat = (groupName, chatId) => {
        navigation.navigate('chat', { groupName, chatId, token, email: user.email });
    };

    const getUserSpecificAiRoomId = (userId) => `AI_${userId}`;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {/* AI Chat Room with a unique user-specific ID */}
                <TouchableOpacity
                    key={`AI`}
                    style={styles.groupItem}
                    onPress={() => navigateToChat("AI Chat", getUserSpecificAiRoomId(user.id))}
                >
                    <View style={styles.groupInfo}>
                        <Text style={TextStyles.paragraph}>AI Chat</Text>
                    </View>
                </TouchableOpacity>

                {/* Dynamically loaded group chats */}
                {groups.map((group) => (
                    <TouchableOpacity
                        key={group.id}
                        style={styles.groupItem}
                        onPress={() => navigateToChat(group.title, group.id)}
                    >
                        <View style={styles.groupInfo}>
                            <Text style={TextStyles.paragraph}>{group.title}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    scrollView: {
        paddingBottom: 20,
    },
    groupItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    groupInfo: {
        flex: 1,
    },
});

export default GroupScreen;
