import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import CustomCard from '../../components/card';
import CustomTextInput from '../../components/input';
import CustomButton from '../../components/button';
import TextStyles from '../../styles/textStyles';
import CustomIconButton from '../../components/iconButton';
import LikeDislikeButton from '../../components/likeDisklike';
import { createGoodBadEntry, getGoodBadEntry } from '../../scripts/goodBad'; // Import the API calls
import moment from 'moment';
import { GetSummary } from '../../scripts/userSummary';
import { storeData } from '../../scripts/storage';

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
    const [task, setTask] = useState([]);
    const [good, setGood] = useState('');
    const [bad, setBad] = useState('');
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [summ, setSumm] = useState(null);

    useEffect(() => {
        // Fetch data for the current date
        const fetchData = async () => {
            const userSum = await GetSummary();

            if (userSum != null) {
                await storeData('userSum', userSum);
                setSumm(userSum);
                if (userSum?.task != null) {
                    // Split tasks and only take the heading (first line)
                    const tasks = userSum.task
                        .trim()
                        .split(/\n\n/) // Split by double newlines
                        .map(task => task.split('\n')[0].trim()); // Extract only the first line of each task as the heading
                    setTask(tasks);
                }
            }

            const data = await getGoodBadEntry(date);
            if (data) {
                setGood(data.good || '');
                setBad(data.bad || '');
            } else {
                setGood('');
                setBad('');
            }
        };
        fetchData();
        const unsubscribe = navigation.addListener('focus', fetchData);
        return unsubscribe;
    }, [date]);


    const handleSubmit = async () => {
        if (!good.trim() || !bad.trim()) {
            alert('Please fill in both fields before submitting!');
            return;
        }

        await createGoodBadEntry(good, bad);
        alert('Your entry has been submitted!');
    };

    const renderTaskItem = ({ item }) => (
        <CustomCard cardStyle={styles.activityContainer}>
            <Text style={TextStyles.subheading}>{item}</Text>
            <CustomIconButton
                iconName="camera"
                iconColor="white"
                backgroundColor="tomato"
                iconSize={20}
                style={styles.iconButton}
                onPress={() => { navigation.navigate('New Post') }}
            />
        </CustomCard>
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Section for User Input */}
                <CustomCard cardStyle={styles.card}>
                    <CustomTextInput
                        margin={10}
                        width="90%"
                        placeholder="Anything Good!!!!!"
                        value={good}
                        onChangeText={(text) => setGood(text)} // Update state
                    />
                    <CustomTextInput
                        margin={10}
                        width="90%"
                        placeholder="Anything Not Good!!!!"
                        value={bad}
                        onChangeText={(text) => setBad(text)} // Update state
                    />
                    <CustomButton title="Submit" onPress={handleSubmit} />
                </CustomCard>

                {/* Section for Recommended Activities */}
                <CustomCard cardStyle={styles.card}>
                    <Text style={TextStyles.heading3}>Recommended Activities</Text>
                    <FlatList
                        data={task}
                        renderItem={renderTaskItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        style={styles.taskList}
                    />
                    <CustomButton textColor="grey" backgroundColor="white" title="Leader Board" onPress={() => { navigation.navigate('Leader Board') }} />
                </CustomCard>

                {/* About your Personality */}
                <CustomCard cardStyle={styles.card}>
                    <Text style={TextStyles.heading3}>Your Personality Says</Text>
                    <Text style={TextStyles.paragraph}>{`${summ?.personality || "Nothing to say"}`}</Text>

                    <LikeDislikeButton onLike={() => console.log("Liked")} onDislike={() => console.log("DisLiked")} />
                </CustomCard>

                {/* Music Suggestion Slider */}
                <CustomCard cardStyle={styles.card}>
                    <Text style={TextStyles.heading3}>Music Suggestions</Text>
                    <FlatList
                        data={musicSuggestions}
                        renderItem={renderMusicItem}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
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
    taskList: {
        marginTop: 10,
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
