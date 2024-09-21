// src/screens/LeaderScreen.js

import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import LikeDislikeButton from '../../../components/likeDisklike'; // Adjust import path if necessary

const posts = [
    {
        id: '1',
        userName: 'john_doe',
        profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
        postImage: require('../../../assets/download.jpeg'), // Example post image
        description: 'This is a description of the photo. #awesome #cute #instagramclone',
    },
    {
        id: '2',
        userName: 'jane_smith',
        profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
        postImage: require('../../../assets/download.jpeg'), // Example post image
        description: 'Another description of a different photo. #fun #dayout',
    },
    {
        id: '3',
        userName: 'peter_parker',
        profileImage: 'https://randomuser.me/api/portraits/men/56.jpg',
        postImage: require('../../../assets/download.jpeg'), // Example post image
        description: 'Enjoying the day! #sunny #relax',
    },
];

const LeaderScreen = () => {
    const [likedPostId, setLikedPostId] = useState(null);

    const handleLike = (id) => {
        setLikedPostId(id);
    };

    const renderPost = ({ item }) => (
        <View style={styles.container}>
            {/* User Info */}
            <View style={styles.userInfo}>
                <Image
                    source={{ uri: item.profileImage }}
                    style={styles.profileImage}
                />
                <Text style={styles.userName}>{item.userName}</Text>
            </View>

            {/* Post Image */}
            <Image
                source={item.postImage}
                style={styles.postImage}
            />

            {/* Post Description */}
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{item.description}</Text>
            </View>

            {/* Like and Dislike buttons */}
            <View style={styles.buttonsContainer}>
                <LikeDislikeButton
                    onLike={() => handleLike(item.id)}
                    onDislike={() => console.log("Disliked")}
                    isLiked={likedPostId === item.id}
                />
            </View>
        </View>
    );

    return (
        <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userName: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
    postImage: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
    },
    descriptionContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    description: {
        fontSize: 14,
        color: '#333',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10,
    },
});

export default LeaderScreen;
