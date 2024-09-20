import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import HomeScreen from '../screens/Home';
import AnalyticsScreen from '../screens/Analitics';
import GroupScreen from '../screens/Groups';
import SettingsScreen from '../screens/Settings';
import NotesScreen from './subScreens/notes';
import LeaderScreen from './subScreens/leaderBoard';
import AddPostScreen from './subScreens/addPost';
import UpdateProfileScreen from './subScreens/updateProfile';

const Stack = createNativeStackNavigator();

export default function SubNav() {
    return(

        <Stack.Navigator screenOptions={{ headerShown: false }} >
            {/* Define your screens here */}
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Analytics" component={AnalyticsScreen} />
            <Stack.Screen name="Groups" component={GroupScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Notes" component={NotesScreen} />
            <Stack.Screen name="leaderBoard" component={LeaderScreen} />
            <Stack.Screen name="addPost" component={AddPostScreen} />
            <Stack.Screen name="updateProfile" component={UpdateProfileScreen} />


        </Stack.Navigator>

    );
    
}