import { NativeModules } from 'react-native';

const { ScreenTimeModule } = NativeModules;

export const getScreenTimeData = async () => {
    try {
        const data = await ScreenTimeModule.getScreenTimeData();
        return data;
    } catch (error) {
        console.error("Failed to fetch screen time data", error);
        return {};
    }
};
