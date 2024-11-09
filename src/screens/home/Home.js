import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import CustomCard from '../../components/card';
import CustomButton from '../../components/button';
import TextStyles from '../../styles/textStyles';
import CustomIconButton from '../../components/iconButton';
import LikeDislikeButton from '../../components/likeDisklike';
import { createGoodBadEntry, getGoodBadEntry } from '../../scripts/goodBad';
import moment from 'moment';
import { GetSummary } from '../../scripts/userSummary';
import { storeData } from '../../scripts/storage';
import { getScreenTimeData } from '../../scripts/screenTime';

const musicSuggestions = [
    { id: '1', title: 'Song Title 1', description: 'Artist 1', image: require('../../assets/download.jpeg') },
    { id: '2', title: 'Song Title 2', description: 'Artist 2', image: require('../../assets/download.jpeg') },
    { id: '3', title: 'Song Title 3', description: 'Artist 3', image: require('../../assets/download.jpeg') },
    { id: '4', title: 'Song Title 4', description: 'Artist 4', image: require('../../assets/download.jpeg') },
];

const HomeScreen = ({ navigation }) => {
    const [task, setTask] = useState([]);
    const [good, setGood] = useState('');
    const [bad, setBad] = useState('');
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [summ, setSumm] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            console.log("started");
            console.log(await getScreenTimeData());
            console.log("end");

            const userSum = await GetSummary();
            if (userSum) {
                await storeData('userSum', userSum);
                setSumm(userSum);
                if (userSum?.task) {
                    const tasks = userSum.task
                        .trim()
                        .split(/\n\n/)
                        .map(task => task.split('\n')[0].trim());
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

    const renderTaskItems = () => (
        task.map((item, index) => (
            <CustomCard key={index} cardStyle={styles.activityContainer}>
                <Text style={TextStyles.subheading}>{item}</Text>
                <CustomIconButton
                    iconName="camera"
                    iconColor="white"
                    backgroundColor="tomato"
                    iconSize={20}
                    style={styles.iconButton}
                    onPress={() => navigation.navigate('New Post')}
                />
            </CustomCard>
        ))
    );

    const renderMusicItems = () => (
        musicSuggestions.map(item => (
            <CustomCard key={item.id} cardStyle={styles.songCard}>
                <Image style={styles.musicImage} source={item.image} />
                <View style={styles.songDetails}>
                    <Text style={TextStyles.heading3}>{item.title}</Text>
                    <Text style={TextStyles.paragraph}>{item.description}</Text>
                    <View style={styles.actionButtons}>
                        <LikeDislikeButton onLike={() => console.log(`Liked ${item.title}`)} onDislike={() => console.log(`Disliked ${item.title}`)} />
                        <CustomIconButton iconName="play-circle" iconColor="white" backgroundColor="tomato" iconSize={30} style={styles.playButton} />
                    </View>
                </View>
            </CustomCard>
        ))
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <CustomCard cardStyle={styles.card}>
                <TextInput
                    style={[styles.textInput, { margin: 10, width: "90%" }]}
                    placeholder="Anything Good!!!!!"
                    value={good}
                    onChangeText={(text) => setGood(text)}
                />
                <TextInput
                    style={[styles.textInput, { margin: 10, width: "90%" }]}
                    placeholder="Anything Not Good!!!!"
                    value={bad}
                    onChangeText={(text) => setBad(text)}
                />
                <CustomButton title="Submit" onPress={handleSubmit} />
            </CustomCard>

            <CustomCard cardStyle={styles.card}>
                <Text style={TextStyles.heading3}>Recommended Activities</Text>
                {renderTaskItems()}
                <CustomButton textColor="grey" backgroundColor="white" title="Leader Board" onPress={() => navigation.navigate('Leader Board')} />
            </CustomCard>

            <CustomCard cardStyle={styles.card}>
                <Text style={TextStyles.heading3}>Your Personality Says</Text>
                <Text style={TextStyles.paragraph}>{`${summ?.personality || "Nothing to say"}`}</Text>
                <LikeDislikeButton onLike={() => console.log("Liked")} onDislike={() => console.log("Disliked")} />
            </CustomCard>

            <CustomCard cardStyle={styles.card}>
                <Text style={TextStyles.heading3}>Music Suggestions</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.musicSlider}>
                    {renderMusicItems()}
                </ScrollView>
            </CustomCard>

            <TouchableOpacity style={styles.floatingButton}>
                <CustomIconButton
                    iconName="add"
                    iconColor="white"
                    backgroundColor="tomato"
                    iconSize={30}
                    style={styles.plusIcon}
                    onPress={() => navigation.navigate('Notes')}
                />
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, paddingBottom: 20 },
    card: { alignItems: 'center', marginBottom: 20 },
    activityContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, width: '100%' },
    iconButton: { margin: 3 },
    musicImage: { width: 100, height: 100, borderRadius: 10 },
    songCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginRight: 10 },
    songDetails: { flex: 1, marginLeft: 10 },
    actionButtons: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
    playButton: { marginLeft: 10 },
    musicSlider: { paddingVertical: 10 },
    floatingButton: {
        position: 'absolute', bottom: 20, right: 20, width: 60, height: 60,
        borderRadius: 30, backgroundColor: 'tomato', justifyContent: 'center',
        alignItems: 'center', elevation: 5, zIndex: 100
    },
    plusIcon: { margin: 0 },
    textInput: { borderWidth: 1, borderColor: 'gray', padding: 8, borderRadius: 5, fontSize: 16 },
});

export default HomeScreen;
