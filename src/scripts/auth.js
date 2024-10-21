import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { clearStorage, removeData, storeData } from './storage'; // Assuming storage script for async storage handling
import { API_HOST } from '@env';

export const handleLogout = async (navigation) => {
    try {

        await GoogleSignin.signOut(); // Sign out from Google
        await clearStorage();
        alert('Successfully logged out');

        navigation.navigate('LoginNav'); // Redirect to login screen
    } catch (error) {
        console.error('Error during sign out:', error);
        alert('Failed to log out');
    }
};

// Sign-In Function
export const signInWithGoogle = async (navigation) => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        // Extract ID token
        const idToken = userInfo.data;

        // Send ID token to the backend using fetch
        const response = await fetch(`${API_HOST}/api/google-login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "token": idToken.idToken,
            }),
        });

        if (!response.ok) {
            // console.log(response);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Store the token and user details from backend
        const { access, refresh, user } = data;

        await storeData('authToken', refresh);
        await storeData('userDetails', user);
        await storeData('access', access);



        // Navigate to the home screen after successful sign-in
        navigation.navigate('HomeNav');
    } catch (error) {
        console.error('An error occurred during Google Sign-In:', error);
    }
};
