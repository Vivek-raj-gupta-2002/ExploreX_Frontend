import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/button';
import CustomCard from '../../components/card';
import TextStyles from '../../styles/textStyles'; // Your predefined text styles

const SettingsScreen = ({ navigation }) => {
    const userInfo = {
        name: "John Doe",
        email: "john.doe@example.com",
        bio: "Lover of tech, coding, and coffee!",
        profilePic: 'https://randomuser.me/api/portraits/men/45.jpg',
        goodThings: [
            "Hardworking", "Creative", "Empathetic", "Problem Solver", "Team Player"
        ],
        badThings: [
            "Procrastinates", "Stubborn", "Perfectionist", "Impatient", "Overthinks"
        ]
    };

    return (
        <View style={styles.container}>
            {/* Profile Info */}
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: userInfo.profilePic}}
                    style={styles.profileImage}
                />
                <Text style={TextStyles.heading2}>{userInfo.name}</Text>
                <Text style={TextStyles.paragraph}>{userInfo.email}</Text>
                <Text style={TextStyles.subheading}>{userInfo.bio}</Text>
            </View>

            {/* Custom Card for 5 Good and Bad Things */}
            <CustomCard containerStyle={styles.customCard}>
                <Text style={TextStyles.heading3}>5 Good Things</Text>
                {userInfo.goodThings.map((item, index) => (
                    <Text key={index} style={TextStyles.paragraph}>• {item}</Text>
                ))}

                <Text style={TextStyles.heading3}>5 Bad Things</Text>
                {userInfo.badThings.map((item, index) => (
                    <Text key={index} style={TextStyles.paragraph}>• {item}</Text>
                ))}
            </CustomCard>

            {/* Update Button */}
            <TouchableOpacity style={styles.updateButton}>
                <CustomButton title="Update Profile" onPress={() => { navigation.navigate('Update Profile') }} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 5,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    customCard: {
        
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 30,
    },
    updateButton: {
        position: 'absolute',
        bottom: 20,
        right: 30,
    },
});

export default SettingsScreen;
