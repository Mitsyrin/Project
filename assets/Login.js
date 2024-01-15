import { View, Text, Image,StyleSheet,TextInput,Screen } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from './Comp/PageContainer'
import { COLORS, images, FONTS, SIZES } from '../constants'
import Button from './Comp/Button'
import { TouchableOpacity } from 'react-native'
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth,database} from '../firebase'
import { update, ref } from 'firebase/database'
import { AntDesign,} from '@expo/vector-icons';


const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('BottomTabNavigation');
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        alert('Неправильная почта или пароль');
      } else {
        alert('Произошла ошибка при входе в систему');
      }
    }
  };

    
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <PageContainer>
                <View style={{ flex: 1, marginHorizontal: 22, alignItems: 'center' }}>
                    <Image
                        source={images.logo}
                        resizeMode='contain'
                        style={{
                            tintColor: COLORS.primary,
                            marginVertical: 48,
                            height: 250,
                            width: 250
                        }}
                    />
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ ...FONTS.h1, color: COLORS.primary }}>Кулькулятор</Text>
                        <Text style={{ ...FONTS.h1, color: COLORS.primary, marginHorizontal: 8 }}>Мечты</Text>
                    </View>

                    <View style={{ marginVertical: 20 }}>
                        <View style={styles.container}>
                        <View style={styles.inputContainer}>
        <AntDesign name="mail" size={24} color={COLORS.primary} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Введите вашу почту"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
        />
      </View>
                        </View>
                        <View style={styles.inputContainer}>
        <AntDesign name="key" size={24} color={COLORS.primary} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Введите пароль"
          secureTextEntry={hidePassword}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <AntDesign name={hidePassword ? 'eyeo' : 'eye'} size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
                    </View>
                    <Button
                        title="Авторизоваться"
                        style={{ width: "100%" }}
                        onPress={signIn}
                    />

                    <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                        <Text style={{ ...FONTS.body3, color: COLORS.primary, marginVertical: 12 }}>Забыли пароль?</Text>
                    </TouchableOpacity>
                    <View style={{ marginVertical: 20, flexDirection: "row" }}>
                        <Text style={{ ...FONTS.body3, color: COLORS.black }}>У вас нет аккаунта?{" "}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={{ ...FONTS.body3, color: COLORS.primary }}>Регистрация</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}
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
})

export default Login