import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES, FONTS } from '../constants'
import { StyleSheet } from 'react-native'
import Button from './Comp/Button'
import { signOut } from 'firebase/auth';
import { auth, database, } from '../firebase'
import {  ref, onValue } from 'firebase/database'

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const fetchUserData = () => {
    const userId = auth.currentUser.uid; // Получение ID текущего пользователя
    const userRef = ref(database, `users/${userId}`);
  
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);



  const logout = async () => {
    try {
      await signOut(auth)
      navigation.navigate('GetStarted')
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ ...FONTS.h1, color: COLORS.primary, marginTop: 20 }}>Профиль</Text>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ ...FONTS.h2, color: COLORS.primary, marginTop: 20 }}>Данные пользователя</Text>
      </View>

      <View style={styles.TextContainer}>
        <Text style={{ ...FONTS.h4, color: COLORS.primary, marginTop: 20 }}>Имя:{userData?.username} </Text>
      </View>
      <View style={styles.TextContainer}>
        <Text style={{ ...FONTS.h4, color: COLORS.primary, marginTop: 20 }}>Фамилия:{userData?.userlastname} </Text>
      </View>
      <View style={styles.TextContainer}>
        <Text style={{ ...FONTS.h4, color: COLORS.primary, marginTop: 20 }}>Класс:{userData?.grade} </Text>
      </View>
      <View style={styles.TextContainer}>
        <Text style={{ ...FONTS.h4, color: COLORS.primary, marginTop: 20 }}>Почта:{userData?.email} </Text>
      </View>
      
      <Button title="Изменить данные пользователя" onPress={() => navigation.navigate('UpdateProfile')} style={{ marginTop: 20}} />

<Button title="Выйти" onPress={logout}  style={{ marginTop: 20}} filled/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.primary,
    marginTop: 20,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutButtonText: {
    ...FONTS.body2,
    color: COLORS.white,
  },
  ButtonText: {
    ...FONTS.body2,
    color: COLORS.white,
  },
  TextContainer: {
    width: '100%',
    backgroundColor: COLORS.gray,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    borderRadius: 12,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginVertical: 5,
    flexDirection: 'row',
  },
});

export default Profile;