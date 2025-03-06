import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Root, Popup, Toast } from 'popup-ui';

const Register = () => {
    const [isSecure, setIsSecure] = useState(true);
    const [isConfirmSecure, setIsConfirmSecure] = useState(true);

    const navigation = useNavigation();

    const togglePasswordVisibility = () => {
        setIsSecure(!isSecure);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmSecure(!isConfirmSecure);
    };

    const handleRegister = async (values) => {
        try {
            // API isteği
            const response = await axios.post('http://10.0.2.2:5000/api/auth/register', {
                username: values.username,
                email: values.email,
                password: values.password,
            });

            // API yanıtında status code kontrolü ve response data kontrolü
            if (response.status === 201) {
                // Başarılı kayıt durumu
                Popup.show({
                    type: 'Success',
                    title: 'Kayıt Başarılı',
                    textBody: 'Kayıt işleminiz başarılı!',
                    buttonText: 'Tamam',
                    callback: () => {
                        Popup.hide();
                        navigation.navigate('Login');
                    }
                });
            } else if (response.data && response.data.error) {
                // Eğer API'den gelen response içinde error varsa
                Toast.show({
                    title: 'Kayıt Hatası',
                    color: '#c1121f',
                    text: response.data.error, // API'den dönen hata mesajını burada kullanıyoruz
                    timing: 4000,
                });
            } else {
                // Başka bir hata durumu
                Toast.show({
                    title: 'Kayıt Hatası',
                    color: '#d62828',
                    text: 'Kayıt işlemi başarısız. Lütfen tekrar deneyin.',
                    timing: 3000,
                });
            }
        } catch (error) {
            // API isteği sırasında hata olursa
            console.log('Kayıt hatası:', error);
            Toast.show({
                title: 'Kayıt Hatası',
                color: '#d62828',
                text: 'Bu kullanıcı adı veya eposta kullanılıyor.',
                timing: 3000,
            });
        }
    };


    const closePopup = () => {
        setShowPopup(false);
        if (popupType === 'success') {
            navigation.navigate('Login'); // Başarı durumunda login ekranına yönlendir
        }
    };


    return (
        <Root>
            <SafeAreaView style={styles.container}>
                <Formik
                    initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Kullanıcı adı gerekli').min(6, 'Kullanıcı adı 6 karakterden az olamaz'),
                        email: Yup.string().required('E-posta gerekli').email('Geçersiz e-posta adresi'),
                        password: Yup.string().required('Şifre gerekli').min(8, 'Şifre minimum 8 karakter olmalı').max(16, 'Şifre maksimum 16 karakter olmalı'),
                        confirmPassword: Yup.string()
                            .required('Şifre doğrulama gerekli')
                            .oneOf([Yup.ref('password'), null], 'Şifreler uyuşmuyor'),
                    })}
                    onSubmit={handleRegister}
                >
                    {({ values, touched, errors, handleChange, handleBlur, handleSubmit, isValid }) => (
                        <View style={styles.content}>
                            <Text style={styles.title}>Sons of Süleymaniye</Text>
                            <Text style={styles.miniTitle}>Üye Ol</Text>

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

                            {/* E-posta */}
                            <TextInput
                                style={styles.input}
                                placeholder="E-posta"
                                placeholderTextColor="#606C38"
                                keyboardType="email-address"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                            />
                            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

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
                                <Icon
                                    onPress={togglePasswordVisibility}
                                    size={24}
                                    color="#606C38"
                                    name={isSecure ? "eye-off" : "eye"}
                                    style={styles.icon}
                                />
                            </View>
                            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                            {/* Şifre Doğrulama */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Şifreyi Doğrula"
                                    placeholderTextColor="#606C38"
                                    secureTextEntry={isConfirmSecure}
                                    value={values.confirmPassword}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                />
                                <Icon
                                    onPress={toggleConfirmPasswordVisibility}
                                    size={24}
                                    color="#606C38"
                                    name={isConfirmSecure ? "eye-off" : "eye"}
                                    style={styles.icon}
                                />
                            </View>
                            {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

                            {/* Kayıt Ol Butonu */}
                            <TouchableOpacity
                                disabled={!isValid}
                                style={[styles.button, !isValid && styles.disabledButton]}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.buttonText}>Üye Ol</Text>
                            </TouchableOpacity>

                            {/* Zaten Hesabınız Var mı? Linki */}
                            <Text style={styles.footer}>
                                Zaten hesabınız var mı? <Text onPress={() => navigation.navigate("Login")} style={styles.register}>Giriş Yap</Text>
                            </Text>
                        </View>
                    )}
                </Formik>
            </SafeAreaView>
        </Root>
    );
};

const styles = StyleSheet.create({
    popupContainer: {
        position: 'absolute', // Ekranın üst kısmında, tüm ekranı kaplamalı
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Koyu arka plan
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // Popup'ı ön planda tutmak için yüksek zIndex
    },
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
    },
    miniTitle: {
        fontSize: 14,
        color: '#283618', // Alt başlık rengi
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#DDA15E', // Koyu altın sarısı
        borderWidth: 1,
        borderRadius: 5,
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
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 18,
        color: '#FEFAE0', // Buton metni rengi
        fontWeight: 'bold',
    },
    footer: {
        fontSize: 16,
        color: '#283618',
    },
    register: {
        color: '#DDA15E', // Giriş yap metni rengi
        fontWeight: 'bold',
    },
    error: {
        fontSize: 12,
        color: '#FF5252', // Hatalı giriş mesajı rengi
        marginBottom: 10,
        alignSelf: 'flex-start', // Sol hizalama
        marginLeft: 15, // Sağ taraftan boşluk ekledim
    },
    disabledButton: {
        backgroundColor: '#ccd5ae', // Disabled button color
    },
});

export default Register;
