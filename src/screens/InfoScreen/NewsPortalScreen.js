import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const NewsPortalScreen = () => {
    const navigation = useNavigation();

    const newsData = [
        { id: '1', title: 'Berita 1', description: 'Deskripsi berita 1' },
        { id: '2', title: 'Berita 2', description: 'Deskripsi berita 2' },
        { id: '3', title: 'Berita 3', description: 'Deskripsi berita 3' },
        { id: '4', title: 'Berita 4', description: 'Deskripsi berita 4' },
        { id: '5', title: 'Berita 5', description: 'Deskripsi berita 5' },
        // ... Tambahkan data berita lainnya sesuai kebutuhan
    ];

    const navigateToDetail = (newsItem) => {
        navigation.navigate('NewsDetail', { newsItem });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Informasi</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                    <Ionicons name="notifications" size={24} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={styles.subHeader}>
                <Text style={styles.subTitle}>Portal Berita Terkini</Text>
            </View>

            <View style={styles.mainCardContainer}>
                <TouchableOpacity style={styles.mainCard} onPress={() => navigateToDetail(newsData[0])}>
                    <Text style={styles.mainCardTitle}>{newsData[0].title}</Text>
                    <Text style={styles.mainCardDescription}>{newsData[0].description}</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={newsData.slice(1)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.additionalCard} onPress={() => navigateToDetail(item)}>
                        <Text style={styles.additionalCardTitle}>{item.title}</Text>
                        <Text style={styles.additionalCardDescription}>{item.description}</Text>
                    </TouchableOpacity>
                )}
                numColumns={2}
                style={styles.additionalCardsContainer}
                contentContainerStyle={styles.additionalCardsContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFC436', // Warna latar belakang
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF',
    },
    subHeader: {
        marginBottom: 20,
    },
    mainCardContainer: {
        marginBottom: 20,
    },
    mainCard: {
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 15,
    },
    mainCardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    mainCardDescription: {
        marginTop: 10,
        fontSize: 14,
    },
    additionalCardsContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    additionalCardsContent: {
        justifyContent: 'space-between',
    },
    additionalCard: {
        flex: 0.48,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    additionalCardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    additionalCardDescription: {
        marginTop: 8,
        fontSize: 12,
    },
});

export default NewsPortalScreen;
