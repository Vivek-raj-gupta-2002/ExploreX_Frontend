import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import TextStyles from '../../styles/textStyles'; // Import your predefined text styles
import { fetchChats } from '../../scripts/useChat';
import { getData } from '../../scripts/storage';

const GroupScreen = ({ navigation }) => {

    const [groups, setGroups] = useState([]);
    const [token, setToken] = useState();
    const [email, setemail] = useState();

    // Example group data
    useEffect(() => {
        const getChats = async () => {
            const data = await fetchChats();
            const token = await getData('access');
            const emailMy = JSON.parse(await getData('userDetails')).email;
            setGroups(data);
            setToken(token);
            setemail(emailMy);
        }
        getChats();
        const unsubscribe = navigation.addListener('focus', () => {
            getChats();
        })
    }, [])
    // const groups = [
    //     { id: '1', name: 'Family', messages: 5 },
        
    // ];

    return (
        <View style={styles.container}>
            {/* <Text style={TextStyles.heading2}>Your Groups</Text> */}

            <ScrollView contentContainerStyle={styles.scrollView}>
                {groups.map((group) => (
                    <TouchableOpacity
                        key={group.id}
                        style={styles.groupItem}
                        onPress={() => { navigation.navigate('chat', { groupName: group.title, chatId : group.id, token: token, email: email})}}
                    >
                        <View style={styles.groupInfo}>
                            <Text style={TextStyles.paragraph}>{group.title}</Text>
                        </View>
                        
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
