import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LinearGradient } from 'expo-linear-gradient';
import { GOOGLE_WEB_CLIENT_ID } from '@env';
import { signInWithGoogle } from '../../scripts/auth'; // Import the sign-in function

const { width, height } = Dimensions.get('window');
const LoginLogo = require('../../assets/googleLoginLogo.png');

const GoogleLoginScreen = ({ navigation }) => {
    useEffect(() => {
        // Configure Google Sign-In
        GoogleSignin.configure({
            webClientId: GOOGLE_WEB_CLIENT_ID,
        });
    }, []);

    return (
        <View style={styles.container}>
            {/* Multiple Wavy Gradients */}
            <View style={styles.gradientContainer}>
                <LinearGradient colors={['tomato', 'orange']} style={styles.waveOne} />
                <LinearGradient colors={['orange', 'transparent']} style={styles.waveTwo} />
                <LinearGradient colors={['tomato', 'transparent']} style={styles.waveThree} />
                <LinearGradient colors={['orange', 'transparent']} style={styles.waveFour} />
            </View>

            {/* Logo and App Name */}
            <View style={styles.logoContainer}>
                <Text style={styles.appName}>ExploreX</Text>
            </View>

            {/* Google Login Button */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.googleButton} onPress={() => signInWithGoogle(navigation)}>
                    <Image source={LoginLogo} style={styles.googleLogo} />
                    <Text style={styles.googleButtonText}>Login with Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    gradientContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '50%', // Covers half of the screen with waves
    },
    waveOne: {
        position: 'absolute',
        width: '120%',
        height: '100%',
        borderBottomLeftRadius: 300,
        borderBottomRightRadius: 300,
        top: 0,
        zIndex: 4,
    },
    waveTwo: {
        position: 'absolute',
        width: '115%',
        height: '95%',
        borderBottomLeftRadius: 280,
        borderBottomRightRadius: 280,
        top: 30, // Offset each wave slightly
        zIndex: 3,
    },
    waveThree: {
        position: 'absolute',
        width: '110%',
        height: '90%',
        borderBottomLeftRadius: 260,
        borderBottomRightRadius: 260,
        top: 60,
        zIndex: 2,
    },
    waveFour: {
        position: 'absolute',
        width: '105%',
        height: '85%',
        borderBottomLeftRadius: 240,
        borderBottomRightRadius: 240,
        top: 90,
        zIndex: 1,
    },
    logoContainer: {
        marginTop: height * 0.35, // Adjust the logo's position below the waves
        alignItems: 'center',
        zIndex: 5,
    },
    appName: {
        fontSize: 48,
        color: 'white',
        fontWeight: 'bold',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
        width: '100%',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'tomato',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    googleLogo: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    googleButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default GoogleLoginScreen;
