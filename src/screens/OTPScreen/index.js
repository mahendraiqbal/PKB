// OTPScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const OTPScreen = ({ navigation }) => {
    const [otp, setOtp] = useState('');

    const handleVerifyOTP = () => {
        // Add your OTP verification logic here
        // For simplicity, let's navigate to the Home screen after OTP verification
        navigation.navigate('BotTab', { screen: 'Home' });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify OTP</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                keyboardType="numeric"
                onChangeText={(text) => setOtp(text)}
            />
            <Button title="Verify OTP" onPress={handleVerifyOTP} color="#191D88" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#191D88',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
});

export default OTPScreen;
