import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoogleLoginScreen from './login';

const GoogleStack = createNativeStackNavigator();

function LoginNav({navigation}) {
    
    React.useLayoutEffect(() => {
        navigation.setOptions({ tabBarStyle: { display: 'none' } });
    })
    
    return (
        <GoogleStack.Navigator >
            <GoogleStack.Screen
                name="login"
                component={GoogleLoginScreen}
                options={{
                    headerShown: false, tabBarStyle: { display: 'none' }
                }}

            />

        </GoogleStack.Navigator>
    );
}

export default LoginNav;
