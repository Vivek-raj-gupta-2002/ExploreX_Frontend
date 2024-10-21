import { API_HOST } from '@env';
import { getData } from './storage';

export const GetPost = async () => {
    try {
        const token = await getData('access');
        const response = await fetch(`${API_HOST}/api/get_posts/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Pass JWT token for authentication
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            // console.log('notes posts retrieved successfully:', jsonResponse);
            return jsonResponse;  // Return the retrieved data
        } else {
            console.error('Failed to retrieve posts entry:', response.status);
            return null;  // Return null in case of failure
        }
    } catch (error) {
        console.error('Error retrieving posts entry:', error);
        return null;  // Return null in case of error
    }
};


// Function to handle API POST requests
export const CreatePost = async (data) => {
    try {
        const token = await getData('access');  // Retrieve token from storage
        const response = await fetch(`${API_HOST}/api/posts/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,  // Attach the JWT token for auth
                'Content-Type': 'multipart/form-data',  // Specify JSON content type
                
            },
            body: data,  // Send body as JSON
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(`POST create was successful:`, jsonResponse);
            return jsonResponse;  // Return the server's response
        } else {
            console.error(`POST creation failed:`, response.status);
            return null;  // Return null on failure
        }
    } catch (error) {
        console.error(`Error creating post:`, error);
        return null;  // Handle error and return null
    }
};
