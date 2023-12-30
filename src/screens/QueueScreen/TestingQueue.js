import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const TestingQueue = ({ navigation }) => {
    const data = [
        { id: '1', noAntrian: '001', noKendaraan: 'ABCDE123', posisi: 'Emisi', keterangan: 'Lulus' },
        { id: '2', noAntrian: '002', noKendaraan: 'FGHIJ456', posisi: 'Lampu', keterangan: 'Tidak Lulus' },
        { id: '3', noAntrian: '003', noKendaraan: 'DSDSDDDW', posisi: 'Menunggu', keterangan: '-' },
        // Tambahkan data sesuai kebutuhan
    ];

    const renderItem = ({ item }) => (
        <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.noAntrian}</Text>
            <Text style={styles.tableCell}>{item.noKendaraan}</Text>
            <Text style={styles.tableCell}>{item.posisi}</Text>
            <Text style={styles.tableCell}>{item.keterangan}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Antrian</Text>
            </View>
            <Text style={styles.subTitle}>Daftar Antrian Pengujian</Text>
            <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>No Antrian</Text>
                <Text style={styles.tableHeaderText}>No Kendaraan</Text>
                <Text style={styles.tableHeaderText}>Posisi</Text>
                <Text style={styles.tableHeaderText}>Keterangan</Text>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
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
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginLeft: 10,
    },
    subTitle: {
        fontSize: 18,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    tableHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
        flex: 1,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    tableCell: {
        fontSize: 14,
        flex: 1,
        textAlign: 'center',
    },
});

export default TestingQueue;
