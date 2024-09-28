import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/button';
import CustomCard from '../../components/card';
import TextStyles from '../../styles/textStyles'; // Your predefined text styles
import { getData } from '../../scripts/storage'; // Function to get data from AsyncStorage

const SettingsScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // Function to fetch data from AsyncStorage
        const fetchUserData = async () => {
            try {
                const storedUser = await getData('userDetails');
                if (storedUser) {
                    setUserInfo(JSON.parse(storedUser)); // Assuming storedUser is in JSON string format
                }
            } catch (error) {
                console.error("Error fetching user data from storage:", error);
            }
        };

        fetchUserData();

        // Optionally, you can add logic to refetch data whenever screen is focused
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUserData();
        });

        return unsubscribe;
    }, [navigation]);

    if (!userInfo) {
        return (
            <View style={styles.container}>
                <Text style={TextStyles.paragraph}>Loading user data...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Profile Info */}
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: userInfo.profile_pic || 'https://randomuser.me/api/portraits/men/4.jpg' }}
                    style={styles.profileImage}
                />
                <Text style={TextStyles.heading2}>{userInfo.first_name + " " + userInfo.last_name || ''}</Text>
                <Text style={TextStyles.paragraph}>{userInfo.username || 'john.doe@example.com'}</Text>
                <Text style={TextStyles.subheading}>{userInfo.bio || 'Lover of tech, coding, and coffee!'}</Text>
            </View>

            {/* Custom Card for 5 Good and Bad Things */}
            <CustomCard containerStyle={styles.customCard}>
                <Text style={TextStyles.heading3}>5 Good Things</Text>
                {userInfo.goodThings?.map((item, index) => (
                    <Text key={index} style={TextStyles.paragraph}>• {item}</Text>
                )) || (
                        <Text style={TextStyles.paragraph}>No data available</Text>
                    )}

                <Text style={TextStyles.heading3}>5 Bad Things</Text>
                {userInfo.badThings?.map((item, index) => (
                    <Text key={index} style={TextStyles.paragraph}>• {item}</Text>
                )) || (
                        <Text style={TextStyles.paragraph}>No data available</Text>
                    )}
            </CustomCard>

            {/* Update Button */}
            <TouchableOpacity style={styles.updateButton}>
                <CustomButton title="Update Profile" onPress={() => { navigation.navigate('Update Profile') }} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 5,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    customCard: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 30,
    },
    updateButton: {
        position: 'absolute',
        bottom: 20,
        right: 30,
    },
});

export default SettingsScreen;
