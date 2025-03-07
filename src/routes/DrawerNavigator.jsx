import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Account from '../screens/Account'; // Account component'ını ekledik
import Profile from '../screens/Profile';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';  // MaterialIcons import ediliyor
import IonIcons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator 
            screenOptions={{
                headerStyle: styles.header,  // Header stillerini burada uyguladık
                drawerStyle: styles.drawer, // Drawer stillerini burada uyguladık
                drawerLabelStyle: styles.drawerLabel, // Drawer etiket stillerini uyguladık
                headerTintColor:'#fefae0',
                drawerActiveBackgroundColor:'#dda15e'

            }}
        >
            <Drawer.Screen 
                name="Profile" 
                component={Profile} 
                options={{ 
                    title: 'Profilim',
                    drawerIcon: ({ focused}) => (
                        <IconMaterial 
                            name={focused ? "person" : "person-outline"}  // focused durumuna göre simge değişiyor
                            size={18} 
                            color='#283618'  // aktif iken simgenin rengi, otomatik olarak navigation'dan geliyor
                        />
                    ),
                }} 
            />
            <Drawer.Screen 
                name="AccountSettings" 
                component={Account} 
                options={{ 
                    title: 'Hesap Ayarları', 
                    drawerIcon: ({ focused}) => (
                        <IonIcons 
                            name={focused ? "settings" : "settings-outline"}  // focused durumuna göre simge değişiyor
                            size={18} 
                            color='#283618'  // aktif iken simgenin rengi, otomatik olarak navigation'dan geliyor
                        />
                    ),
                }} 
            />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#dda15e', // Header arka plan rengi
        height: 60, // Header yüksekliği
    },
    drawer: {
        backgroundColor: '#FEFAE0', // Drawer'ın arka plan rengi
        width: 240, // Drawer genişliği
    },
    drawerLabel: {
        fontSize: 20,
        fontWeight: '600',
        color: '#283618', // Drawer etiket rengi
    },
});
