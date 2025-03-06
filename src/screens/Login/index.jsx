import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import axios from 'axios';
import { Root, Popup, Toast } from 'popup-ui';

const Login = () => {
    const [isSecure, setIsSecure] = useState(true);

    const navigation = useNavigation();
    const togglePasswordVisibility = () => {
        setIsSecure(!isSecure);
    };

    const handleLogin = async (values) => {
        try {
            // Show toast before attempting login
            Toast.show({
                title: 'Lütfen Bekleyin...',
                color: '#dda15e', // Toast color while waiting
                timing: 2000,
            });

            // Wait for a few seconds before making the request (simulating processing)
            setTimeout(async () => {
                try {
                    const response = await axios.post('http://10.0.2.2:5000/api/auth/login', {
                        username: values.username,
                        password: values.password,
                    });

                    if (response.status === 200 && response.data.token) {
                        // Giriş başarılıysa, token'ı sakla (AsyncStorage veya başka bir çözüm)
                        // await AsyncStorage.setItem('userToken', response.data.token);
                        Toast.show({
                            title: 'Giriş Başarılı',
                            color: '#4f772d', // Success color
                            timing: 2000,
                        });
                        // Ana ekrana yönlendirme
                        setTimeout(() => {
                            navigation.navigate('Loading');
                        }, 3000);
                    } else {
                        Toast.show({
                            title: 'Giriş Başarısız',
                            text: 'Kullanıcı adı veya şifre hatalı',
                            color: '#d62828', // Error color
                            timing: 3000,
                        });
                    }
                } catch (error) {
                    Toast.show({
                        title: 'Giriş Başarısız',
                        text: 'Kullanıcı adı veya şifre hatalı.',
                        color: '#d62828',
                        timing: 3000,
                    });
                }
            }, 2500); // Simulate waiting for 3 seconds
        } catch (error) {
            Toast.show({
                title: 'Giriş Başarısız',
                text: 'Bir hata oluştu. Lütfen tekrar deneyin.',
                color: '#d62828',
                timing: 3000,
            });
        }
    };

    return (
        <Root>
            <SafeAreaView style={styles.container}>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Kullanıcı adı gerekli').min(6, 'Kullanıcı adı 6 karakterden az olamaz'),
                        password: Yup.string().required('Şifre gerekli').min(8, 'Şifre minimum 8 karakter olmalı').max(16, 'Şifre maksimum 16 karakter olmalı'),
                    })}
                    onSubmit={handleLogin}  // HandleLogin fonksiyonunu Formik'e bağladık
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
        </Root>
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
