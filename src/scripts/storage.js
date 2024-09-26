// scripts/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Store a value in AsyncStorage
 * @param {string} key - The key under which to store the value
 * @param {string | object} value - The value to store (can be a string or an object)
 */
export const storeData = async (key, value) => {
    try {
        const stringValue = typeof(value) === 'string' ? value : JSON.stringify(value);
        await AsyncStorage.setItem(key, stringValue);
        // console.log(`Stored data under key: ${key}`);
    } catch (error) {
        console.error('Error storing data:', error);
    }
};

/**
 * Retrieve a value from AsyncStorage
 * @param {string} key - The key of the value to retrieve
 * @returns {Promise<string | object | null>} - The retrieved value, parsed as JSON if it was an object, or null if not found
 */
export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        // console.log(`Retrieved data for key: ${key}`);

        if(typeof(value) == 'string') {return value};
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error retrieving data:', error);
        return null;
    }
};

/**
 * Remove a value from AsyncStorage
 * @param {string} key - The key of the value to remove
 */
export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        // console.log(`Removed data for key: ${key}`);
    } catch (error) {
        console.error('Error removing data:', error);
    }
};

/**
 * Clear all data from AsyncStorage
 */
export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
        // console.log('Cleared all AsyncStorage data');
    } catch (error) {
        console.error('Error clearing storage:', error);
    }
};
