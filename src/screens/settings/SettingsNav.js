import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from './Settings';
import UpdateProfileScreen from './subScreens/updateProfile';

const SettingsStack = createNativeStackNavigator();

function SettingsNav() {
    return (
        <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
            <SettingsStack.Screen name="Settings" component={SettingsScreen} />
            <SettingsStack.Screen name="updateProfile" component={UpdateProfileScreen} />
        </SettingsStack.Navigator>
    );
}

export default SettingsNav;
