import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeNav from './src/screens/home/HomeNav';
import GroupNav from './src/screens/group/GroupNav';
import AnaliticsNav from './src/screens/analytics/AnaliticsNav';
import SettingsNav from './src/screens/settings/SettingsNav';

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
    return (
        <Tab.Navigator screenOptions={icons}>
            <Tab.Screen
                name="HomeNav"
                component={HomeNav}
                options={{ headerShown: false }}
            />

            <Tab.Screen
                name="AnalyticsNav"
                component={AnaliticsNav}
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
        </Tab.Navigator>
    );
}
