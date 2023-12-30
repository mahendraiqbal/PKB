// FormUjiPertamaScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Button,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import RNPickerSelect from 'react-native-picker-select';
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment';
import Modal from 'react-native-modal';

const FormPermohonanMutasiKeluar = ({ navigation, route }) => {
    const [noKendaraanAB, setNoKendaraanAB] = useState('AB');
    const [noKendaraanAngka, setNoKendaraanAngka] = useState('');
    const [noKendaraanHuruf, setNoKendaraanHuruf] = useState('');
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isCameraOpenSertifikat, setIsCameraOpenSertifikat] = useState(false);
    const [isCameraOpenFiscalDaerah, setIsCameraOpenFiscalDaerah] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [capturedPhotoSertifikat, setCapturedPhotoSertifikat] = useState(null);
    const [capturedPhotoFiscalDaerah, setCapturedPhotoFiscalDaerah] = useState(null);
    const cameraRef = useRef(null);
    const cameraRefSertifikat = useRef(null);
    const cameraRefFiscalDaerah = useRef(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [capturedPhotoSRUT, setCapturedPhotoSRUT] = useState(null);
    const cameraRefSRUT = useRef(null);
    const [isCameraOpenSRUT, setIsCameraOpenSRUT] = useState(false);
    const [selectedKecamatan, setSelectedKecamatan] = useState('');
    const [selectedKelurahan, setSelectedKelurahan] = useState('');
    const [noRangka, setNoRangka] = useState('');
    const [namaPemilik, setNamaPemilik] = useState('');
    const [alamat, setAlamat] = useState('');
    const [masaBerlaku, setMasaBerlaku] = useState('');
    const [tahunKendaraan, setTahunKendaraan] = useState('');
    const [noUjiKendaraan, setNoUjiKendaraan] = useState('');
    const [selectedMerk, setSelectedMerk] = useState('');
    const [selectedTipe, setSelectedTipe] = useState('');
    const [selectedJenisKen, setSelectedJenisKen] = useState('');
    const [selectedDaerahTujuan, setSelectedDaerahTujaun] = useState('');
    const [jbb, setJbb] = useState('');
    const [isContinueClicked, setIsContinueClicked] = useState(false);
    const [formattedDate, setFormattedDate] = useState(null);
    const [barcodeData, setBarcodeData] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const generateQRCode = () => {
        // Combine all data into one string
        const combinedData = `${noKendaraanAB}${noKendaraanAngka}${noKendaraanHuruf}${selectedKecamatan}${noRangka}${namaPemilik}${selectedKelurahan}${capturedPhoto}${capturedPhotoSRUT}${selectedDate}`;

        // Set barcode data
        setBarcodeData(combinedData);

        // Show modal
        setIsModalVisible(true);
    };

    const closeModal = () => {
        // Close modal
        setIsModalVisible(false);

        // Navigate back to home
        navigation.navigate('Home', {
            ujiPertamaData: {
                noKendaraanAB,
                noKendaraanAngka,
                noKendaraanHuruf,
                selectedKecamatan,
                noRangka,
                namaPemilik,
                selectedKelurahan,
                capturedPhoto,
                capturedPhotoSRUT,
                selectedDate,
            },
            barcodeData,
        });
    };

    useEffect(() => {
        (async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            setHasCameraPermission(status === 'granted');
        })();
    }, []);


    // Extracting selectedDate from route.params
    const { selectedDate } = route.params;

    const handleCaptureSRUT = async () => {
        if (cameraRefSRUT.current) {
            try {
                const photoSRUT = await cameraRefSRUT.current.takePictureAsync();
                console.log('Captured photo SRUT:', photoSRUT);
                setCapturedPhotoSRUT(photoSRUT.uri);
            } catch (error) {
                console.error('Error taking picture SRUT:', error);
            }
        }
    };


    const handleCapture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                console.log('Captured photo:', photo);
                setCapturedPhoto(photo.uri);
            } catch (error) {
                console.error('Error taking picture:', error);
            }
        }
    };

    const handleCaptureSertifikat = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRefSertifikat.current.takePictureAsync();
                console.log('Captured photo:', photo);
                setCapturedPhotoSertifikat(photo.uri);
            } catch (error) {
                console.error('Error taking picture:', error);
            }
        }
    };

    const handleCaptureFiscalDaerah = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRefFiscalDaerah.current.takePictureAsync();
                console.log('Captured photo:', photo);
                setCapturedPhotoFiscalDaerah(photo.uri);
            } catch (error) {
                console.error('Error taking picture:', error);
            }
        }
    };

    const handleMerekChange = (value) => {
        console.log('Selected Merek:', value);
        setSelectedMerk(value);
    };

    const handleTipeChange = (value) => {
        console.log('Selected Tipe:', value);
        setSelectedTipe(value);
    };

    const handleJenisKenChange = (value) => {
        console.log('Selected Jenis Kendaraan:', value);
        setSelectedJenisKen(value);
    };

    const handleDaerahTujuanChange = (value) => {
        console.log('Selected Daerah Tujuan:', value);
        setSelectedDaerahTujaun(value);
    };

    useEffect(() => {
        if (selectedDate) {
            const formattedDate = moment(selectedDate).format('DD MMMM YYYY');
            setFormattedDate(formattedDate);
        }
    }, [selectedDate]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFC436' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text>back</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Permohonan Uji Pertama</Text>
                    </View>

                    {/* Subtitle */}
                    <Text style={styles.subtitle}>Mengisi Data Kendaraan</Text>

                    {/* Form Card */}
                    <View style={styles.mainCard}>
                        <View style={styles.formCard}>
                            <Text style={styles.formTitle}>Nomor Kendaraan</Text>
                            <View style={styles.formRow}>
                                <TextInput
                                    style={styles.inputAB}
                                    value={noKendaraanAB}
                                    editable={false}
                                />
                                <TextInput
                                    style={styles.inputAngka}
                                    placeholder="1234"
                                    keyboardType="numeric"
                                    value={noKendaraanAngka}
                                    onChangeText={(text) => setNoKendaraanAngka(text)}
                                />
                                <TextInput
                                    style={styles.inputHuruf}
                                    placeholder="XYZ"
                                    value={noKendaraanHuruf}
                                    onChangeText={(text) => setNoKendaraanHuruf(text)}
                                />
                            </View>
                        </View>

                        <View style={styles.formCard}>
                            <Text style={styles.formTitle}>No Uji Kendaraan</Text>
                            <TextInput
                                style={styles.inputAlamat}
                                placeholder="Masukkan No Uji Kendaraan"
                                value={noUjiKendaraan}
                                onChangeText={(text) => setNoUjiKendaraan(text)}
                            />
                        </View>

                        <View style={styles.formCard}>
                            <Text style={styles.formTitle}>No Rangka</Text>
                            <TextInput
                                style={styles.inputAlamat}
                                placeholder="Masukkan No Rangka"
                                value={noRangka}
                                onChangeText={(text) => setNoRangka(text)}
                            />
                        </View>

                        <View style={styles.formCard}>
                            <Text style={styles.formTitle}>Nama Pemilik</Text>
                            <TextInput
                                style={styles.inputAlamat}
                                placeholder="Masukkan Nama Pemilik"
                                value={namaPemilik}
                                onChangeText={(text) => setNamaPemilik(text)}
                            />
                        </View>

                        <View style={styles.formCard}>
                            <Text style={styles.formTitle}>Alamat</Text>
                            <TextInput
                                style={styles.inputAlamat}
                                placeholder="Masukkan Alamat"
                                value={alamat}
                                onChangeText={(text) => setAlamat(text)}
                            />
                        </View>

                        <View style={styles.kecamatanCard}>
                            <Text style={styles.formTitle}>Merek</Text>
                            <RNPickerSelect
                                placeholder={{ label: 'Select Merek', value: '' }}
                                onValueChange={handleMerekChange}
                                items={[
                                    { label: 'Gamping', value: 'Gamping' },
                                    { label: 'Condongcatur', value: 'Condongcatur' },
                                    { label: 'Babarsari', value: 'Babarsari' },
                                ]}
                                style={pickerSelectStyles}
                            />

                        </View>

                        <View style={styles.kecamatanCard}>
                            <Text style={styles.formTitle}>Tipe</Text>
                            <RNPickerSelect
                                placeholder={{ label: 'Select Tipe', value: '' }}
                                onValueChange={handleTipeChange}
                                items={[
                                    { label: 'Gamping', value: 'Gamping' },
                                    { label: 'Condongcatur', value: 'Condongcatur' },
                                    { label: 'Babarsari', value: 'Babarsari' },
                                ]}
                                style={pickerSelectStyles}
                            />

                        </View>

                        <View style={styles.kecamatanCard}>
                            <Text style={styles.formTitle}>Jenis Kendaraan</Text>
                            <RNPickerSelect
                                placeholder={{ label: 'Select Jenis Kendaraan', value: '' }}
                                onValueChange={handleJenisKenChange}
                                items={[
                                    { label: 'Gamping', value: 'Gamping' },
                                    { label: 'Condongcatur', value: 'Condongcatur' },
                                    { label: 'Babarsari', value: 'Babarsari' },
                                ]}
                                style={pickerSelectStyles}
                            />

                        </View>

                        <View style={styles.formCard}>
                            <Text style={styles.formTitle}>JBB</Text>
                            <TextInput
                                style={styles.inputAlamat}
                                placeholder="Masukkan JBB"
                                value={jbb}
                                onChangeText={(text) => setJbb(text)}
                            />
                        </View>

                        <View style={styles.formCard}>
                            <Text style={styles.formTitle}>Tahun Kendaraan</Text>
                            <TextInput
                                style={styles.inputAlamat}
                                placeholder="Masukkan Tahun Kendaraan"
                                value={tahunKendaraan}
                                onChangeText={(text) => setTahunKendaraan(text)}
                            />
                        </View>

                        <View style={styles.formCard}>
                            <Text style={styles.formTitle}>Masa Berlaku Uji Terakhir</Text>
                            <TextInput
                                style={styles.inputAlamat}
                                placeholder="Masukkan Berlaku Uji Terakhir"
                                value={masaBerlaku}
                                onChangeText={(text) => setMasaBerlaku(text)}
                            />
                        </View>

                        <View style={styles.kecamatanCard}>
                            <Text style={styles.formTitle}>Daerah Tujuan</Text>
                            <RNPickerSelect
                                placeholder={{ label: 'Select Jenis Kendaraan', value: '' }}
                                onValueChange={handleDaerahTujuanChange}
                                items={[
                                    { label: 'Gamping', value: 'Gamping' },
                                    { label: 'Condongcatur', value: 'Condongcatur' },
                                    { label: 'Babarsari', value: 'Babarsari' },
                                ]}
                                style={pickerSelectStyles}
                            />

                        </View>

                        {/* Camera Card */}
                        <View style={styles.cameraCard}>
                            <Text style={styles.formTitle}>KTP Pemohon</Text>
                            {hasCameraPermission === null ? (
                                <View />
                            ) : hasCameraPermission === false ? (
                                <Text>No access to camera</Text>
                            ) : (
                                <View style={styles.cameraContainer}>
                                    {isCameraOpen && (
                                        <Camera
                                            ref={cameraRef}
                                            style={{ flex: 1 }}
                                            type={Camera.Constants.Type.back}
                                            ratio="4:3"
                                        />
                                    )}
                                </View>
                            )}
                            <TouchableOpacity
                                style={styles.captureButton}
                                onPress={() => setIsCameraOpen(!isCameraOpen)}
                            >
                                <Text style={styles.captureButtonText}>
                                    {isCameraOpen ? 'Close Camera' : 'Open Camera'}
                                </Text>
                            </TouchableOpacity>
                            {isCameraOpen && (
                                <TouchableOpacity
                                    style={styles.captureButton}
                                    onPress={handleCapture}
                                >
                                    <Text style={styles.captureButtonText}>Capture Photo</Text>
                                </TouchableOpacity>
                            )}

                            {capturedPhoto && (
                                <View style={styles.capturedPhotoContainer}>
                                    <Image
                                        source={{ uri: capturedPhoto }}
                                        style={styles.capturedPhoto}
                                    />
                                </View>
                            )}
                        </View>


                        <View style={styles.cameraCard}>
                            <Text style={styles.formTitle}>Kartu Uji</Text>
                            {hasCameraPermission === null ? (
                                <View />
                            ) : hasCameraPermission === false ? (
                                <Text>No access to camera</Text>
                            ) : (
                                <View style={styles.cameraContainer}>
                                    {isCameraOpenSRUT && (
                                        <Camera
                                            ref={cameraRefSRUT}
                                            style={{ flex: 1 }}
                                            type={Camera.Constants.Type.back}
                                            ratio="4:3"
                                        />
                                    )}
                                </View>
                            )}
                            <TouchableOpacity
                                style={styles.captureButton}
                                onPress={() => setIsCameraOpenSRUT(!isCameraOpenSRUT)}
                            >
                                <Text style={styles.captureButtonText}>
                                    {isCameraOpenSRUT ? 'Close Camera' : 'Open Camera'}
                                </Text>
                            </TouchableOpacity>
                            {isCameraOpenSRUT && (
                                <TouchableOpacity
                                    style={styles.captureButton}
                                    onPress={handleCaptureSRUT}
                                >
                                    <Text style={styles.captureButtonText}>Capture Photo Kartu Uji</Text>
                                </TouchableOpacity>
                            )}

                            {capturedPhotoSRUT && (
                                <View style={styles.capturedPhotoContainer}>
                                    <Image
                                        source={{ uri: capturedPhotoSRUT }}
                                        style={styles.capturedPhoto}
                                    />
                                </View>
                            )}
                        </View>

                        <View style={styles.cameraCard}>
                            <Text style={styles.formTitle}>Sertifikat</Text>
                            {hasCameraPermission === null ? (
                                <View />
                            ) : hasCameraPermission === false ? (
                                <Text>No access to camera</Text>
                            ) : (
                                <View style={styles.cameraContainer}>
                                    {isCameraOpenSertifikat && (
                                        <Camera
                                            ref={cameraRefSertifikat}
                                            style={{ flex: 1 }}
                                            type={Camera.Constants.Type.back}
                                            ratio="4:3"
                                        />
                                    )}
                                </View>
                            )}
                            <TouchableOpacity
                                style={styles.captureButton}
                                onPress={() => setIsCameraOpenSertifikat(!isCameraOpenSertifikat)}
                            >
                                <Text style={styles.captureButtonText}>
                                    {isCameraOpenSertifikat ? 'Close Camera' : 'Open Camera'}
                                </Text>
                            </TouchableOpacity>
                            {isCameraOpenSertifikat && (
                                <TouchableOpacity
                                    style={styles.captureButton}
                                    onPress={handleCaptureSertifikat}
                                >
                                    <Text style={styles.captureButtonText}>Capture Photo Sertifikat</Text>
                                </TouchableOpacity>
                            )}

                            {capturedPhotoSertifikat && (
                                <View style={styles.capturedPhotoContainer}>
                                    <Image
                                        source={{ uri: capturedPhotoSertifikat }}
                                        style={styles.capturedPhoto}
                                    />
                                </View>
                            )}
                        </View>

                        <View style={styles.cameraCard}>
                            <Text style={styles.formTitle}>Fiscal Daerah</Text>
                            {hasCameraPermission === null ? (
                                <View />
                            ) : hasCameraPermission === false ? (
                                <Text>No access to camera</Text>
                            ) : (
                                <View style={styles.cameraContainer}>
                                    {isCameraOpenFiscalDaerah && (
                                        <Camera
                                            ref={cameraRefFiscalDaerah}
                                            style={{ flex: 1 }}
                                            type={Camera.Constants.Type.back}
                                            ratio="4:3"
                                        />
                                    )}
                                </View>
                            )}
                            <TouchableOpacity
                                style={styles.captureButton}
                                onPress={() => setIsCameraOpenFiscalDaerah(!isCameraOpenFiscalDaerah)}
                            >
                                <Text style={styles.captureButtonText}>
                                    {isCameraOpenFiscalDaerah ? 'Close Camera' : 'Open Camera'}
                                </Text>
                            </TouchableOpacity>
                            {isCameraOpenFiscalDaerah && (
                                <TouchableOpacity
                                    style={styles.captureButton}
                                    onPress={handleCaptureFiscalDaerah}
                                >
                                    <Text style={styles.captureButtonText}>Capture Photo Fiscal Daerah</Text>
                                </TouchableOpacity>
                            )}

                            {capturedPhotoFiscalDaerah && (
                                <View style={styles.capturedPhotoContainer}>
                                    <Image
                                        source={{ uri: capturedPhotoFiscalDaerah }}
                                        style={styles.capturedPhoto}
                                    />
                                </View>
                            )}
                        </View>

                        {/* Selected Date Card (Placed at the bottom) */}
                        {selectedDate && (
                            <View style={styles.selectedDateCard}>
                                <Text style={styles.selectedDateText}>
                                    Melakukan uji tanggal pada:
                                </Text>
                                <Text style={styles.selectedDate}>
                                    {isContinueClicked
                                        ? formattedDate
                                        : moment(selectedDate).format('DD MMMM YYYY')}
                                </Text>
                            </View>
                        )}

                    </View>
                    <TouchableOpacity style={styles.saveButton} onPress={generateQRCode}>
                        <Text style={styles.saveButtonText}>Simpan</Text>
                    </TouchableOpacity>

                    {/* Modal for QR Code */}
                    <Modal
                        isVisible={isModalVisible}
                        onBackdropPress={closeModal}
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                    >
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Barcode</Text>
                            <QRCode value={barcodeData} size={200} />
                            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                <Text style={styles.closeButtonText}>Tutup</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'blue',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'blue',
        paddingRight: 30 // to ensure the text is never behind the icon
    }
});

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    mainCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 20,
        padding: 20,
        elevation: 5,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
    },
    formCard: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
    },
    formRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    inputAB: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        width: '30%',
    },
    inputAngka: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        width: '30%',
    },
    inputHuruf: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        width: '30%',
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
    cameraCard: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
    },
    formTitle: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    cameraContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        height: 200,
    },
    captureButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    captureButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    capturedPhotoContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 20,
        height: 400,
        overflow: 'hidden',
    },
    capturedPhoto: {
        flex: 1,
        width: '100%',
    },
    kecamatanCard: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
    },
    continueButton: {
        backgroundColor: '#4285F4',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'center',
    },
    continueButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FormPermohonanMutasiKeluar;