import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // To pick images from the device
import CustomButton from '../../../components/button'; // Assuming you have a custom button component
import { CreatePost } from '../../../scripts/post';
import mime from 'mime'; // For dynamically determining MIME types

const AddPostScreen = ({ navigation }) => {
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImage = async () => {
        // Request permission to access media library
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        // Open image picker and allow multiple image formats
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri); // Use 'assets[0].uri' for the selected image
        }
    };

    const handlePostSubmit = async () => {
        if (!description || !selectedImage) {
            alert('Please add a description and an image.');
            return;
        }

        try {
            const newImageUri = "file:///" + selectedImage.split("file:/").join("");
            const mimeType = mime.getType(newImageUri); // Dynamically fetch MIME type based on file extension

            let data = new FormData();
            data.append('image', {
                uri: newImageUri,
                type: mimeType, // Add MIME type dynamically
                name: newImageUri.split("/").pop(), // Extract file name from URI
            });
            data.append('description', description);
            data.append('title', "A Post Title"); // Adjust title dynamically if needed

            // Call CreatePost API function to upload the post
            const response = await CreatePost(data);

            if (response) {
                console.log('Post created successfully:', response);
                navigation.goBack(); // Navigate back after successful post creation
            } else {
                alert('Failed to create post.');
            }
        } catch (error) {
            console.error('Error submitting post:', error);
            alert('An error occurred while creating the post.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Add a Description:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter description..."
                value={description}
                onChangeText={setDescription}
            />

            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {selectedImage ? (
                    <Image source={{ uri: selectedImage }} style={styles.image} />
                ) : (
                    <Text style={styles.imageText}>Pick an Image</Text>
                )}
            </TouchableOpacity>

            {/* Custom Button */}
            <CustomButton
                title="Add Post"
                onPress={handlePostSubmit}
                backgroundColor="tomato"
                textColor="white"
                style={styles.customButton}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    imagePicker: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 400,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    imageText: {
        color: '#888',
    },
    customButton: {
        marginTop: 20,
    },
});

export default AddPostScreen;
