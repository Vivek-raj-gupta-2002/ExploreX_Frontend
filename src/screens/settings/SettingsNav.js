import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from './Settings';
import UpdateProfileScreen from './subScreens/updateProfile';

const SettingsStack = createNativeStackNavigator();

function SettingsNav() {
    return (
        <SettingsStack.Navigator >
            <SettingsStack.Screen name="Settings" component={SettingsScreen} />
            <SettingsStack.Screen name="Update Profile" component={UpdateProfileScreen} />
        </SettingsStack.Navigator>
    );
}

export default SettingsNav;
