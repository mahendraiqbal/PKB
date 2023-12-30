import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const DetailScreenHome = ({ route }) => {
    // Get the data from the route parameters
    const { item } = route.params;

    const qrCodeData = JSON.stringify({
        jenisPendaftaran: item.jenisPendaftaran,
        tanggalKedatangan: item.tanggalKedatangan,
        status: item.status,
        noRangka: item.noRangka,
        // ... tambahkan data lainnya
    });

    return (
        <ScrollView style={{ backgroundColor: '#FFC436' }}>
            <View style={styles.container}>

                {/* Additional Data */}
                <View style={styles.additionalData}>
                    <Text style={styles.additionalTitle}>Informasi Tambahan</Text>
                    <View style={styles.additionalDataRow}>
                        <Text style={styles.additionalLabel}>No Rangka:</Text>
                        <Text style={styles.additionalValue}>{item.noRangka}</Text>
                    </View>
                    <View style={styles.additionalDataRow}>
                        <Text style={styles.additionalLabel}>Nama Pemilik:</Text>
                        <Text style={styles.additionalValue}>{item.namaPemilik}</Text>
                    </View>
                    <View style={styles.additionalDataRow}>
                        <Text style={styles.additionalLabel}>Alamat Pemilik:</Text>
                        <Text style={styles.additionalValue}>{item.alamatPemilik}</Text>
                    </View>
                    <View style={styles.additionalDataRow}>
                        <Text style={styles.additionalLabel}>Merek:</Text>
                        <Text style={styles.additionalValue}>{item.merek}</Text>
                    </View>
                    <View style={styles.additionalDataRow}>
                        <Text style={styles.additionalLabel}>Tipe:</Text>
                        <Text style={styles.additionalValue}>{item.tipe}</Text>
                    </View>
                    <View style={styles.additionalDataRow}>
                        <Text style={styles.additionalLabel}>Jenis:</Text>
                        <Text style={styles.additionalValue}>{item.jenis}</Text>
                    </View>
                </View>

                {/* Foto Card */}
                <View style={styles.fotoCard}>
                    <Text style={styles.additionalTitle}>Foto</Text>
                    <View style={styles.fotoContainer}>
                        <Image
                            source={{ uri: item.fotoKTP }}
                            style={styles.foto}
                        />
                        {item.status === 'uji pertama' && (
                            <Image
                                source={{ uri: item.fotoSRUT }}
                                style={styles.foto}
                            />
                        )}
                    </View>
                </View>

                {/* Barcode Card */}
                <View style={styles.qrCodeCard}>
                    <Text style={styles.additionalTitle}>QR Code</Text>
                    <QRCode
                        value={qrCodeData}
                        size={200}
                        color="#000"
                    />
                </View>
            </View>
        </ScrollView>
    );
};

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    card: {
        borderRadius: 15,
        padding: 15,
        position: 'relative',
        marginBottom: 20,
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
    additionalData: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
    },
    additionalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
    },
    additionalDataRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    additionalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5,
        color: '#000',
    },
    additionalValue: {
        fontSize: 16,
        color: '#000',
    },
    fotoCard: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
    },
    fotoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    foto: {
        width: '48%',
        height: 150,
        borderRadius: 8,
    },
    barcodeCard: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
    },
    barcodeImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
});

export default DetailScreenHome;
