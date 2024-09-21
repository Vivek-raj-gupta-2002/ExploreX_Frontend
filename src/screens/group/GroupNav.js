import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GroupScreen from './Groups';
import ChatScreen from './subScreens/chat'; // Assuming you want to navigate to chat

const GroupStack = createNativeStackNavigator();

function GroupNav() {
    return (
        <GroupStack.Navigator screenOptions={{ headerShown: false }}>
            <GroupStack.Screen name="Groups" component={GroupScreen} />
            <GroupStack.Screen name="chat" component={ChatScreen} />
        </GroupStack.Navigator>
    );
}

export default GroupNav;
