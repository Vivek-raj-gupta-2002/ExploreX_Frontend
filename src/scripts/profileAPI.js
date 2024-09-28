import {API_HOST} from '@env'


const API_URL_GET = `${API_HOST}/api/profiles`;

// Function to get a specific user profile by email
export const getUserProfile = async (email) => {
    try {
        const response = await fetch(`${API_URL_GET}/?email=${email}`);
        
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data; // Return the user's profile data
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null; // Throw error for further handling in component
    }
};


