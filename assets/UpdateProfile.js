import { View, Text, TouchableOpacity, Image,TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES, FONTS } from '../constants'
import { StyleSheet } from 'react-native'
import Button from './Comp/Button'
import {  updateEmail, updatePassword} from 'firebase/auth';
import { auth, database } from '../firebase'
import {  ref,  update, } from 'firebase/database'

const UpdateProfile = ({navigation}) => {
    const updateAuthData = async (newEmail, newPassword) => {
        const user = auth.currentUser;
      
        try {
          if (newEmail !== '') {
            await updateEmail(user, newEmail);
          }
          if (newPassword !== '') {
            await updatePassword(user, newPassword);
          }
      
          alert('Данные успешно обновлены');
        } catch (error) {
          alert('Ошибка при обновлении данных ', error);
        }
      };


    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newlast, setNewLastname] = useState('');
    const [newgrade, setGrade] = useState('');
    const updateUserData = () => {
        const userId = auth.currentUser.uid; // Получение ID текущего пользователя
        const userRef = ref(database, `users/${userId}`);
      
        const updates = {};
        if (newUsername !== '') {
          updates['username'] = newUsername;
        }
        if (newEmail !== '') {
          updates['email'] = newEmail;
        }
        if (newPassword !== '') {
          updates['password'] = newPassword;
        }
        if (newlast !== '') {
          updates['userlastname'] = newlast;
        }
        if (newgrade !== '') {
          updates['grade'] = newgrade;
        }
      
        update(userRef, updates)
          .then(() => {
            // Обновление данных успешно
            updateAuthData(newEmail, newPassword);
            alert('Данные пользователя успешно обновлены');
            // Очистка полей ввода после обновления
            setNewUsername('');
            setNewEmail('');
            setNewPassword('');
            setNewLastname('');
            setGrade('');
          })
          .catch((error) => {
            // Ошибка при обновлении данных
            alert('Ошибка при обновлении данных пользователя', error);
          });
      };
  return (
    <View style={styles.container}>
      <Text style={{ ...FONTS.h1, color: COLORS.primary, marginTop: 20 }}>Профиль</Text>
      <View style={styles.TextContainer}>
  <Text style={{ ...FONTS.h4, color: COLORS.primary, marginTop: 20 }}>Имя: </Text>
  <TextInput
    style={styles.input}
    value={newUsername}
    onChangeText={(text) => setNewUsername(text)}
  />
</View>
<View style={styles.TextContainer}>
  <Text style={{ ...FONTS.h4, color: COLORS.primary, marginTop: 20 }}>Класс: </Text>
  <TextInput
    style={styles.input}
    value={newgrade}
    onChangeText={(text) => setGrade(text)}
  />
</View>
<View style={styles.TextContainer}>
  <Text style={{ ...FONTS.h4, color: COLORS.primary, marginTop: 20 }}>Фамилия: </Text>
  <TextInput
    style={styles.input}
    value={newlast}
    onChangeText={(text) => setNewLastname(text)}
  />
</View>
<View style={styles.TextContainer}>
  <Text style={{ ...FONTS.h4, color: COLORS.primary, marginTop: 20 }}>Почта: </Text>
  <TextInput
    style={styles.input}
    value={newEmail}
    onChangeText={(text) => setNewEmail(text)}
  />
</View>
<View style={styles.TextContainer}>
  <Text style={{ ...FONTS.h4, color: COLORS.primary, marginTop: 20 }}>Пароль: </Text>
  <TextInput
    style={styles.input}
    value={newPassword}
    onChangeText={(text) => setNewPassword(text)}
  />
</View>

<Button title="Сохранить" onPress={updateUserData} style={{ marginTop: 20}} />

<Button title="Вернуться обратно" onPress={() => navigation.navigate('Profile')}  style={{ marginTop: 20}} filled/>
    </View>
    

  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    input: {
      marginTop: 10,
      
      
    },
    title: {
      ...FONTS.h1,
      color: COLORS.primary,
      marginTop: 20,
    },
    Button: {
      marginTop: 20,
      backgroundColor: COLORS.primary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    ButtonText: {
      ...FONTS.body2,
      color: COLORS.white,
    },
    Buttonwhite: {
        marginTop: 20,
        backgroundColor: COLORS.white,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
      },
      ButtonTextprimary: {
        ...FONTS.body2,
        color: COLORS.primary,
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

export default UpdateProfile