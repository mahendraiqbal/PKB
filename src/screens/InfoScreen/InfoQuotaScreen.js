import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const InfoQuotaScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Informasi</Text>
            </View>
            <Text style={styles.subTitle}>Peraturan Terkait PKB</Text>

            <Text style={styles.subTitle}>Kalender Tahun Ini</Text>
            <View style={styles.calendarContainer}>
                {/* Komponen Kalender */}
                <Calendar
                    // Properti Kalender dapat disesuaikan sesuai kebutuhan Anda
                    markingType={'period'}
                    markedDates={{
                        '2023-01-01': { marked: true, dotColor: '#50cebb' },
                        '2023-12-25': { marked: true, dotColor: '#50cebb' },
                    }}
                />
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
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginLeft: 10,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#FFF',
    },
    calendarContainer: {
        marginTop: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
    },
});

export default InfoQuotaScreen;
