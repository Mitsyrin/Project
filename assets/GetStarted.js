import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from './Comp/PageContainer'
import { COLORS, FONTS, SIZES, images } from '../constants'
import Button from './Comp/Button'

const GetStarted = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1}}>
        <PageContainer>
            <View
            style={{
                flex: 1,
                marginHorizontal:22,
                alignItems: 'center',
            }}>
                <Image
                source={images.logo}
                style={{
                    tintColor: COLORS.primary,
                    marginVertical: 80,
                    height: 250,
                    width: 250
                    
                    
                }}
                />
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Text style={{...FONTS.h1,color: COLORS.primary}}>Кулькулятор</Text>
                    <Text style={{...FONTS.h1,color: COLORS.primary,marginHorizontal:8}}>Мечты</Text>
                </View>
                <View style={{marginVertical:40}}>
                <Text style={{...FONTS.body3,textAlign:'center'}}>
                        Начни копить сейчас
                    </Text>
                </View>
                <Button
                    title="Авторизация"
                    onPress={() => navigation.navigate('Login')}
                    style={{
                        width: '100%',
                        marginBottom: SIZES.padding
                    }}
                    />
                    <Button
                    title="Регистрация"
                    onPress={() => navigation.navigate('Register')}
                    filled
                    style={{
                        width: '100%'
                    }}/>
                    

            </View>
        </PageContainer>

    </SafeAreaView>
  )
}

export default GetStarted