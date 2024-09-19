import React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import CustomCard from '../components/card';
import CustomTextInput from '../components/input';
import CustomButton from '../components/button';
import TextStyles from '../styles/textStyles';
import CustomIconButton from '../components/iconButton';
import LikeDislikeButton from '../components/likeDisklike';

const HomeScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Section for User Input */}
            <CustomCard cardStyle={styles.card}>
                {/* Text inputs for user feedback */}
                <CustomTextInput
                    margin={10}
                    width='90%'
                    placeholder="Anything Good!!!!!"
                />
                <CustomTextInput
                    margin={10}
                    width='90%'
                    placeholder="Anything Not Good!!!!"
                />
                {/* Submit button for user input */}
                <CustomButton title="Submit" />
            </CustomCard>

            {/* Section for Recommended Activities */}
            <CustomCard cardStyle={styles.card}>
                {/* Title for the recommended activities section */}
                <Text style={TextStyles.heading3}>Recommended Activities</Text>

                {/* Container for activity items */}
                <CustomCard cardStyle={styles.activityContainer}>
                    {/* Activity item with an icon button */}
                    <Text style={TextStyles.subheading}>Activity 1</Text>
                    <CustomIconButton
                        iconName="camera"
                        iconColor="white"
                        backgroundColor="tomato"
                        iconSize={20}
                        style={styles.iconButton}
                    />
                </CustomCard>

                {/* Button to navigate to the leaderboard */}
                <CustomButton
                    textColor="grey"
                    backgroundColor="white"
                    title="Leader Board"
                />
            </CustomCard>

            {/* About your Personality */}
            <CustomCard cardStyle={styles.card}>
                <Text style={TextStyles.heading3}>Your Personality Says</Text>

                <Text style={TextStyles.paragraph}>
                    1. You are a Good and polite Person
                </Text>
                <Text style={TextStyles.paragraph}>
                    2. You love to interact with people
                </Text>

                <LikeDislikeButton onLike={() => console.log("Liked")} onDislike={() => console.log("DisLiked")}/>
                
            </CustomCard>

            <CustomCard>
                {/* Additional content here */}
                
            </CustomCard>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
         // Background color for the scroll view
    },
    card: {
        alignItems: 'center', // Center elements horizontally
        marginBottom: 20, // Space between cards
    },
    activityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Space between items in the activity container
        alignItems: 'center',
        padding: 10, // Padding inside the card
        width: "100%",
    },
    iconButton: {
        margin: 3, // Space around the icon button
    },
});

export default HomeScreen;
