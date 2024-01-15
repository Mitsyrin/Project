import { View, Text,Image,StyleSheet,TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from './Comp/PageContainer'
import { COLORS,SIZES,images,FONTS } from '../constants'
import Button from './Comp/Button'
import { TouchableOpacity } from 'react-native'
import { auth, database } from '../firebase'
import { sendPasswordResetEmail } from 'firebase/auth';
import { getDatabase, ref, update } from 'firebase/database';



const ResetPassword = ({navigation}) => {
  const [email, sendEmail] = useState([]);
  const triggerResetEmail = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Отправлено электронное письмо для сброса пароля ");

      // Обновить пароль в Firebase Realtime Database
      const userId = auth.currentUser.uid;
      const db = getDatabase();
      const userRef = ref(db, `users/${userId}`);
      const updates = {
        password: newPassword
      };
      await update(userRef, updates);

      console.log("Пароль успешно обновлен в Realtime Database");
    } catch (error) {
      console.log("Ошибка при сбросе пароля:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex:1}}>
      <PageContainer>
        <View style={{
          flex:1,
          marginHorizontal:22,
          alignItems: 'center'
        }}>
          <Image
                source={images.logo}
                resizeMode='contain'
                style={{
                    tintColor:COLORS.primary,
                    marginVertical:48,
                    height: 250,
                    width: 250

                }}/>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Text style={{...FONTS.h1,color: COLORS.primary}}>Кулькулятор</Text>
                    <Text style={{...FONTS.h1,color: COLORS.primary,marginHorizontal:8}}>Мечты</Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Text style={{...FONTS.h2,color: COLORS.primary}}>Сброс</Text>
                    <Text style={{...FONTS.h2,color: COLORS.primary,marginHorizontal:8}}>пароля</Text>
                </View>
                <View style={
                  styles.Containerinput
                  
                }>
                  <TextInput
                  style={styles.input}
                  placeholder="Ввод"
                  onChangeText={sendEmail}
                  />

                </View>
                <Text style={{
                  ...FONTS.body3,
                  textAlign: "center",
                  marginVertical:14

                }}>Ваш пароль будет отправлен на почту</Text>
                <Button
                title="Отправить"
                filled
                onPress={triggerResetEmail}
                style={{width:"100%"}}
                />
                <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                  <Text
                  style={{
                    ...FONTS.body3,
                    color:COLORS.primary,
                    marginVertical:12

                  }}>Я помню пароль</Text>

                </TouchableOpacity>
        </View>

      </PageContainer>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'row'
  },
  input: {
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
  list: {
    flex: 1,
    marginTop: 10,
  },
  Containerinput: {
    width: '100%',
    backgroundColor: COLORS.gray,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    marginVertical: 5,
    flexDirection: 'row',
  },
  noteText: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default ResetPassword