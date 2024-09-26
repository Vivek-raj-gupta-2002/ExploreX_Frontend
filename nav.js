import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeNav from './src/screens/home/HomeNav';
import GroupNav from './src/screens/group/GroupNav';
import AnalyticsNav from './src/screens/analytics/AnaliticsNav';
import SettingsNav from './src/screens/settings/SettingsNav';
import LoginNav from './src/screens/login/loginNav';
import { getData } from './src/scripts/storage'; // Assuming you're using AsyncStorage or a similar module

const icons = ({ route }) => ({
    tabBarShowLabel: false,
    tabBarIcon: ({ color }) => {
        let iconName;

        switch (route.name) {
            case 'HomeNav':
                iconName = 'home-outline';
                break;
            case 'AnalyticsNav':
                iconName = 'analytics-outline';
                break;
            case 'GroupsNav':
                iconName = 'people-outline';
                break;
            case 'SettingsNav':
                iconName = 'settings-outline';
                break;
            default:
                iconName = 'home-outline';
        }

        return <Ionicons name={iconName} size={30} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
});

const Tab = createBottomTabNavigator();

export default function BottomNavBar() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = await getData('userToken');
            setIsAuth(!!token); // Update isAuth based on whether a token exists
        };

        checkAuthStatus();
    }, []);

    if (isAuth === null) {
        // Show a loading spinner while checking auth status
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="tomato" />
            </View>
        );
    }

    return (
        <Tab.Navigator screenOptions={icons}>
            {isAuth ? (
                <>
                    <Tab.Screen
                        name="HomeNav"
                        component={HomeNav}
                        options={{ headerShown: false }}
                    />
                    <Tab.Screen
                        name="AnalyticsNav"
                        component={AnalyticsNav}
                        options={{ headerShown: false }}
                    />
                    <Tab.Screen
                        name="GroupsNav"
                        component={GroupNav}
                        options={{ headerShown: false }}
                    />
                    <Tab.Screen
                        name="SettingsNav"
                        component={SettingsNav}
                        options={{ headerShown: false }}
                    />
                    <Tab.Screen
                        name="LoginNav"
                        component={LoginNav}
                        options={{ headerShown: false, tabBarButton: () => null }}
                    />
                </>
            ) : (
                <Tab.Screen
                    name="LoginNav"
                    component={LoginNav}
                    options={{ headerShown: false, tabBarButton: () => null }}
                />
            )}
        </Tab.Navigator>
    );
}
