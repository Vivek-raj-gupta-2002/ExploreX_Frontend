import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GroupScreen from './Groups';
import ChatScreen from './subScreens/chat';
import CustomIconButton from '../../components/iconButton';
import { confirmDeleteChat } from '../../scripts/useChat';
import { removeData } from '../../scripts/storage';

const GroupStack = createNativeStackNavigator();

function GroupNav() {
    return (
        <GroupStack.Navigator>
            <GroupStack.Screen
                name="Groups"
                component={GroupScreen}
                options={{ title: "Chats" }}
            />

            <GroupStack.Screen
                name="chat"
                component={ChatScreen}
                options={({ route, navigation }) => {
                    const { groupName, chatId, token } = route.params;

                    return {
                        title: groupName, // Dynamic title for Chat
                        headerRight: () => (
                            groupName === "AI Chat" ? (
                                <CustomIconButton
                                    onPress={async () => {
                                        await removeData('AI'); // Clear AI Chat
                                        navigation.goBack(); // Navigate back after clearing data
                                    }}
                                    iconName="trash-outline"
                                    color="tomato"
                                />
                            ) : (
                                <CustomIconButton
                                    onPress={() => confirmDeleteChat(chatId, token, navigation)} // Leave the chat
                                    iconName="exit-outline"
                                    color="tomato"
                                />
                            )
                        ),
                    };
                }}
            />
        </GroupStack.Navigator>
    );
}

export default GroupNav;
