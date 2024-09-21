import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../../../components/button';
import TextStyles from '../../../styles/textStyles';

const UpdateProfileScreen = ({ navigation, route }) => {
    const userInfo = route?.params || {
        name: '',
        bio: '',
        profilePic: '',
        email: '',
        goodThings: [],
        badThings: [],
    };

    const [name, setName] = useState(userInfo.name);
    const [bio, setBio] = useState(userInfo.bio);
    const [profilePic, setProfilePic] = useState(userInfo.profilePic);
    const [goodThings, setGoodThings] = useState(userInfo.goodThings.length ? userInfo.goodThings : ['', '', '', '', '']);
    const [badThings, setBadThings] = useState(userInfo.badThings.length ? userInfo.badThings : ['', '', '', '', '']);
    const email = userInfo.email;

    // Handle image selection
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Permission to access media library is required!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], // For square image cropping
            quality: 1,
        });

        if (!result.canceled) {
            setProfilePic(result.assets[0].uri); // Update the profile picture with the selected image URI
        }
    };

    const handleUpdateProfile = () => {
        if (!name || !bio || !profilePic) {
            Alert.alert('Please fill in all the fields and select a profile picture.');
            return;
        }

        console.log('Updated Profile:', { name, bio, profilePic, goodThings, badThings });

        navigation.goBack();
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {/* <Text style={TextStyles.heading1}>Update Profile</Text> */}

                {/* Profile Picture */}
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={{ uri: profilePic || 'https://via.placeholder.com/100' }}
                        style={styles.profileImage}
                    />
                    <Text style={styles.imageText}>Change Profile Picture</Text>
                </TouchableOpacity>

                {/* Name Input */}
                <Text style={TextStyles.subheading}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                />

                {/* Email Input (Non-editable) */}
                <Text style={TextStyles.subheading}>Email (non-editable)</Text>
                <TextInput
                    style={[styles.input, styles.nonEditable]}
                    value={email}
                    editable={false}
                />

                {/* Bio Input */}
                <Text style={TextStyles.subheading}>Bio</Text>
                <TextInput
                    style={styles.input}
                    value={bio}
                    onChangeText={setBio}
                    placeholder="Enter your bio"
                />

                {/* 5 Good Things */}
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

                {/* 5 Bad Things */}
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

                {/* Update Profile Button */}
                <CustomButton title="Update Profile" onPress={handleUpdateProfile} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 20,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 10,
    },
    imageText: {
        textAlign: 'center',
        color: '#888',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 16,
    },
    nonEditable: {
        backgroundColor: '#e9ecef',
        color: '#888',
    },
});

export default UpdateProfileScreen;
