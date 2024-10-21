// src/screens/LeaderScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import LikeDislikeButton from '../../../components/likeDisklike'; // Adjust import path if necessary
import { GetPost } from '../../../scripts/post';
import {API_HOST} from '@env'



const LeaderScreen = () => {
    const [posts, setPosts] = useState([]);
    const [likedPostId, setLikedPostId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await GetPost();
                if (data) {
                    setPosts(data);  // Set fetched posts
                } else {
                    setError('Failed to load posts.');
                }
            } catch (err) {
                setError('An error occurred while fetching posts.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleLike = (id) => {
        setLikedPostId(id);
    };
    

    const renderPost = ({ item }) => (
        <View style={styles.container}>
            {/* User Info */}
            <View style={styles.userInfo}>
                {/* <Image
                    source={{ uri: item.profileImage }}
                    style={styles.profileImage}
                /> */}
                <Text style={styles.userName}>{item.username}</Text>
            </View>

            {/* Post Image */}
            <Image
                source={{uri:`${API_HOST}${item.image}`}}
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
