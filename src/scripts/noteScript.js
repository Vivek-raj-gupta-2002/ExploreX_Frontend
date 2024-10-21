import { API_HOST } from '@env';
import { getData } from './storage';

export const createNotesEntry = async (note) => {
    try {
        const token = await getData('access');
        const response = await fetch(`${API_HOST}/api/notes/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,  // Pass JWT token for authentication
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                note
            }),
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log('notes entry created successfully:', jsonResponse);
        } else {
            console.error('Failed to create notes entry:', response.status);
        }
    } catch (error) {
        console.error('Error creating notes entry:', error);
    }
};

export const getNotesEntry = async (date) => {
    try {
        const token = await getData('access');
        const response = await fetch(`${API_HOST}/api/notes/${date}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Pass JWT token for authentication
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log('notes entry retrieved successfully:', jsonResponse);
            return jsonResponse;  // Return the retrieved data
        } else {
            console.error('Failed to retrieve notes entry:', response.status);
            return null;  // Return null in case of failure
        }
    } catch (error) {
        console.error('Error retrieving notes entry:', error);
        return null;  // Return null in case of error
    }
};
