import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { PacmanIndicator } from 'react-native-indicators';
import { useNavigation } from '@react-navigation/native';

const Loading = () => {
  const navigation=useNavigation();
  useEffect(()=> {
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, 3000); // 3 saniye sonra ana sayfaya yönlendirilir.
  })
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sons of Süleymaniye</Text>
        <PacmanIndicator size={100} color='#dda15e' />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
      <Text style={styles.footer}>ERD Dev.</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefae0',
    padding: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dda15e',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 20, // Başlık ile gösterge arasına daha fazla boşluk
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#dda15e',
    textAlign: 'center', // Pacman ile "Yükleniyor..." arasına boşluk
  },
  footer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#dda15e',
    textAlign: 'center',
    marginTop: 20, // Footer'ı aşağıya kaydıran boşluk
  },
});

export default Loading;
