import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomIconButton from '../components/iconButton'; // Ensure this path is correct

const LikeDislikeButton = ({
    onLike,
    onDislike,
    initialLiked = false,
    initialDisliked = false,
    likeIcon = 'thumbs-up',
    dislikeIcon = 'thumbs-down',
    likeColor = 'tomato',
    dislikeColor = 'grey',
    iconSize = 24
}) => {
    // State to manage liked/disliked status
    const [liked, setLiked] = useState(initialLiked);
    const [disliked, setDisliked] = useState(initialDisliked);

    // Handle like button press
    const handleLike = () => {
        setLiked(true);
        setDisliked(false); // Ensure only one state is active
        if (onLike) onLike(); // Call the parent-provided handler
    };

    // Handle dislike button press
    const handleDislike = () => {
        setLiked(false);
        setDisliked(true); // Ensure only one state is active
        if (onDislike) onDislike(); // Call the parent-provided handler
    };

    return (
        <View style={styles.container}>
            {/* Like Button */}
            <CustomIconButton
                iconName={likeIcon}
                iconColor={liked ? "white" : "black"}
                backgroundColor={liked ? likeColor : "white"}
                iconSize={iconSize}
                onPress={handleLike}
                style={styles.button}
            >
                <Text style={[styles.text, liked && styles.likedText]}>Like</Text>
            </CustomIconButton>

            {/* Dislike Button */}
            <CustomIconButton
                iconName={dislikeIcon}
                iconColor={disliked ? "white" : "black"}
                backgroundColor={disliked ? dislikeColor : "white"}
                iconSize={iconSize}
                onPress={handleDislike}
                style={styles.button}
            >
                <Text style={[styles.text, disliked && styles.dislikedText]}>Dislike</Text>
            </CustomIconButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
    },
    text: {
        marginLeft: 5,
        fontSize: 16,
    },
    likedText: {
        color: 'white',
    },
    dislikedText: {
        color: 'white',
    },
});

export default LikeDislikeButton;
