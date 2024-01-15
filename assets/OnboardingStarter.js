import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';




const Dots = ({ selected}) =>{
    let backgroundColor;
    backgroundColor = selected ? "#ff2156":"#808080"
    return(
        <View
        style={{
            height: 5,
            width: 5,
            marginHorizontal: 3,
            backgroundColor
        }}
        
        />
    )
}

const Done = ({...props}) =>(
    <TouchableOpacity
    style={{
        marginRight: 12
    }}
    {...props}
    >
        <Text style={{color: "#008000"}}>Далее</Text>
    </TouchableOpacity>

);
const OnboardingStarter = ({navigation}) => {
  return (
    <Onboarding
    onSkip={()=> navigation.navigate('GetStarted')}
    onDone={()=> navigation.navigate('GetStarted')}
    DotComponent={Dots}
    bottomBarColor='#ffffff'
    DoneButtonComponent={Done}
  pages={[
    {
      backgroundColor: '#fff',
      image: <Image source={require('../Components/image/Onboarding_4.png')} style={{
        height: 300,
        width: 300
    }}/>,
      title: 'Сбережения',
      subtitle: 'Поможем вам накопить',
    },
    {
        backgroundColor: '#fff',
        image: <Image source={require('../Components/image/onboarding_1.png')} style={{
            height: 400,
            width: 400
        }}/>,
        title: 'Математика',
        subtitle: 'Поможем вам расчитать',
      },
      {
        backgroundColor: '#fff',
        image: <Image source={require('../Components/image/onboarding_2.png')} 
        style={{
            height: 400,
            width: 400
        }}/>,
        title: 'Цель',
        subtitle: 'Поможем вам достичь вашей мечты',
      }

  ]}
/>
  )
}

export default OnboardingStarter