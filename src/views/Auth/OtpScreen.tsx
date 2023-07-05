import React, { useState, useEffect } from 'react';

import { Text, StyleSheet, Button, View, StatusBar, ScrollView, ActivityIndicator, Image, ImageBackground, Pressable, SafeAreaView, TextInput, Alert } from 'react-native'
import GlobalStyles from '../../assets/globalstyles';
import { WHITE } from '../../assets/colors';
import DropDownIcon from '../../assets/Icons/DropDown'
import GermanyIcon from '../../assets/Icons/Germany'
import BackButtonIcon from '../../assets/Icons/BackButton'
import OtpInput from '../../components/Inputs/OtpInput';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import LoaderModal from '../../components/Modals/Common/LoaderModal';
import { setUserObject } from '../../stores/slices/authSlice';
interface Props {
  navigation: any
}

interface HomeState {
  count: number;
}


function sendOtp() {
  axios.post('/create-otp', { phone: '+919074965946' }).then((response) => {
    if (response.data.success == false) {
      Alert.alert('Failed to send OTP!', 'We had some difficulties while trying to send you an OTP. Please Try Again')
    }

  }).catch((e) => {
    console.log(e.toJSON())
  })
}

export default function OptScreen({ navigation }: Props) {

  const [showLoader, setShowLoader] = useState(false)
  const [count, setCount] = useState(10)
  const [otp, setOtp] = useState('')
  const dispatch = useDispatch();

  let timeInterval: any = null;
  const phoneNumber: string = useSelector((state) => state.phoneNumber.value);

  //mount
  useEffect(() => {
    if (phoneNumber.trim() == '') {
      navigation.navigate('Login')
      return;
    }
    sendOtp()
  }, [])

  //unmount
  useEffect(() => {
    return () => {
      clearInterval(timeInterval)
    }
  }, [])


  function sendOtp() {
    setCount(30)
    timeInterval = setInterval(handleTimeInterval, 1000)
    axios.post('/create-otp', { phone: phoneNumber }).then((response) => {
      if (response.data.success == false) {
        Alert.alert('Failed to send OTP!', 'We had some difficulties while trying to send you an OTP. Please Try Again')
      }

    }).catch((e) => {
      console.log(e.toJSON())
    })
  }

  function otpChanged(code: string,index : number) {
    setOtp(code)
    if(code.trim().length == 4 && index == 3)
    {
      checkOtp(code)
    }
  }

  function checkOtp(code : null | string = null)
  {
    setShowLoader(true)
    if(code == null)
    {
      code = otp;
    }
    axios.post('/check-otp', { phone: phoneNumber, code : code }).then((response) => {
      if (response.data.success == false) {
        setShowLoader(false)
        Alert.alert('Invalid OTP!', 'The OTP you entered is invalid please try again')
        return;
      }
      else{
        if(response.data.user)
        {
          setShowLoader(true)
          dispatch(setUserObject(response.data.user))
          navigation.popToTop();
          return;
        }
        setShowLoader(false)
        navigation.popToTop();
        navigation.navigate('Register')
      }

    }).catch((e) => {
      console.log(e.toJSON())
    })
  }

  function handleTimeInterval() {
    setCount((counter) => {
      if (counter <= 0) {
        clearInterval(timeInterval)
        console.log('clearing')
        setCount(0)
      }
      return counter - 1
    })
  }

  return (
    <SafeAreaView style={GlobalStyles.mainScreenContainer}>
      <StatusBar backgroundColor={'rgba(49, 149, 247, 1)'} />
      <View className='h-screen w-screen bg-[#3195F7] pt-9'>
        <View className="h-full w-full bg-white rounded-t-[30px] p-4 ">
          <View className='my-4 pt-3'>
            <Pressable onPress={() => { navigation.navigate('Login') }}>
              <BackButtonIcon />
            </Pressable>
          </View>
          <View className='flex flex-col pt-6'>
            <Text className='text-3xl text-[#1C2340] font-bold'>Verify</Text>
            <Text className='pt-1 text-[#9DB2CE] text-md w-[66%]'>Please enter the 4-digit code sent to you at <Text className='text-[#3195F7]'>{phoneNumber}</Text>  </Text>
          </View>
          <View className='pt-16 flex flex-row gap-3 justify-center'>
            <OtpInput otpCodeChanged={otpChanged} />
          </View>

          <View className='pt-8 flex flex-row justify-center'>
            <Text className='text-[#9DB2CE] text-center '>Didn't get the code? </Text>
            {
              count > 0 &&
              <View>
                <Pressable ><Text className={'text-[#9DB2CE]'}>Resend In {count} seconds</Text></Pressable>
              </View>
            }
            {
              count == 0 &&
              <Pressable onPress={sendOtp} ><Text className={'text-[#3195F7]'}>Resend</Text></Pressable>
            }
          </View>
          <Pressable className='mt-8 flex justify-center w-full flex-row' onPress={() => { checkOtp()}} disabled={otp.trim().length < 4}>
            <View className='bg-[#3195F7] py-4 w-[78%] rounded-3xl'><Text className='text-white text-center font-semibold'>Verify</Text></View>
          </Pressable>
        </View>
        <LoaderModal show={showLoader}/>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    backgroundColor: WHITE
  }
})