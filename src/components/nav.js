import * as React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import GroupScreen from '../screens/Groups';
import AnalyticsScreen from '../screens/Analitics';
import SettingsScreen from '../screens/Settings';


const icons = ({ route }) => ({

    tabBarShowLabel: false,
    tabBarIcon: ({ color, size }) => {
        let iconName;

        switch (route.name) {
            case 'Home':
                iconName = 'home-outline';
                break;
            case 'Analytics':
                iconName = 'analytics-outline';
                break;
            case 'Groups':
                iconName = 'people-outline';
                break;
            case 'Settings':
                iconName = 'settings-outline';
                break;
            default:
                iconName = 'home-outline';
        }

        return <Ionicons name={iconName} size={30} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
})


const Tab = createBottomTabNavigator();

export default function BottomNavBar() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={icons}>
                <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'ExploreX' }} />
                <Tab.Screen name="Analytics" component={AnalyticsScreen} />
                <Tab.Screen name="Groups" component={GroupScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
