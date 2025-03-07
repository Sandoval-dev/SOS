import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    const [user, setUser] = useState(null); // Kullanıcı verisini tutacak state
    const [loading, setLoading] = useState(true); // Yükleniyor durumu için state

  



    return (
        <SafeAreaView style={styles.container}>
            {user ? (
                <View>
                    <Text style={styles.title}>Hoşgeldiniz, {user.username}</Text> {/* Kullanıcı adı gösterimi */}
                    <Text style={styles.subtitle}>E-posta: {user.email}</Text> {/* Kullanıcı e-posta gösterimi */}
                </View>
            ) : (
                <Text style={styles.subtitle}>Kullanıcı verisi bulunamadı.</Text> // Eğer kullanıcı verisi yoksa
            )}
        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFAE0',
        justifyContent: 'center', // Ortalamak için
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#283618',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#283618',
        marginBottom: 20,
        textAlign: 'center',
    },
});
