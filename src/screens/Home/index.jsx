import React, { useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native'; // React Navigation hook'u

// Kart bileşeni
const Card = ({ title, description, index, resetAnimation }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  // Kartın animasyon stili
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(scale.value, { damping: 5 }) }],
      opacity: withTiming(opacity.value, { duration: 100 }),  // Fade in animasyonu
    };
  });

  // FadeIn animasyonu başlat
  useEffect(() => {
    if (resetAnimation) {
      opacity.value = 0; // Yeniden sıfırlama
      setTimeout(() => {
        opacity.value = withDelay(index * 200, withTiming(1, { duration: 500 }));  // Sırasıyla gelmesi için gecikme ekliyoruz
      }, 100); // Bir süre bekledikten sonra animasyonu başlat
    }
  }, [resetAnimation, index]);

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <TouchableOpacity
        onPressIn={() => scale.value = 0.95}
        onPressOut={() => scale.value = 1}
        style={styles.touchable}
      >
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Home = () => {
  const data = [
    { id: 1, title: 'Item 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel massa ac velit euismod consectetur.' },
    { id: 2, title: 'Item 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel massa ac velit euismod consectetur.' },
    { id: 3, title: 'Item 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel massa ac velit euismod consectetur.' },
    { id: 4, title: 'Item 4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel massa ac velit euismod consectetur.' },
    { id: 5, title: 'Item 5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel massa ac velit euismod consectetur.' },
  ];

  const isFocused = useIsFocused(); // Sayfanın odaklanıp odaklanmadığını kontrol et

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FEFAE0' }}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <Card title={item.title} description={item.description} index={index} resetAnimation={isFocused} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  touchable: {
    width: '100%',
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#283618',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#606C38',
    lineHeight: 20,
  },
});
