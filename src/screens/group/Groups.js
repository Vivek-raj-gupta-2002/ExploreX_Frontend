import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import TextStyles from '../../styles/textStyles';
import { fetchChats } from '../../scripts/useChat';
import { getData } from '../../scripts/storage';

const GroupScreen = ({ navigation }) => {
    const [groups, setGroups] = useState([]);
    const [token, setToken] = useState();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getChats = async () => {
            setLoading(true); // Start loading
            try {
                const [data, tokenValue, userInfoJson] = await Promise.all([
                    fetchChats(),
                    getData('access'),
                    getData('userDetails'),
                ]);

                const userInfo = JSON.parse(userInfoJson);
                setGroups(data);
                setToken(tokenValue);
                setUser(userInfo);
            } catch (error) {
                console.error('Failed to load chats or user info:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        getChats();

        const unsubscribe = navigation.addListener('focus', getChats);
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (user && user.id) {
            setGroups((prevGroups) => {
                // Check if AI Chat is already in the list
                const aiChatExists = prevGroups.some((group) => group.id === `AI_${user.id}`);
                if (!aiChatExists) {
                    const aiChat = { id: `AI_${user.id}`, title: 'AI Chat', undelivered_message_count: 0 };
                    return [aiChat, ...prevGroups];
                }
                return prevGroups;
            });
        }
    }, [user]);

    const navigateToChat = (groupName, chatId) => {
        if (user) {
            navigation.navigate('chat', { groupName, chatId, token, email: user.email });
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#FF4D4D" style={styles.loader} />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollView}>
                    {groups.map((group) => (
                        <TouchableOpacity
                            key={group.id}
                            style={styles.groupItem}
                            onPress={() => navigateToChat(group.title, group.id)}
                        >
                            <View style={styles.groupInfo}>
                                <Text style={TextStyles.paragraph}>{group.title}</Text>
                            </View>
                            {group.undelivered_message_count > 0 && (
                                <View style={styles.messageCountContainer}>
                                    <Text style={styles.messageCountText}>
                                        {group.undelivered_message_count > 5 ? '5+' : group.undelivered_message_count}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    messageCountContainer: {
        backgroundColor: '#FF4D4D',
        borderRadius: 15,
        minWidth: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageCountText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default GroupScreen;
