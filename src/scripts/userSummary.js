import { API_HOST } from '@env';
import { getData } from './storage';

export const GetSummary = async () => {
    try {
        const token = await getData('access');
        const response = await fetch(`${API_HOST}/agent/latest_summary`, {
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
