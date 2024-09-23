import React from 'react';
import { Text, StyleSheet, View, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import CustomCard from '../../components/card';
import CustomTextInput from '../../components/input';
import CustomButton from '../../components/button';
import TextStyles from '../../styles/textStyles';
import CustomIconButton from '../../components/iconButton';
import LikeDislikeButton from '../../components/likeDisklike';

// Sample data for the music slider
const musicSuggestions = [
    {
        id: '1',
        title: 'Song Title 1',
        description: 'Artist 1',
        image: require('../../assets/download.jpeg'),
    },
    {
        id: '2',
        title: 'Song Title 2',
        description: 'Artist 2',
        image: require('../../assets/download.jpeg'),
    },
    {
        id: '3',
        title: 'Song Title 3',
        description: 'Artist 3',
        image: require('../../assets/download.jpeg'),
    },
    {
        id: '4',
        title: 'Song Title 4',
        description: 'Artist 4',
        image: require('../../assets/download.jpeg'),
    },
];

// Function to render each music item
const renderMusicItem = ({ item }) => (
    <CustomCard cardStyle={styles.songCard}>
        <Image style={styles.musicImage} source={item.image} />
        <View style={styles.songDetails}>
            <Text style={TextStyles.heading3}>{item.title}</Text>
            <Text style={TextStyles.paragraph}>{item.description}</Text>
            <View style={styles.actionButtons}>
                <LikeDislikeButton
                    onLike={() => console.log(`Liked ${item.title}`)}
                    onDislike={() => console.log(`Disliked ${item.title}`)}
                />
                <CustomIconButton
                    iconName="play-circle"
                    iconColor="white"
                    backgroundColor="tomato"
                    iconSize={30}
                    style={styles.playButton}
                />
            </View>
        </View>
    </CustomCard>
);

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Section for User Input */}
                <CustomCard cardStyle={styles.card}>
                    <CustomTextInput margin={10} width="90%" placeholder="Anything Good!!!!!" />
                    <CustomTextInput margin={10} width="90%" placeholder="Anything Not Good!!!!" />
                    <CustomButton title="Submit" />
                </CustomCard>

                {/* Section for Recommended Activities */}
                <CustomCard cardStyle={styles.card}>
                    <Text style={TextStyles.heading3}>Recommended Activities</Text>
                    <CustomCard cardStyle={styles.activityContainer}>
                        <Text style={TextStyles.subheading}>Activity 1</Text>
                        <CustomIconButton
                            iconName="camera"
                            iconColor="white"
                            backgroundColor="tomato"
                            iconSize={20}
                            style={styles.iconButton}
                            onPress={() => { navigation.navigate('New Post') }}
                        />
                    </CustomCard>
                    <CustomButton textColor="grey" backgroundColor="white" title="Leader Board" onPress={() => { navigation.navigate('Leader Board') }} />

                </CustomCard>

                {/* About your Personality */}
                <CustomCard cardStyle={styles.card}>
                    <Text style={TextStyles.heading3}>Your Personality Says</Text>
                    <Text style={TextStyles.paragraph}>1. You are a Good and polite Person</Text>
                    <Text style={TextStyles.paragraph}>2. You love to interact with people</Text>
                    <LikeDislikeButton onLike={() => console.log("Liked")} onDislike={() => console.log("DisLiked")} />
                </CustomCard>

                {/* Music Suggestion Slider */}
                <CustomCard cardStyle={styles.card}>
                    <Text style={TextStyles.heading3}>Music Suggestions</Text>
                    <FlatList
                        data={musicSuggestions}
                        renderItem={renderMusicItem}
                        keyExtractor={(item) => item.id}
                        horizontal={true} // Set to horizontal
                        showsHorizontalScrollIndicator={false} // Hide scroll indicator
                        style={styles.musicSlider}
                    />
                </CustomCard>
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.floatingButton}>
                <CustomIconButton
                    iconName="add"
                    iconColor="white"
                    backgroundColor="tomato"
                    iconSize={30}
                    style={styles.plusIcon}
                    onPress={() => { navigation.navigate('Notes') }}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ensure the container takes up the full screen height
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    card: {
        alignItems: 'center',
        marginBottom: 20,
    },
    activityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        width: '100%',
    },
    iconButton: {
        margin: 3,
    },
    musicImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    songCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginRight: 10, // Spacing between horizontal items
    },
    songDetails: {
        flex: 1,
        marginLeft: 10,
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    playButton: {
        marginLeft: 10,
    },
    musicSlider: {
        paddingVertical: 10,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'tomato',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Add shadow for better visibility on Android
        zIndex: 100, // Ensure it stays above the scrollable content
    },
    plusIcon: {
        margin: 0, // Adjust if needed
    },
});

export default HomeScreen;
