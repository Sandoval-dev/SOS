import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSecure, setIsSecure] = useState(true);

    const navigation = useNavigation();
    const togglePasswordVisibility = () => {
        setIsSecure(!isSecure);
    };

    const handleLogin = () => {
        // Login işlemi burada olacak
        console.log('Login button pressed');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Formik 
                initialValues={{ username: '', password: '' }} 
                validationSchema={Yup.object().shape({
                    username: Yup.string().required('Kullanıcı adı gerekli').min(6, 'Kullanıcı adı 6 karakterden az olamaz'),
                    password: Yup.string().required('Şifre gerekli').min(8,'Şifre minimum 8 karakter olmalı').max(16, 'Şifre maksimum 16 karakter olmalı'),
                })}
            >
                {({ values, touched, errors, handleChange, handleBlur, handleSubmit, isValid }) => (
                    <View style={styles.content}>
                        <Text style={styles.title}>Sons of Süleymaniye</Text>
                        <Text style={styles.miniTitle}>Giriş Yap</Text>

                        {/* Kullanıcı Adı */}
                        <TextInput
                            style={styles.input}
                            placeholder="Kullanıcı Adı"
                            placeholderTextColor="#606C38"
                            value={values.username}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                        />
                        {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}
                        
                        {/* Şifre */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Şifre"
                                placeholderTextColor="#606C38"
                                secureTextEntry={isSecure}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                            />
                            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
                            <Icon
                                onPress={togglePasswordVisibility}
                                size={24}
                                color="#606C38"
                                name={isSecure ? "eye-off" : "eye"}
                                style={styles.icon}
                            />
                        </View>

                        {/* Giriş Butonu */}
                        <TouchableOpacity 
                            style={[styles.button, !isValid && styles.disabledButton]} 
                            onPress={handleSubmit} 
                            disabled={!isValid}
                        >
                            <Text style={styles.buttonText}>Giriş Yap</Text>
                        </TouchableOpacity>

                        {/* Kayıt Ol Linki */}
                        <Text style={styles.footer}>
                            Hesabınız yok mu? <Text onPress={() => navigation.navigate("Register")} style={styles.register}>Kayıt Ol</Text>
                        </Text>
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFAE0', // Arkaplan rengi
        justifyContent: 'center',
        padding: 20,
    },
    content: {
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#283618', // Başlık rengi
        marginBottom: 10,
        textAlign: 'center',
    },
    miniTitle: {
        fontSize: 16,
        color: '#283618', // Alt başlık rengi
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#DDA15E', // Koyu altın sarısı
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        color: '#283618', // Koyu metin rengi
        backgroundColor: '#FEFAE0', // Arkaplan rengi
    },
    inputContainer: {
        width: '100%',
        position: 'relative',
    },
    icon: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#BC6C25', // Kahverengi tonları
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 20,
    },
    disabledButton: {
        backgroundColor: '#ccd5ae', // Disabled button color
    },
    buttonText: {
        fontSize: 18,
        color: '#FEFAE0', // Buton metni rengi
        fontWeight: 'bold',
    },
    footer: {
        fontSize: 16,
        color: '#283618',
        textAlign: 'center',
    },
    register: {
        color: '#DDA15E', // Kayıt ol metni rengi
        fontWeight: 'bold',
        textDecorationLine: 'underline', // Alt çizgi ekledim
    },
    error: {
        fontSize: 12,
        color: '#FF5252', // Hatalı giriş mesajı rengi
        marginBottom: 10,
        alignSelf: 'flex-start', // Sol hizalama
        marginLeft: 15, // Sağ taraftan boşluk ekledim
    },
});

export default Login;
