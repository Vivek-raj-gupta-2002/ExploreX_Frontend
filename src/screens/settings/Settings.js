import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/button';
import CustomCard from '../../components/card';
import TextStyles from '../../styles/textStyles'; // Your predefined text styles
import { getData, storeData } from '../../scripts/storage'; // Function to get data from AsyncStorage
import { getUserProfile } from '../../scripts/profileAPI';

const SettingsScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUser = await getData('userDetails');
                if (storedUser) {
                    const tempUser = JSON.parse(storedUser);
                    setUserInfo(tempUser);

                    // Set userProfile to null before fetching or loading from storage
                    setUserProfile(null);

                    const tempUserProfile = await getData('userProfile');

                    if (!tempUserProfile) {
                        // Fetch user profile if not stored in AsyncStorage
                        const tempData = await getUserProfile(tempUser.username);
                        if (tempData) {
                            storeData('userProfile', JSON.stringify(tempData));
                            setUserProfile(tempData); // Set the fetched profile data
                        }
                    } else {
                        setUserProfile(JSON.parse(tempUserProfile)); // Use the stored profile
                    }
                }
            } catch (error) {
                console.error("Error fetching user data from storage:", error);
            }
        };

        fetchUserData();

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

    // Extract good and bad habits from userProfile with fallback values
    const goodThings = [
        userProfile?.good_habit_1 || "No good habits listed",
        userProfile?.good_habit_2 || "No good habits listed",
        userProfile?.good_habit_3 || "No good habits listed",
        userProfile?.good_habit_4 || "No good habits listed",
        userProfile?.good_habit_5 || "No good habits listed",
    ];

    const badThings = [
        userProfile?.bad_habit_1 || "No bad habits listed",
        userProfile?.bad_habit_2 || "No bad habits listed",
        userProfile?.bad_habit_3 || "No bad habits listed",
        userProfile?.bad_habit_4 || "No bad habits listed",
        userProfile?.bad_habit_5 || "No bad habits listed",
    ];

    return (
        <View style={styles.container}>
            {/* Profile Info */}
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: userInfo.profile_pic || 'https://randomuser.me/api/portraits/men/4.jpg' }}
                    style={styles.profileImage}
                />
                <Text style={TextStyles.heading2}>
                    {`${userInfo.first_name || ''} ${userInfo.last_name || ''}`}
                </Text>
                <Text style={TextStyles.paragraph}>
                    {userInfo.username || userProfile.email}
                </Text>
                <Text style={TextStyles.subheading}>
                    {userProfile?.bio || 'No bio available'}
                </Text>
            </View>

            {/* Custom Card for 5 Good and Bad Things */}
            <CustomCard containerStyle={styles.customCard}>
                <Text style={TextStyles.heading3}>5 Good Things</Text>
                {goodThings.length > 0 ? (
                    goodThings.map((item, index) => (
                        <Text key={index} style={TextStyles.paragraph}>• {item}</Text>
                    ))
                ) : (
                    <Text style={TextStyles.paragraph}>No good habits available</Text>
                )}

                <Text style={TextStyles.heading3}>5 Bad Things</Text>
                {badThings.length > 0 ? (
                    badThings.map((item, index) => (
                        <Text key={index} style={TextStyles.paragraph}>• {item}</Text>
                    ))
                ) : (
                    <Text style={TextStyles.paragraph}>No bad habits available</Text>
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
