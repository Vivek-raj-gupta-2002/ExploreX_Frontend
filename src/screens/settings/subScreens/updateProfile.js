import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert, StyleSheet } from 'react-native';
import CustomButton from '../../../components/button';
import TextStyles from '../../../styles/textStyles';
import { createOrUpdateProfile } from '../../../scripts/profileAPI';
import { storeData } from '../../../scripts/storage';

const UpdateProfileScreen = ({ navigation, route }) => {
    const { userProfile } = route.params;
    const { email, bio: initialBio, goodThings: initialGoodThings, badThings: initialBadThings } = userProfile || {
        email: '',
        bio: '',
        goodThings: [],
        badThings: [],
    };

    const [bio, setBio] = useState(initialBio || '');
    const [goodThings, setGoodThings] = useState(
        Array.isArray(initialGoodThings) && initialGoodThings.length ? initialGoodThings : ['', '', '', '', '']
    );
    const [badThings, setBadThings] = useState(
        Array.isArray(initialBadThings) && initialBadThings.length ? initialBadThings : ['', '', '', '', '']
    );

    const handleUpdateProfile = async () => {
        if (!bio.trim()) {
            Alert.alert('Error', 'Please enter your bio.');
            return;
        }

        if (goodThings.every(item => !item.trim()) || badThings.every(item => !item.trim())) {
            Alert.alert('Error', 'Please enter at least one good and bad habit.');
            return;
        }

        const profileData = {
            email,
            bio,
            bad_habit_1: badThings[0],
            bad_habit_2: badThings[1],
            bad_habit_3: badThings[2],
            bad_habit_4: badThings[3],
            bad_habit_5: badThings[4],
            good_habit_1: goodThings[0],
            good_habit_2: goodThings[1],
            good_habit_3: goodThings[2],
            good_habit_4: goodThings[3],
            good_habit_5: goodThings[4],
        };

        // Call the API to create or update the profile
        const result = await createOrUpdateProfile(profileData, email);

        if (result) {
            // Store the updated profile data in AsyncStorage
            await storeData('userProfile', JSON.stringify(profileData));
            Alert.alert('Success', 'Profile updated successfully!');
            navigation.goBack();
        } else {
            Alert.alert('Error', 'Failed to update profile. Please try again.');
        }
    };

    const updateGoodThings = (index, text) => {
        const updatedGoodThings = [...goodThings];
        updatedGoodThings[index] = text;
        setGoodThings(updatedGoodThings);
    };

    const updateBadThings = (index, text) => {
        const updatedBadThings = [...badThings];
        updatedBadThings[index] = text;
        setBadThings(updatedBadThings);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={TextStyles.subheading}>Bio</Text>
                <TextInput
                    style={styles.input}
                    value={bio}
                    onChangeText={setBio}
                    placeholder="Enter your bio"
                    multiline
                />

                <Text style={TextStyles.subheading}>5 Good Things</Text>
                {goodThings.map((item, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        value={item}
                        placeholder={`Good thing #${index + 1}`}
                        onChangeText={(text) => updateGoodThings(index, text)}
                    />
                ))}

                <Text style={TextStyles.subheading}>5 Bad Things</Text>
                {badThings.map((item, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        value={item}
                        placeholder={`Bad thing #${index + 1}`}
                        onChangeText={(text) => updateBadThings(index, text)}
                    />
                ))}

                <CustomButton title="Update Profile" onPress={handleUpdateProfile} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
});

export default UpdateProfileScreen;
