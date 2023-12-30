import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import sesuai kebutuhan ikon yang Anda gunakan
import { Ionicons } from '@expo/vector-icons';

const QueueScreen = ({ navigation }) => {
    const handleRegistrationPress = () => {
        navigation.navigate('RegistrationQueue');
    };
    const handleTestingPress = () => {
        navigation.navigate('TestingQueue');
    };
    const handlePrintPress = () => {
        navigation.navigate('PrintQueue');
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Antrian</Text>
                <TouchableOpacity style={styles.notificationIcon}>
                    <Ionicons name="notifications" size={24} color="#000000" />
                </TouchableOpacity>
            </View>
            <Text style={styles.subTitle}>Daftar Antrian Hari Ini</Text>
            <View style={styles.card}>
                <TouchableOpacity style={[styles.button, {
                    backgroundColor: '#F31559'
                }]}
                    onPress={handleRegistrationPress}>
                    <Text style={styles.buttonText}>Pendaftaran</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#FFC436' }]}
                    onPress={handleTestingPress}>
                    <Text style={styles.buttonText}>Pengujian</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#0B666A' }]}
                    onPress={handlePrintPress}>
                    <Text style={styles.buttonText}>Cetak</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFC436',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
    },
    notificationIcon: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 50,
    },
    subTitle: {
        fontSize: 18,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#F31559',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default QueueScreen;
