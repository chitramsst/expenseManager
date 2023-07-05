import React, { useState, useEffect } from 'react';

import { Text, StyleSheet, Button, View, StatusBar, ScrollView, ActivityIndicator, Image, ImageBackground, Pressable, SafeAreaView, TextInput, Alert } from 'react-native'
import GlobalStyles from '../../assets/globalstyles';
import { WHITE } from '../../assets/colors';
import DropDownIcon from '../../assets/Icons/DropDown'
import GermanyIcon from '../../assets/Icons/Germany'
import ChooseCountryModal from '../../components/Modals/ChooseCountryModal';
import { Country } from '../../data/countryList';
import CountryFlag from "react-native-country-flag";
import { useSelector, useDispatch } from 'react-redux';
import { setPhoneNumber } from '../../stores/slices/login/phoneNumberSlice';
interface Props {
  navigation: any
}

interface HomeState {
  count: number;
}

export default function LoginScreen({ navigation } : Props) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState({name: "India",code: "IN",phone: 91})
  const [inputPhone, setInputPhone] = useState('')

  const phoneNumber = useSelector((state) => state.phoneNumber.value);

  useEffect(() => {
  },[])

  function hideModal(country : Country) {
      setShowModal(false)
      setSelectedCountry(country)
  }

  function continueLogin()
  {
    if(inputPhone.trim().length < 5)
    {
      Alert.alert('Invalid Number','The phone number you entered is invalid.')
      return;
    }
    dispatch(setPhoneNumber('+'+selectedCountry.phone+inputPhone))
    navigation.navigate('OtpScreen')
  }
  return (
    <SafeAreaView style={GlobalStyles.mainScreenContainer}>
      <StatusBar backgroundColor={'rgba(49, 149, 247, 1)'} />
      <View className='h-screen w-screen bg-[#3195F7] pt-9'>
        <View className="h-full w-full bg-white rounded-t-[30px] p-4 ">
          <View className='flex flex-col pt-6'>
            <Text className='text-3xl text-[#1C2340] font-bold'>Welcome Back!</Text>
            <Text className='pt-1 text-[#9DB2CE] text-md'>Lets Login to continue exploring</Text>
          </View>
          <View className='pt-8'>
            <Text className='text-black'>Choose Country</Text>
            <Pressable className='flex flex-row items-center bg-[#F3F6FD] p-3 mt-2 rounded-2xl justify-between' onPress={() => {setShowModal(true)}} android_ripple={{ color: 'rgba(0, 0, 0, 0.05)' }} >
              <View className='flex flex-row items-center'>
                <CountryFlag isoCode={selectedCountry.code}  size={20}/>
                <Text className='text-black pl-3'>{selectedCountry.name}</Text>
              </View>
              <DropDownIcon />
            </Pressable>
          </View>

          <View className='pt-8'>
            <Text className='text-black'>Phone Number</Text>
            <View className='flex flex-row items-center bg-[#F3F6FD] p-3 py-1  mt-2 rounded-2xl'>
              <View className='flex flex-row items-center border-r pr-2 border-[#CED8E7]'>
                <Text className='text-black pl-3'>+{selectedCountry.phone}</Text>
              </View>
              <TextInput textContentType='telephoneNumber' keyboardType='phone-pad' placeholder='Enter Your Phone Number' onChangeText={(text) => {setInputPhone(text)}} className='pl-2 w-full text-sm text-black' placeholderTextColor={'#9DB2CE'}/>
            </View>
          </View>
          <Pressable className='mt-8 flex justify-center w-full flex-row' onPress={() => {continueLogin()}}>
            <View className='bg-[#3195F7] py-4 w-[78%] rounded-3xl'><Text className='text-white text-center font-semibold'>Continue</Text></View>
          </Pressable>

          <View className='absolute bottom-10  px-4'>
            <Text className='text-[#9DB2CE] text-[10px] w-[66%]'>By continuing, you agree to watch now <Text className='text-[#3195F7]'>Terms of Service, Privacy policy</Text></Text>
          </View>
        </View>
        <View>
          <ChooseCountryModal show={showModal} hideModal={hideModal}/>
        </View>
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