// auth.js
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { storeData } from './storage'; // Assuming storage script for async storage handling

// Sign-In Function
export const signInWithGoogle = async (navigation) => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        // Store user token and details
        await storeData('userToken', userInfo.data.idToken);
        await storeData('userDetails', userInfo.data.user);

        // Navigate to the home screen after successful sign-in
        navigation.navigate('HomeNav');
    } catch (error) {
        console.error('An error occurred during Google Sign-In:', error);
    }
};
