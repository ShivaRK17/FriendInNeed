import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Button } from 'react-native-paper';

const ServerDown = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Server Down</Text>
            <Text style={styles.description}>We apologize for the inconvenience. Our servers are currently down for maintenance.</Text>
            <Button mode="contained" className="m-3 p-1 px-5" onPress={() => console.log('Retry button pressed')}>
                Retry
            </Button>
            <Button mode="contained" className="m-3 p-1 px-5" onPress={async ()=>{await Linking.openURL(`https://wa.me/+91${process.env.EXPO_PUBLIC_CEO_PHONE_NUMBER}`)}}>
                Chat with Us
            </Button>
            <Button mode="contained" className="m-3 p-1 px-5" onPress={async ()=>{await Linking.openURL(`tel:+91${process.env.EXPO_PUBLIC_CEO_PHONE_NUMBER}`)}}>
                Contact Us
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f0f4f7', // Tailwind CSS color
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2d3748', // Tailwind CSS color
    },
    description: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center',
        color: '#4a5568', // Tailwind CSS color
    },
    button: {
        width: '80%',
        paddingVertical: 10,
        // backgroundColor: '#4299e1', // Tailwind CSS color
    },
});

export default ServerDown;
