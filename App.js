import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomNavBar from './nav';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginNav from './src/screens/login/loginNav';

export default function App({navigate}) {
  const [isAuth, Setauth] = useState(false);

  return (

    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={{ flex: 1, height: 20, marginTop:25}}>
        <NavigationContainer>
        {isAuth ? (
          <BottomNavBar />
        ) : (
          <LoginNav/>
        )}
        </NavigationContainer>
      </SafeAreaView>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
