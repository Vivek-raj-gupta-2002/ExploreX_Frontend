import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert, StyleSheet, Platform } from 'react-native';
import CustomButton from '../../../components/button';
import TextStyles from '../../../styles/textStyles';
import { createOrUpdateProfile } from '../../../scripts/profileAPI';
import { storeData } from '../../../scripts/storage';
import DateTimePicker from '@react-native-community/datetimepicker'; // Ensure this is installed correctly

const UpdateProfileScreen = ({ navigation, route }) => {
    const { userProfile } = route.params;
    const { email, bio: initialBio, goodThings: initialGoodThings, badThings: initialBadThings, dob: initialDob } = userProfile || {
        email: '',
        bio: '',
        goodThings: [],
        badThings: [],
        dob: '',
    };

    const [bio, setBio] = useState(initialBio || '');
    const [dob, setDob] = useState(initialDob || '');
    const [showDobPicker, setShowDobPicker] = useState(false);  // State for Date Picker visibility
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

        if (!dob.trim()) {
            Alert.alert('Error', 'Please enter your date of birth.');
            return;
        }

        if (goodThings.some(item => !item.trim())) {
            Alert.alert('Error', 'Please fill out all good habit fields.');
            return;
        }

        if (badThings.some(item => !item.trim())) {
            Alert.alert('Error', 'Please fill out all bad habit fields.');
            return;
        }

        const profileData = {
            email,
            bio,
            dob,
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

        const result = await createOrUpdateProfile(profileData, email);

        if (result) {
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

    const handleDobChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date(dob);
        setShowDobPicker(Platform.OS === 'ios');
        setDob(currentDate.toISOString().split('T')[0]);
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

                <Text style={TextStyles.subheading}>Date of Birth</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        value={dob}
                        placeholder="Select your date of birth"
                        onFocus={() => setShowDobPicker(true)}
                    />
                    {showDobPicker && (
                        <DateTimePicker
                            value={dob ? new Date(dob) : new Date()}
                            mode="date"
                            display="default"
                            onChange={handleDobChange}
                        />
                    )}
                </View>

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
