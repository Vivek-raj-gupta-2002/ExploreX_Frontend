import { API_HOST } from '../scripts/var';
import { getData } from './storage';

export const createGoodBadEntry = async (good, bad) => {
    try {
        const token = await getData('access');
        const response = await fetch(`${API_HOST}/api/goodbad/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,  // Pass JWT token for authentication
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                good, bad
            }),
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log('GoodBad entry created successfully:', jsonResponse);
        } else {
            console.error('Failed to create GoodBad entry:', response.status);
        }
    } catch (error) {
        console.error('Error creating GoodBad entry:', error);
    }
};

export const getGoodBadEntry = async (date) => {
    try {
        const token = await getData('access');
        const response = await fetch(`${API_HOST}/api/goodbad/${date}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Pass JWT token for authentication
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log('GoodBad entry retrieved successfully:', jsonResponse);
            return jsonResponse;  // Return the retrieved data
        } else {
            console.error('Failed to retrieve GoodBad entry:', response.status);
            return null;  // Return null in case of failure
        }
    } catch (error) {
        console.error('Error retrieving GoodBad entry:', error);
        return null;  // Return null in case of error
    }
};
