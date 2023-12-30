import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const InfoScreen = ({ navigation }) => {
    const handleRulePKB = () => {
        navigation.navigate('RuleInfo')
    }
    const handleRelatedPKB = () => {
        navigation.navigate('RelatedInfo')
    }
    const handleQuotaPKB = () => {
        navigation.navigate('InfoQuota')
    }
    const handleNewsPortal = () => {
        navigation.navigate('NewsPortal')
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Informasi</Text>
                <TouchableOpacity style={styles.notificationIcon}>
                    <Ionicons name="notifications" size={24} color="#000000" />
                </TouchableOpacity>
            </View>
            <Text style={styles.subTitle}>Daftar Informasi PKB</Text>

            {/* Card 1: Peraturan terkait PKB */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Peraturan terkait PKB</Text>
                <TouchableOpacity style={styles.arrowIcon} onPress={handleRulePKB}>
                    <AntDesign name="right" size={24} color="#000" />
                </TouchableOpacity>
                <View style={styles.bottomLine} />
                <Text style={styles.cardText}>Peraturan perundang - undangan PKB.</Text>
            </View>

            {/* Card 2: Informasi Terkait PKB */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Informasi Terkait PKB</Text>
                <TouchableOpacity style={styles.arrowIcon} onPress={handleRelatedPKB}>
                    <AntDesign name="right" size={24} color="#000" />
                </TouchableOpacity>
                <View style={styles.bottomLine} />
                <Text style={styles.cardText}>Alur, Alat, Kalibrasi, Persyaratan, dan Profil.</Text>
            </View>

            {/* Card 3: Informasi Kuota Pengujian */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Informasi Kuota Pengujian</Text>
                <TouchableOpacity style={styles.arrowIcon} onPress={handleQuotaPKB}>
                    <AntDesign name="right" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.cardText}>Informasi pendaftaran pengujian.</Text>
            </View>

            {/* Berita PKB */}
            <View style={styles.newsContainer}>
                <View style={styles.newsHeader}>
                    <Text style={styles.newsTitle}>Berita PKB</Text>
                    <TouchableOpacity style={styles.viewAllButton} onPress={handleNewsPortal}>
                        <Text style={styles.viewAllText}>Lihat Semua</Text>
                    </TouchableOpacity>
                </View>
                {/* Card 1: Berita Pertama */}
                <View style={styles.newsCard}>
                    {/* Konten Berita */}
                </View>

                {/* Card 2: Berita Kedua */}
                <View style={styles.doubleNewsCard}>
                    {/* Konten Berita Kedua */}
                </View>
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
        marginBottom: 10,
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
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#FFF',
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
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
    cardText: {
        fontSize: 16,
    },
    newsContainer: {
        marginTop: 20,
    },
    newsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Menyamakan vertikal
        marginBottom: 10,
    },
    newsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    viewAllButton: {
        padding: 10,
    },
    viewAllText: {
        color: 'blue',
    },
    newsCard: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
    },
    doubleNewsCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default InfoScreen;
