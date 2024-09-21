import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import TextStyles from '../../styles/textStyles'; // Import your predefined text styles

const GroupScreen = ({ navigation }) => {
    // Example group data
    const groups = [
        { id: '1', name: 'Family', messages: 5 },
        { id: '2', name: 'Friends', messages: 12 },
        { id: '3', name: 'Work Team', messages: 2 },
        { id: '4', name: 'Coding Buddies', messages: 9 },
        { id: '5', name: 'Weekend Hikers', messages: 0 },
        { id: '6', name: 'Sports Club', messages: 3 },
        { id: '7', name: 'Book Club', messages: 8 },
        { id: '8', name: 'Study Group', messages: 1 },
        { id: '9', name: 'Gaming Crew', messages: 4 },
        { id: '10', name: 'Music Lovers', messages: 7 },
    ];

    return (
        <View style={styles.container}>
            {/* <Text style={TextStyles.heading2}>Your Groups</Text> */}

            <ScrollView contentContainerStyle={styles.scrollView}>
                {groups.map((group) => (
                    <TouchableOpacity
                        key={group.id}
                        style={styles.groupItem}
                        onPress={() => { navigation.navigate('chat', {groupName: group.name})}}
                    >
                        <View style={styles.groupInfo}>
                            <Text style={TextStyles.paragraph}>{group.name}</Text>
                        </View>
                        {group.messages > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>
                                    {group.messages > 5 ? '5+' : group.messages}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    scrollView: {
        paddingBottom: 20,
    },
    groupItem: {
        flexDirection: 'row', // Align items horizontally
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    groupInfo: {
        flex: 1,
    },
    badge: {
        backgroundColor: 'tomato',
        borderRadius: 12, // Makes it circular when width/height are equal
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default GroupScreen;
