import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';

const PermohonanMutasiMasuk = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    // Handle function to set the selected date
    const handleDateSelection = (date) => {
        setSelectedDate(date);
    };

    // Handle function to navigate to FormUjiPertamaScreen
    const handleContinue = () => {
        // Check if a date is selected
        if (selectedDate) {
            // Navigate to FormUjiPertamaScreen and pass selectedDate as a parameter
            navigation.navigate('FormUjiBerkala', { selectedDate });
        } else {
            // Handle the case when no date is selected
            alert('Pilih tanggal terlebih dahulu');
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Antrian</Text>
            </View>

            {/* Subtitle */}
            <Text style={styles.subtitle}>Memilih kuota tersedia</Text>

            {/* Calendar Card */}
            <View style={styles.calendarCard}>
                <CalendarPicker
                    onDateChange={handleDateSelection}
                    width={300}
                    height={300}
                    selectedStartDate={selectedDate}
                    allowRangeSelection={false}
                />
            </View>

            {/* Selected Date Card */}
            {selectedDate && (
                <View style={styles.selectedDateCard}>
                    <Text style={styles.selectedDateText}>Melakukan uji tanggal pada:</Text>
                    <Text style={styles.selectedDate}>
                        {moment(selectedDate).format('DD MMMM YYYY')}
                    </Text>
                    {/* Continue Button */}
                    <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                        <Text style={styles.continueButtonText}>Lanjutkan</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align to the left
        marginBottom: 20,
        backgroundColor: '#FFC436',
        paddingVertical: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        marginLeft: 10, // Add margin to the title
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    calendarCard: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 20,
        overflow: 'hidden',
    },
    selectedDateCard: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
    },
    selectedDateText: {
        fontSize: 16,
        marginBottom: 10,
    },
    selectedDate: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    continueButton: {
        backgroundColor: '#191D88',
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    continueButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default PermohonanMutasiMasuk;
