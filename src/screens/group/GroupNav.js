import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GroupScreen from './Groups';
import ChatScreen from './subScreens/chat'; // Assuming you want to navigate to chat
import CustomButton from '../../components/button';
import CustomIconButton from '../../components/iconButton';

const GroupStack = createNativeStackNavigator();

function GroupNav() {
    return (
        <GroupStack.Navigator>
            <GroupStack.Screen name="Groups" component={GroupScreen} />

            <GroupStack.Screen 
            name="chat" 
            component={ChatScreen} 
                options={({ route, navigation }) => ({
                    title: route.params.groupName, // Dynamic title for Chat
                    headerRight: () => (
                        <CustomIconButton
                            onPress={() => alert('Button pressed!')} // Action for button
                            iconName="exit-outline"
                            color="tomato" // Change button color if needed
                            
                        />
                    ),
                })} 
            />
        </GroupStack.Navigator>
    );
}

export default GroupNav;
