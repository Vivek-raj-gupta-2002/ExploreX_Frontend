import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // You can choose a different icon set

const CustomIconButton = ({
    iconName,
    iconColor = 'white',
    iconSize = 24,
    backgroundColor = 'tomato',
    borderRadius = 50,
    padding = 10,
    onPress,
    style,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor, borderRadius, padding },
                style,
            ]}
            onPress={onPress}
        >
            <Icon name={iconName} size={iconSize} color={iconColor} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CustomIconButton;
