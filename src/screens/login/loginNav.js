import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoogleLoginScreen from './login';

const GoogleStack = createNativeStackNavigator();

function LoginNav() {
    return (
        <GoogleStack.Navigator>
            <GoogleStack.Screen
                name="login"
                component={GoogleLoginScreen}
                options={{
                    headerShown: false
                }}

            />

        </GoogleStack.Navigator>
    );
}

export default LoginNav;
