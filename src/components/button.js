import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({
    title,
    onPress,
    backgroundColor = 'tomato',
    textColor = 'white',
    borderColor = 'tomato',
    borderWidth = 1,
    borderRadius = 8,
    paddingVertical = 10,
    paddingHorizontal = 20,
    fontSize = 16,
    style, // additional custom styles
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor,
                    borderColor,
                    borderWidth,
                    borderRadius,
                    paddingVertical,
                    paddingHorizontal,
                },
                style,
            ]}
            onPress={onPress}
        >
            <Text style={[styles.text, { color: textColor, fontSize }]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
    },
});

export default CustomButton;
