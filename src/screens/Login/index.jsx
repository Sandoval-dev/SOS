import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Root, Popup, Toast } from 'popup-ui';

const Login = () => {
    const [isSecure, setIsSecure] = useState(true);
    const [loading, setLoading] = useState(true);  // Sayfa açıldığında kontrol için
    const navigation = useNavigation();

    useEffect(() => {
        // Kullanıcının daha önce giriş yapıp yapmadığını kontrol et
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (token) {
                    // Token varsa direkt Loading sayfasına yönlendir
                    navigation.replace('Loading');
                }
            } catch (error) {
                console.log('Token kontrol hatası:', error);
            } finally {
                setLoading(false); // Kontrol tamamlandı
            }
        };

        checkLoginStatus();
    }, []);

    const togglePasswordVisibility = () => {
        setIsSecure(!isSecure);
    };

    const handleLogin = async (values) => {
        try {
            Toast.show({
                title: 'Lütfen Bekleyin...',
                color: '#dda15e',
                timing: 2000,
            });

            setTimeout(async () => {
                try {
                    const response = await axios.post('http://10.0.2.2:5000/api/auth/login', {
                        username: values.username,
                        password: values.password,
                    });

                    if (response.status === 200 && response.data.token) {
                        // Token'ı AsyncStorage'e kaydet
                        await AsyncStorage.setItem('userToken', response.data.token);
                        console.log('Token Kaydedildi:', response.data.token);  // Debugging için ekleyin

                        Toast.show({
                            title: 'Giriş Başarılı',
                            color: '#4f772d',
                            timing: 2000,
                        });

                        setTimeout(() => {
                            navigation.replace('Loading'); // Ana sayfaya yönlendir
                        }, 2000);
                    } else {
                        Toast.show({
                            title: 'Giriş Başarısız',
                            text: 'Kullanıcı adı veya şifre hatalı',
                            color: '#d62828',
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
            }, 2500);
        } catch (error) {
            Toast.show({
                title: 'Giriş Başarısız',
                text: 'Bir hata oluştu. Lütfen tekrar deneyin.',
                color: '#d62828',
                timing: 3000,
            });
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#BC6C25" />
            </SafeAreaView>
        );
    }

    return (
        <Root>
            <SafeAreaView style={styles.container}>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Kullanıcı adı gerekli').min(6, 'Kullanıcı adı 6 karakterden az olamaz'),
                        password: Yup.string().required('Şifre gerekli').min(8, 'Şifre minimum 8 karakter olmalı').max(16, 'Şifre maksimum 16 karakter olmalı'),
                    })}
                    onSubmit={handleLogin}
                >
                    {({ values, touched, errors, handleChange, handleBlur, handleSubmit, isValid }) => (
                        <View style={styles.content}>
                            <Text style={styles.title}>Sons of Süleymaniye</Text>
                            <Text style={styles.miniTitle}>Giriş Yap</Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Kullanıcı Adı"
                                placeholderTextColor="#606C38"
                                value={values.username}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                            />
                            {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}

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

                            <TouchableOpacity
                                style={[styles.button, !isValid && styles.disabledButton]}
                                onPress={handleSubmit}
                                disabled={!isValid}
                            >
                                <Text style={styles.buttonText}>Giriş Yap</Text>
                            </TouchableOpacity>

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
        backgroundColor: '#FEFAE0',
        justifyContent: 'center',
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEFAE0',
    },
    content: {
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#283618',
        marginBottom: 10,
        textAlign: 'center',
    },
    miniTitle: {
        fontSize: 16,
        color: '#283618',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#DDA15E',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        color: '#283618',
        backgroundColor: '#FEFAE0',
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
        backgroundColor: '#BC6C25',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 20,
    },
    disabledButton: {
        backgroundColor: '#ccd5ae',
    },
    buttonText: {
        fontSize: 18,
        color: '#FEFAE0',
        fontWeight: 'bold',
    },
    footer: {
        fontSize: 16,
        color: '#283618',
        textAlign: 'center',
    },
    register: {
        color: '#DDA15E',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    error: {
        fontSize: 12,
        color: '#FF5252',
        marginBottom: 10,
        alignSelf: 'flex-start',
        marginLeft: 15,
    },
});

export default Login;
