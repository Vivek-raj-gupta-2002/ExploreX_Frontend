import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
import NotesScreen from './subScreens/notes';
import LeaderScreen from './subScreens/leaderBoard';
import AddPostScreen from './subScreens/addPost';
import TextStyles from '../../styles/textStyles';

const HomeStack = createNativeStackNavigator();

function HomeNav() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home"
                component={HomeScreen}
                options={{ 
                    title: 'ExploreX',
                    headerTitleStyle: [TextStyles.heading3,  {color: 'tomato'}],

                }}
                
            />

            <HomeStack.Screen
                name="Notes"
                component={NotesScreen}
            />

            <HomeStack.Screen
                name="New Post"
                component={AddPostScreen}
            />

            <HomeStack.Screen
                name="Leader Board"
                component={LeaderScreen}
            />
        </HomeStack.Navigator>
    );
}

export default HomeNav;
