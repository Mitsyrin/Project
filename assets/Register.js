import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants';
import Button from './Comp/Button';
import { images } from '../constants';
import PageContainer from './Comp/PageContainer';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../firebase';
import { set, ref } from 'firebase/database';
import { AntDesign } from '@expo/vector-icons';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userlastname, setUserlastname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [grade, setgrade] = useState("");

  const [nameError, setNameError] = useState("");
  const [gradeError, setgradeError] = useState("");
  const [lastnameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Zа-яА-Я]+$/;
    if (!name) {
      setNameError("Имя обязательно");
    } else if(!nameRegex.test(name)) {
      setNameError("Имя должно быть из букв");
    } else {
      setNameError("");
    }
  };
  
  const validateLastName = (lastname) => {
    const lastnameRegex = /^[a-zA-Zа-яА-Я]+$/;
    if (!lastname) {
      setLastNameError("Фамилия обязательна");
    } else if(!lastnameRegex.test(lastname)) {
      setLastNameError("Фамилия должна быть из букв");
    } else {
      setLastNameError("");
    }
  };
  const validategrade = (grade) => {
    if (!grade) {
      setgradeError("Введите свой класс");
    } else if(grade.length>3) {
      setgradeError("Класс должен состоять не более чем из трех символов");
    } else {
      setgradeError("");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Почта обязательна");
    } else if (!emailRegex.test(email)) {
      setEmailError("Неверный формат почты");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Пароль обязателен");
    } else if (password.length < 6) {
      setPasswordError("Пароль должен содержать не менее 6 символов");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) {
      setConfirmPasswordError("Подтвердите пароль");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Пароли не совпадают");
    } else {
      setConfirmPasswordError("");
    }
  };

  const signUp = async () => {
    try {
      if (nameError || emailError || passwordError || confirmPasswordError || lastnameError || gradeError) {
        alert("Пожалуйста, исправьте ошибки в форме.");
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          set(ref(database, 'users/' + user.uid), {
            username: username,
            userlastname: userlastname,
            email: email,
            password: password,
            grade: grade,
          });

          alert('Пользователь зарегистрирован!');
        });

      navigation.navigate('BottomTabNavigation');
    } catch  {
      alert("Пользователь с такой почтой уже зарегистрирован.");
      
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <ScrollView>
          <View
            style={{
              flex: 1,
              marginHorizontal: 22,
              alignItems: 'center',
            }}
          >
            <Image
              source={images.logo}
              resizeMode="contain"
              style={{
                tintColor: COLORS.primary,
                marginVertical: 48,
                height: 250,
                width: 250,
              }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ ...FONTS.h1, color: COLORS.primary }}>
                Кулькулятор
              </Text>
              <Text
                style={{
                  ...FONTS.h1,
                  color: COLORS.primary,
                  marginHorizontal: 8,
                }}
              >
                Мечты
              </Text>
            </View>

            <View style={{ marginVertical: 20 }}>
              <View style={styles.container}>
                <View style={styles.inputContainer}>
                  <View style={styles.icon}><AntDesign name="user" size={24} color={COLORS.primary} /></View>
                  <TextInput
                    style={styles.input}
                    placeholder='Введите Имя'
                    id='name'
                    name='name'
                    onChangeText={(text) => setUsername(text)}
                    onBlur={() => validateName(username)}
                  />
                </View>
                {nameError ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{nameError}</Text>
                  </View>
                ) : null}
              </View>
              <View style={styles.container}>
                <View style={styles.inputContainer}>
                  <View style={styles.icon}><AntDesign name="user" size={24} color={COLORS.primary} /></View>
                  <TextInput
                    style={styles.input}
                    placeholder='Введите Фамилию'
                    id='lastname'
                    name='lastname'
                    onChangeText={(text) => setUserlastname(text)}
                    onBlur={() => validateLastName(userlastname)}
                  />
                </View>
                {lastnameError ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{lastnameError}</Text>
                  </View>
                ) : null}
              </View>
              <View style={styles.container}>
                <View style={styles.inputContainer}>
                  <View style={styles.icon}><AntDesign name="user" size={24} color={COLORS.primary} /></View>
                  <TextInput
                    style={styles.input}
                    placeholder='Введите свой класс'
                    id='grade'
                    name='grade'
                    onChangeText={(text) => setgrade(text)}
                    onBlur={() => validategrade(grade)}
                  />
                </View>
                {gradeError ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{gradeError}</Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.container}>
                <View style={styles.inputContainer}>
                  <View style={styles.icon}><AntDesign name="mail" size={24} color={COLORS.primary} /></View>
                  <TextInput
                    style={styles.input}
                    id='email'
                    name='email'
                    placeholder='Введите вашу почту'
                    keyboardType="email-address"
                    onChangeText={(text) => setEmail(text)}
                    onBlur={() => validateEmail(email)}
                  />
                </View>
                {emailError ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{emailError}</Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.container}>
                <View style={styles.inputContainer}>
                  <View style={styles.icon}><AntDesign name="key" size={24} color={COLORS.primary} /></View>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Введите пароль"
                    id='password'
                    name='password'
                    secureTextEntry={!showPassword}
                    onChangeText={(text) => setPassword(text)}
                    onBlur={() => validatePassword(password)}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <AntDesign name={showPassword ? "eyeo" : "eye"} size={24} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
                {passwordError ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{passwordError}</Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.container}>
                <View style={styles.inputContainer}>
                  <View style={styles.icon}><AntDesign name="key" size={24} color={COLORS.primary} /></View>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Введите повторно пароль"
                    secureTextEntry={!showPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    onBlur={() => validateConfirmPassword(confirmPassword)}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <AntDesign name={showPassword ? "eyeo" : "eye"} size={24} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
                {confirmPasswordError ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{confirmPasswordError}</Text>
                  </View>
                ) : null}
              </View>
            </View>
            <Button
              title="Зарегистрироваться"
              filled
              style={{ width: '100%' }}
              onPress={signUp}
            />
            <View
              style={{
                marginVertical: 20,
                flexDirection: 'row',
              }}
            >
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.black,
                }}
              >
                У меня есть аккаунт{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
              >
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.primary,
                  }}
                >
                  Авторизоваться
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: COLORS.gray,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    borderRadius: 12,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    color: COLORS.primary,
  },
  input: {
    color: COLORS.primary,
    flex: 1,
    fontFamily: 'regular',
    paddingTop: 0,
  },
  errorContainer: {
    marginVertical: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default Register;