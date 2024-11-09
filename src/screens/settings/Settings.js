import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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

                    setUserProfile(null);

                    const tempUserProfile = await getData('userProfile');

                    if (!tempUserProfile) {
                        const tempData = await getUserProfile(tempUser.username);
                        if (tempData) {
                            storeData('userProfile', JSON.stringify(tempData));
                            setUserProfile(tempData);
                        }
                    } else {
                        setUserProfile(JSON.parse(tempUserProfile));
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
            <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                        {userInfo.username || userProfile?.email || 'No username available'}
                    </Text>
                    <Text style={TextStyles.subheading}>
                        {userProfile?.bio || 'No bio available'}
                    </Text>
                </View>

                {/* Custom Card for 5 Good and Bad Things */}
                <CustomCard containerStyle={styles.customCard}>
                    <Text style={TextStyles.heading3}>5 Good Things</Text>
                    {goodThings.map((item, index) => (
                        <Text key={index} style={TextStyles.paragraph}>• {item}</Text>
                    ))}

                    <Text style={TextStyles.heading3}>5 Bad Things</Text>
                    {badThings.map((item, index) => (
                        <Text key={index} style={TextStyles.paragraph}>• {item}</Text>
                    ))}
                </CustomCard>
            </ScrollView>

            {/* Update Button */}
            <TouchableOpacity style={styles.updateButton}>
                <CustomButton
                    title="Update Profile"
                    onPress={() => {
                        navigation.navigate('Update Profile', {
                            userProfile: {
                                email: userInfo.username,
                                bio: userProfile?.bio || '',
                                goodThings: goodThings.filter(habit => habit !== "No good habits listed"),
                                badThings: badThings.filter(habit => habit !== "No bad habits listed"),
                            },
                        });
                    }}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 80, // Extra padding to prevent overlap with the update button
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 10,
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
