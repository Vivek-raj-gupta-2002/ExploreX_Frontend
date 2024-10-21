// src/screens/NotesScreen.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Alert } from 'react-native';
import CustomButton from '../../../components/button';
import TextStyles from '../../../styles/textStyles';
import { createNotesEntry, getNotesEntry } from '../../../scripts/noteScript'; // Import your API functions
import moment from 'moment';

const NotesScreen = ({ navigation }) => {
    const [note, setNote] = useState('');
    const [date, setDate] = useState(moment().format('YYYY-MM-DD')); // Get the current date

    useEffect(() => {
        const fetchNotes = async () => {
            const notes = await getNotesEntry(date); // Fetch notes for the current date
            if (notes) {
                console.log(notes, 111)
                setNote(notes.note || ''); // Update the note state with the fetched data
            }
        };

        fetchNotes(); // Call the fetch function
    }, [date]);

    const handleSave = async () => {
        if (!note.trim()) {
            Alert.alert('Warning', 'Please write a note before saving.'); // Alert for empty note
            return;
        }

        await createNotesEntry(note); // Call the API to save the note
        // Alert.alert('Success', 'Note saved successfully!'); // Confirmation alert
        navigation.navigate('Home');
        
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={TextStyles.heading3}>Write Your Note</Text>
            <TextInput
                style={styles.textInput}
                multiline
                placeholder="Dear Diary....."
                value={note}
                onChangeText={setNote} // Update state on text change
            />
            <CustomButton title="Done" onPress={handleSave} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    textInput: {
        height: "85%",
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        textAlignVertical: 'top',
    },
});

export default NotesScreen;
