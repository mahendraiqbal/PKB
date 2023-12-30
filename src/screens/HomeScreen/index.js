import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation, route }) => {
    const carouselData = [
        { id: 1, title: 'Berita 1', image: require('../../../assets/coba.jpg') },
        { id: 2, title: 'Berita 2', image: require('../../../assets/coba.jpg') },
        { id: 3, title: 'Berita 3', image: require('../../../assets/coba.jpg') },
    ];

    const [modalVisible, setModalVisible] = useState(false);
    const [additionalCardData, setAdditionalCardData] = useState(null);
    const [barcodeData, setBarcodeData] = useState('');

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

    useEffect(() => {
        // Mengecek apakah ada data uji pertama dari route.params
        if (route.params && route.params.ujiPertamaData) {
            setAdditionalCardData(route.params.ujiPertamaData);
        }

        // Mengecek apakah ada data barcode dari route.params
        if (route.params && route.params.barcodeData) {
            setBarcodeData(route.params.barcodeData);
        }
    }, [route.params]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            setModalVisible(false);
        });

        return unsubscribe;
    }, [navigation]);

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const handleUjiPertama = () => {
        hideModal();
        navigation.navigate('UjiPertama');
    };

    const handleUjiBerkala = () => {
        hideModal();
        navigation.navigate('UjiBerkala');
    };

    const handleNuMasuk = () => {
        hideModal();
        navigation.navigate('PermohonanNuMasuk');
    };

    const handleMutasiMasuk = () => {
        hideModal();
        navigation.navigate('PermohonanMutasiMasuk');
    };

    const handleNuKeluar = () => {
        hideModal();
        navigation.navigate('PermohonanNuKeluar');
    };

    const handleMutasiKeluar = () => {
        hideModal();
        navigation.navigate('PermohonanMutasiKeluar');
    };

    const handleCardDetail = (item) => {
        hideModal();
        navigation.navigate('DetailScreenHome', { item });
    };

    const renderModalContent = () => (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Pengajuan Permohonan</Text>
                <TouchableOpacity style={styles.modalItem} onPress={handleUjiPertama}>
                    <Text style={styles.modalItemText}>Uji Pertama</Text>
                    <Image source={require('../../../assets/arrow-icon.png')} style={styles.modalItemIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={handleUjiBerkala}>
                    <Text style={styles.modalItemText}>Uji Berkala</Text>
                    <Image source={require('../../../assets/arrow-icon.png')} style={styles.modalItemIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={handleNuMasuk}>
                    <Text style={styles.modalItemText}>Numpang Uji Masuk</Text>
                    <Image source={require('../../../assets/arrow-icon.png')} style={styles.modalItemIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={handleMutasiMasuk}>
                    <Text style={styles.modalItemText}>Mutasi Masuk</Text>
                    <Image source={require('../../../assets/arrow-icon.png')} style={styles.modalItemIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={handleNuKeluar}>
                    <Text style={styles.modalItemText}>Surat Rekom Nu Keluar</Text>
                    <Image source={require('../../../assets/arrow-icon.png')} style={styles.modalItemIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={handleMutasiKeluar}>
                    <Text style={styles.modalItemText}>Surat Rekom Mutasi Keluar</Text>
                    <Image source={require('../../../assets/arrow-icon.png')} style={styles.modalItemIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalClose} onPress={hideModal}>
                    <Text style={styles.modalCloseText}>Tutup</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ScrollView style={{ ...styles.container, backgroundColor: '#FFC436' }}>
            <View style={styles.header}>
                <Text style={styles.title}>Beranda</Text>
                <Ionicons name="notifications" size={24} color="#000000" />
            </View>

            <Swiper style={styles.carouselContainer} showsButtons>
                {carouselData.map(item => (
                    <View key={item.id} style={styles.carouselItem}>
                        <Image source={item.image} style={styles.carouselImage} />
                        <Text style={styles.carouselText}>{item.title}</Text>
                    </View>
                ))}
            </Swiper>

            <TouchableOpacity style={styles.buttonContainer} onPress={showModal}>
                <Text style={styles.buttonText}>Pengajuan Permohonan +</Text>
            </TouchableOpacity>

            <View style={styles.outerCard}>
                {data.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.innerCard}
                        onPress={() => handleCardDetail(item)}
                    >
                        <View style={[styles.cardCard, { backgroundColor: getStatusColor(item.status) }]}>
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
                    </TouchableOpacity>
                ))}
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={hideModal}
            >
                {renderModalContent()}
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    notificationIcon: {
        width: 30,
        height: 30,
    },
    carouselContainer: {
        height: 200,
    },
    carouselItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 8,
    },
    carouselText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        width: '48%',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonContainer: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 15,
    },
    modalItemText: {
        fontSize: 16,
    },
    modalItemIcon: {
        width: 20,
        height: 20,
    },
    modalClose: {
        marginTop: 20,
        alignSelf: 'center',
    },
    modalCloseText: {
        fontSize: 18,
        color: '#4CAF50',
    },
    outerCard: {
        marginTop: 20,
    },
    innerCard: {
        marginBottom: 15,
    },
    cardCard: {
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

export default HomeScreen;
