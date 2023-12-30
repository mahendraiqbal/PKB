import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const NewsDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { newsItem } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                    <Ionicons name="notifications" size={24} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={styles.subHeader}>
                <Text style={styles.subTitle}>{newsItem.title}</Text>
            </View>

            <View style={styles.mainCard}>
                <Text style={styles.mainCardDescription}>Detail dari berita ini.</Text>
                {/* Tambahkan elemen lain yang diperlukan untuk detail berita */}
            </View>
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
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subHeader: {
        marginBottom: 20,
    },
    mainCard: {
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 15,
    },
    mainCardDescription: {
        marginTop: 10,
        fontSize: 14,
    },
});

export default NewsDetailScreen;
