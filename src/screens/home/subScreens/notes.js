// src/screens/NotesScreen.js

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';
import CustomButton from '../../../components/button';
import TextStyles from '../../../styles/textStyles';

const NotesScreen = () => {
    const [note, setNote] = useState('');

    const handleSave = () => {
        // Handle saving the note (e.g., store in state, local storage, etc.)
        console.log('Note saved:', note);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={TextStyles.heading3}>Write Your Note</Text>
            <TextInput
                style={styles.textInput}
                multiline
                placeholder="Dear Diary....."
                value={note}
                onChangeText={setNote}
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
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
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
