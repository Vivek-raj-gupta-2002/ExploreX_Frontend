import React from 'react';
import { View, StyleSheet } from 'react-native';

const CustomCard = ({
    cardStyle, // Custom styles for the card
    containerStyle, // Custom styles for the card's container
    children, // Any elements inside the card
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={[styles.card, cardStyle]}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        overflow: 'hidden',
        margin: 5,
        padding: 15,
    },
});

export default CustomCard;
