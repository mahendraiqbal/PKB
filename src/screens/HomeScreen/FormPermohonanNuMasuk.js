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

const FormPermohonanNuMasuk = ({ navigation, route }) => {
    const [noKendaraanAB, setNoKendaraanAB] = useState('AB');
    const [noKendaraanAngka, setNoKendaraanAngka] = useState('');
    const [noKendaraanHuruf, setNoKendaraanHuruf] = useState('');
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isCameraOpenSertifikat, setIsCameraOpenSertifikat] = useState(false);
    const [isCameraOpenKartuUji, setIsCameraOpenKartuUji] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const cameraRef = useRef(null);
    const cameraRefKartuUji = useRef(null);
    const cameraRefSertifikat = useRef(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [capturedPhotoKartuUji, setCapturedKartuUji] = useState(null);
    const [capturedPhotoRekomAsalDaerah, setCapturedRekomAsalDaerah] = useState(null);
    const [capturedSertifikat, setCapturedSertifikat] = useState(null);
    const cameraRefSRUT = useRef(null);
    const [isCameraOpenSuratRekom, setIsCameraOpenSuratRekom] = useState(false);
    const [selectedKecamatan, setSelectedKecamatan] = useState('');
    const [selectedKelurahan, setSelectedKelurahan] = useState('');
    const [noRangka, setNoRangka] = useState('');
    const [namaPemilik, setNamaPemilik] = useState('');
    const [alamat, setAlamat] = useState('');
    const [selectedMerk, setSelectedMerk] = useState('');
    const [selectedTipe, setSelectedTipe] = useState('');
    const [selectedJenisKen, setSelectedJenisKen] = useState('');
    const [selectedDaerahAsal, setSelectedDaerahAsal] = useState('');
    const [jbb, setJbb] = useState('');
    const [isContinueClicked, setIsContinueClicked] = useState(false);
    const [formattedDate, setFormattedDate] = useState(null);
    const [barcodeData, setBarcodeData] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [noUjiKendaraan, setNoUjiKendaraan] = useState('');
    const [tahunKendaraan, setTahunKendaraan] = useState('');

    const generateQRCode = () => {
        // Combine all data into one string
        const combinedData = `${noKendaraanAB}${noKendaraanAngka}${noKendaraanHuruf}${selectedKecamatan}${noRangka}${namaPemilik}${selectedKelurahan}${capturedPhoto}${capturedPhotoRekomAsalDaerah}${selectedDate}${capturedPhotoKartuUji}${capturedSertifikat}`;

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
                capturedPhotoKartuUji,
                capturedPhotoRekomAsalDaerah,
                capturedSertifikat,
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

    const handleCaptureSuratRekom = async () => {
        if (cameraRefSRUT.current) {
            try {
                const photoRekomDaerahAsal = await cameraRefSRUT.current.takePictureAsync();
                console.log('Captured photo Rekom Daerah Asal:', photoRekomDaerahAsal);
                setCapturedRekomAsalDaerah(photoRekomDaerahAsal.uri);
            } catch (error) {
                console.error('Error taking picture Rekom Daerah Asal:', error);
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
        if (cameraRefKartuUji.current) {
            try {
                const photo = await cameraRefKartuUji.current.takePictureAsync();
                console.log('Captured photo:', photo);
                setCapturedPhoto(photo.uri);
            } catch (error) {
                console.error('Error taking picture:', error);
            }
        }
    };

    const handleCaptureKartuUji = async () => {
        if (cameraRefSertifikat.current) {
            try {
                const photo = await cameraRefSertifikat.current.takePictureAsync();
                console.log('Captured photo:', photo);
                setCapturedPhoto(photo.uri);
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

    const handleDaerahAsalChange = (value) => {
        console.log('Selected Daerah Asal:', value);
        setSelectedDaerahAsal(value);
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
                        <Text style={styles.headerTitle}>Permohonan Nu Masuk</Text>
                    </View>

                    {/* Subtitle */}
                    <Text style={styles.subtitle}>Mengisi Data Kendaraan</Text>

                    {/* Form Card */}
                    <View style={styles.mainCard}>
                        <View style={styles.formCard}>
                            <Text style={styles.formTitle}>No Kendaraan</Text>
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
                            <Text style={styles.formTitle}>Tahun kendaraan</Text>
                            <TextInput
                                style={styles.inputAlamat}
                                placeholder="Masukkan Tahun Kendaraan"
                                value={tahunKendaraan}
                                onChangeText={(text) => setTahunKendaraan(text)}
                            />
                        </View>

                        <View style={styles.kecamatanCard}>
                            <Text style={styles.formTitle}>Daerah Asal</Text>
                            <RNPickerSelect
                                placeholder={{ label: 'Select Daerah Asal', value: '' }}
                                onValueChange={handleDaerahAsalChange}
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
                            <Text style={styles.formTitle}>Surat Rekom Daerah Asal</Text>
                            {hasCameraPermission === null ? (
                                <View />
                            ) : hasCameraPermission === false ? (
                                <Text>No access to camera</Text>
                            ) : (
                                <View style={styles.cameraContainer}>
                                    {isCameraOpenSuratRekom && (
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
                                onPress={() => setIsCameraOpenSuratRekom(!isCameraOpenSuratRekom)}
                            >
                                <Text style={styles.captureButtonText}>
                                    {isCameraOpenSuratRekom ? 'Close Camera' : 'Open Camera'}
                                </Text>
                            </TouchableOpacity>
                            {isCameraOpenSuratRekom && (
                                <TouchableOpacity
                                    style={styles.captureButton}
                                    onPress={handleCaptureSuratRekom}
                                >
                                    <Text style={styles.captureButtonText}>Capture Photo Surat Rekom</Text>
                                </TouchableOpacity>
                            )}

                            {capturedPhotoRekomAsalDaerah && (
                                <View style={styles.capturedPhotoContainer}>
                                    <Image
                                        source={{ uri: capturedPhotoRekomAsalDaerah }}
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
                                    {isCameraOpenKartuUji && (
                                        <Camera
                                            ref={cameraRefKartuUji}
                                            style={{ flex: 1 }}
                                            type={Camera.Constants.Type.back}
                                            ratio="4:3"
                                        />
                                    )}
                                </View>
                            )}
                            <TouchableOpacity
                                style={styles.captureButton}
                                onPress={() => setIsCameraOpenKartuUji(!isCameraOpenKartuUji)}
                            >
                                <Text style={styles.captureButtonText}>
                                    {isCameraOpenKartuUji ? 'Close Camera' : 'Open Camera'}
                                </Text>
                            </TouchableOpacity>
                            {isCameraOpenKartuUji && (
                                <TouchableOpacity
                                    style={styles.captureButton}
                                    onPress={handleCaptureKartuUji}
                                >
                                    <Text style={styles.captureButtonText}>Capture Photo Surat Rekom</Text>
                                </TouchableOpacity>
                            )}

                            {capturedPhotoKartuUji && (
                                <View style={styles.capturedPhotoContainer}>
                                    <Image
                                        source={{ uri: capturedPhotoKartuUji }}
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
                                    <Text style={styles.captureButtonText}>Capture Photo Surat Rekom</Text>
                                </TouchableOpacity>
                            )}

                            {capturedSertifikat && (
                                <View style={styles.capturedPhotoContainer}>
                                    <Image
                                        source={{ uri: capturedSertifikat }}
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

export default FormPermohonanNuMasuk;