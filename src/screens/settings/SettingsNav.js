import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from './Settings';
import UpdateProfileScreen from './subScreens/updateProfile';
import CustomIconButton from '../../components/iconButton';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleLogout } from '../../scripts/auth';


const SettingsStack = createNativeStackNavigator();

function SettingsNav({ navigation }) { // Accept navigation prop
    
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={({ navigation }) => ({
                    headerRight: () => (
                        <CustomIconButton
                            onPress={()=> {handleLogout(navigation)}} // Call handleLogout on button press
                            iconName="exit-outline"
                            color="tomato" // Change button color if needed
                        />
                    ),
                })}
            />
            <SettingsStack.Screen name="Update Profile" component={UpdateProfileScreen} />
        </SettingsStack.Navigator>
    );
}

export default SettingsNav;
