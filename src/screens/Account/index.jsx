import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  // Çıkış yapma fonksiyonu
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Token'ı AsyncStorage'dan siliyoruz
      navigation.navigate('Login'); // Kullanıcıyı giriş sayfasına yönlendiriyoruz
    } catch (e) {
      console.error('Çıkış yapılamadı:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Buradan hesabınızı yönetebilirsiniz</Text>

      {/* Diğer içerikler buraya eklenebilir */}

      {/* Çıkış Yap Butonu */}
      <TouchableOpacity onPress={logout} style={styles.button}>
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAE0',
    justifyContent: 'space-between', // Bu özellik tüm içerik ile butonu ayırarak butonu alt kısma sabitler
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#283618',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#BC6C25',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#FEFAE0',
    fontWeight: 'bold',
  },
});

export default Account;
