import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://placekitten.com/200/200' }} // Ganti dengan URL gambar profil Anda
                style={styles.profileImage}
            />
            <Text style={styles.username}>Nama Pengguna</Text>
            <Text style={styles.bio}>Deskripsi profil singkat...</Text>
            {/* Tambahan elemen atau informasi profil lainnya */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bio: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    // Gaya tambahan sesuai kebutuhan Anda
});

export default ProfileScreen;
