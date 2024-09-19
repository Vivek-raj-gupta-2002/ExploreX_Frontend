import React from 'react';
import { StyleSheet } from 'react-native';

const TextStyles = StyleSheet.create({
    
    heading1: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    heading2: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 8,
    },
    heading3: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 8,
    },
    subheading: {
        fontSize: 20,
        fontWeight: '600',
        color: 'grey',
        marginBottom: 6,
    },
    paragraph: {
        fontSize: 16,
        color: 'black',
        lineHeight: 24, // Adjust for readability
        marginBottom: 10,
    },
    caption: {
        fontSize: 12,
        color: 'grey',
        marginBottom: 4,
    },
});

export default TextStyles;
