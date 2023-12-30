import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const RelatedInfoScreen = ({ navigation }) => {
    const peraturanData = [
        { title: 'Alat Pengujian Kendaraan Bermotor' },
        { title: 'Persyaratan Uji Pertama' },
        { title: 'Persyaratan Uji Berkala' },
        { title: 'Persyaratan Numpang Uji Masuk' },
        { title: 'Persyaratan Mutasi Masuk' },
        { title: 'Persyaratan Numpang Uji Keluar' },
        { title: 'Persyaratan Mutasi Keluar' },
        { title: 'Alat - Alat Pengujian Kendaraan' },
        { title: 'Informasi Terkait Kalibrasi Alat Uji' },
        { title: 'Profil UPTD PKB BANTUL' },
        // Tambahkan item peraturan sesuai kebutuhan
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Informasi</Text>
            </View>
            <Text style={styles.subTitle}>Informasi Terkait PKB</Text>

            {peraturanData.map((item, index) => (
                <View key={index} style={[styles.card, index === 0 && styles.topCard]}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <TouchableOpacity style={styles.arrowIcon}>
                        <AntDesign name="right" size={24} color="#000" />
                    </TouchableOpacity>
                    {index !== peraturanData.length - 1 && <View style={styles.bottomLine} />}
                </View>
            ))}
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
    card: {
        backgroundColor: '#FFF',
        borderRadius: 0,
        overflow: 'hidden',
        padding: 20,
    },
    topCard: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    arrowIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    bottomLine: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginVertical: 10,
    },
});

export default RelatedInfoScreen;
