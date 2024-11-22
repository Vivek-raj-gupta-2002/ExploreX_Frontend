import Constants from 'expo-constants';
import { GOOGLE_WEB_CLIENT_ID as ENV_GOOGLE_WEB_CLIENT_ID, API_HOST as ENV_API_HOST, CHAT_HOST as ENV_CHAT_HOST } from '@env';

// Attempt to get variables from Constants.extra
const {
    API_HOST: CONST_API_HOST,
    CHAT_HOST: CONST_CHAT_HOST,
    GOOGLE_WEB_CLIENT_ID: CONST_GOOGLE_WEB_CLIENT_ID,
} = Constants.extra || {};

// Fallback to environment variables if Constants.extra is undefined
const API_HOST = CONST_API_HOST || ENV_API_HOST;
const CHAT_HOST = CONST_CHAT_HOST || ENV_CHAT_HOST;
const GOOGLE_WEB_CLIENT_ID = CONST_GOOGLE_WEB_CLIENT_ID || ENV_GOOGLE_WEB_CLIENT_ID;

// Export variables for use in other files
export { API_HOST, CHAT_HOST, GOOGLE_WEB_CLIENT_ID };
