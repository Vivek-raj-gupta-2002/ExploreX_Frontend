import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const CustomTextInput = ({
    placeholder,
    value,
    onChangeText,
    borderColor = 'tomato',
    borderWidth = 1,
    borderRadius = 8,
    padding = 10,
    fontSize = 16,
    inputColor = 'black',
    backgroundColor = 'white',
    placeholderColor = 'grey',
    width = '95%',
    height = 50,
    margin=10,
    styleInput,
}) => {
    return (
        <View style={[styles.container, { margin, borderColor, borderWidth, borderRadius, backgroundColor, width, height }]}>
            <TextInput
                style={[styles.input, { padding, fontSize, color: inputColor }, styleInput]}
                placeholder={placeholder}
                placeholderTextColor={placeholderColor}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: '100%',
    },
});

export default CustomTextInput;
