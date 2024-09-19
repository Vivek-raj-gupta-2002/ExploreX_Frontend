import * as React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import GroupScreen from '../screens/Groups';
import AnalyticsScreen from '../screens/Analitics';
import SettingsScreen from '../screens/Settings';
import NotesScreen from './subScreens/notes';
import SubNav from './subNav';


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
        <>
            <Tab.Navigator screenOptions={icons}>
                <Tab.Screen name="nav" component={SubNav} options={{
                    title: 'ExploreX',
                    headerTintColor: 'tomato',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 23,
                    },
                }} />
                <Tab.Screen name="Analytics" component={AnalyticsScreen} />
                <Tab.Screen name="Groups" component={GroupScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </>
    );
}
