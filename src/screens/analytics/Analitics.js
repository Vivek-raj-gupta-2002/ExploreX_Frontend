import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeModules } from 'react-native'; // Import NativeModules
import CustomCard from '../../components/card'; // Adjust the import path as necessary
import TextStyles from '../../styles/textStyles'; // Adjust the import path as necessary
import { getData } from '../../scripts/storage'; // Ensure you have a function to get data from AsyncStorage

const { ScreenTimeModule } = NativeModules; // Get the native module

const AnalyticsScreen = ({ navigation }) => {
    const [userSummary, setUserSummary] = useState(null);
    const [screenTimeData, setScreenTimeData] = useState({ topApps: {}, totalTime: 0 });

    // Comprehensive mapping for known apps
    const appNameMapping = {
        'com.google.android.youtube': 'YouTube',
        'com.facebook.katana': 'Facebook',
        'com.instagram.android': 'Instagram',
        'com.whatsapp': 'WhatsApp',
        'com.twitter.android': 'Twitter',
        // Add more known app mappings as needed
    };

    // Function to fetch user summary data
    const fetchUserSummary = async () => {
        const summary = await getData('userSum'); // Adjust the key as necessary
        setUserSummary(JSON.parse(summary));
        
    };

    // Function to fetch screen time data
    const fetchScreenTimeData = async () => {
        ScreenTimeModule.getScreenTimeData()
            .then((data) => {
                setScreenTimeData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        // Fetch data when the component mounts
        fetchUserSummary();
        fetchScreenTimeData();

        // Listener for when the screen comes into focus
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUserSummary();
            fetchScreenTimeData();

            console.log(userSummary)
        });

        // Cleanup listener on unmount
        return unsubscribe;
    }, [navigation]); // Add navigation to dependency array

    return (
        <ScrollView style={styles.container}>
            {/* Card for Top 3 Applications for Screen Usage */}
            <CustomCard containerStyle={styles.cardContainer}>
                <Text style={TextStyles.heading2}>Top 3 Applications</Text>
                {Object.entries(screenTimeData.topApps).length > 0 ? (
                    Object.entries(screenTimeData.topApps).map(([appName, time], index) => {
                        const displayName = appNameMapping[appName] || appName.split('.').pop(); // Use mapped name or app name
                        return (
                            <Text key={index} style={TextStyles.paragraph}>
                                {index + 1}. {displayName} - {time} secs
                            </Text>
                        );
                    })
                ) : (
                    <Text style={TextStyles.paragraph}>No data available</Text>
                )}
                <Text style={TextStyles.subheading}>Total Screen Time: {screenTimeData.totalTime} secs</Text>
            </CustomCard>

            {/* Card for User Mood Analysis */}
            <CustomCard containerStyle={styles.cardContainer}>
                <Text style={TextStyles.heading2}>User Mood Analysis</Text>
                <Text style={TextStyles.paragraph}>{userSummary?.mood || ""}</Text>
            </CustomCard>

            {/* Card for User Summary */}
            <CustomCard containerStyle={styles.cardContainer}>
                <Text style={TextStyles.heading2}>User Summary</Text>
                <Text style={TextStyles.paragraph}>{userSummary?.summary || 0}</Text>
            </CustomCard>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5', // Light background for contrast
    },
    cardContainer: {
        marginVertical: 10, // Space between cards
    },
});

export default AnalyticsScreen;
