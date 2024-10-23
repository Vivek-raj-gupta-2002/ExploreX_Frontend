import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import BottomNavBar from './nav';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { API_HOST, CHAT_HOST } from '@env';

export default function App() {
  console.log(API_HOST, CHAT_HOST)

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={{ flex: 1, height: 20, marginTop: 25 }}>
        <NavigationContainer>
          <BottomNavBar />
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
