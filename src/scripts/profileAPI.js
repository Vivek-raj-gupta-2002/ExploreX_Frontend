import { API_HOST } from '@env';
import { getData } from './storage';

const API_URL_GET = `${API_HOST}/api/profiles`;
const API_URL_UPDATE = `${API_HOST}/api/profiles/update/`;



// Function to get a specific user profile by email
export const getUserProfile = async (email) => {

    try {
        const token = await getData('access');
        const response = await fetch(`${API_URL_GET}/?email=${email}`, {
            headers: {
                'method': 'GET',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data; // Return the user's profile data
    } catch (error) {
        console.error('Error fetching user profile:', error); // Log error for debugging
        return null; // Return null for further handling in the component
    }
};

// Function to create or update user profile, including data handling
export const createOrUpdateProfile = async (inputData, email) => {
    // Destructure input data for clarity

    // Prepare the profile data object
    const profileData = {
        email, // Include email as part of the profile data
        inputData
    };

    try {
        const token = await getData('access');
        // Send the profile data as a POST request to create or update the profile
        const response = await fetch(API_URL_UPDATE, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData), // Send the profile data as JSON
        });

        if (!response.ok) {
            const errorData = await response.json(); // Get error data for debugging
            // throw new Error(errorData.error || 'Network response was not ok');
            return null
        }

        const data = await response.json(); // Parse the response data
        return data; // Return the updated or created user profile data
    } catch (error) {
        // console.error('Error creating or updating user profile:', error); // Log error for debugging
        return null; // Return null for further handling in the component
    }
};