import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HistoryScreen = () => {
    const data = [
        { id: 1, noKendaraan: 'ABCDE123', jenisPendaftaran: 'uji pertama', tanggalKedatangan: '2023-01-01', status: 'menunggu uji' },
        { id: 2, noKendaraan: 'FGHIJ456', jenisPendaftaran: 'uji berkala', tanggalKedatangan: '2023-02-01', status: 'lulus uji' },
        { id: 3, noKendaraan: 'KLMNO789', jenisPendaftaran: 'numpang uji keluar', tanggalKedatangan: '2023-03-01', status: 'tidak lulus uji' },
        { id: 4, noKendaraan: 'PQRSTU012', jenisPendaftaran: 'uji pertama', tanggalKedatangan: '2023-04-01', status: 'disetujui' },
        // Add more data as needed
    ];

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'menunggu uji':
                return '#FFC436';
            case 'lulus uji':
                return '#0B666A';
            case 'tidak lulus uji':
                return '#F31559';
            case 'disetujui':
                return '#0B666A';
            default:
                return '#FFF'; // Default color
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Riwayat</Text>
                <Ionicons name="notifications" size={24} color="#000000" />
            </View>
            <Text style={styles.subtitle}>Daftar Riwayat Permohonan</Text>
            <View style={styles.outerCard}>
                {data.map((item) => (
                    <View key={item.id} style={styles.innerCard}>
                        <View style={[styles.card, { backgroundColor: getStatusColor(item.status) }]}>
                            <View style={styles.rowContainer}>
                                <Text style={styles.itemValue}>{item.noKendaraan}</Text>
                                <Ionicons name="chevron-forward" size={24} color="#FFF" style={styles.icon} />
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.itemLabel}>Jenis Pendaftaran:</Text>
                                <Text style={styles.itemValue}>{item.jenisPendaftaran}</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.itemLabel}>Tanggal Kedatangan:</Text>
                                <Text style={styles.itemValue}>{item.tanggalKedatangan}</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.itemLabel}>Status:</Text>
                                <Text style={[styles.itemValue, styles.underlineText]}>{item.status}</Text>
                            </View>
                            <View style={styles.underlineContainer}>
                                <View style={styles.underline} />
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
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
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 10,
    },
    subtitle: {
        paddingTop: 15,
        fontSize: 18,
        color: '#FFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    outerCard: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop: 10,
    },
    innerCard: {
        marginBottom: 15,
    },
    card: {
        borderRadius: 15,
        padding: 15,
        position: 'relative',
    },
    itemLabel: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
        marginTop: 5,
        flex: 1,
    },
    itemValue: {
        fontSize: 16,
        color: '#FFF',
        marginBottom: 10,
        flex: 1,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    underlineContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
    },
    underline: {
        borderBottomWidth: 1,
        borderColor: '#FFF',
        width: '100%',
    },
    icon: {
        marginLeft: 10,
    },
});

export default HistoryScreen;
