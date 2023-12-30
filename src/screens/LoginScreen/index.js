// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [phone, setPhone] = useState('');

    const handleLogin = () => {
        navigation.navigate('OTPScreen');
    };

    const handleRegister = () => {
        // Navigate to the Register screen
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Phone"
                onChangeText={(text) => setPhone(text)}
            />
            <Button title="Login" onPress={handleLogin} color="#191D88" />

            <Text style={styles.registerText} onPress={handleRegister}>
                Don't have an account? Register here
            </Text>
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
    registerText: {
        marginTop: 20,
        color: '#191D88',
    },
});

export default LoginScreen;
