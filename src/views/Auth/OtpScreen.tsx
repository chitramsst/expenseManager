import React, { useState, useEffect } from 'react';

import { Text, StyleSheet, Button, View, StatusBar, ScrollView, ActivityIndicator, Image, ImageBackground, Pressable, SafeAreaView, TextInput } from 'react-native'
import GlobalStyles from '../../assets/globalstyles';
import { WHITE } from '../../assets/colors';
import DropDownIcon from '../../assets/Icons/DropDown'
import GermanyIcon from '../../assets/Icons/Germany'
import BackButtonIcon from '../../assets/Icons/BackButton'
interface HomeScreenProps {
  navigation: any
}

interface HomeState {
  count: number;
}

export default function OptScreen({ navigation }) {
  return (
    <SafeAreaView style={GlobalStyles.mainScreenContainer}>
      <StatusBar backgroundColor={'rgba(49, 149, 247, 1)'} />
      <View className='h-screen w-screen bg-[#3195F7] pt-9'>
        <View className="h-full w-full bg-white rounded-t-[30px] p-4 ">
          <View className='my-4 pt-3'>
          <Pressable onPress={() => {navigation.navigate('Login')}}>
                            <BackButtonIcon />
                        </Pressable>
          </View>
          <View className='flex flex-col pt-6'>
            <Text className='text-3xl text-[#1C2340] font-bold'>Verify</Text>
            <Text className='pt-1 text-[#9DB2CE] text-md w-[66%]'>Please enter the 4-digit code sent to you at <Text className='text-[#3195F7]'>+122 8976 34570</Text>  </Text>
          </View>
          <View className='pt-16 flex flex-row gap-3 justify-center'>
            <TextInput className='p-4 rounded-2xl bg-[#F3F6FD] text-center text-3xl h-[63px] w-[63px]' value='3'></TextInput>
            <TextInput className='p-4 rounded-2xl bg-[#F3F6FD] text-center text-3xl h-[63px] w-[63px]' value='6'></TextInput>
            <TextInput className='p-4 rounded-2xl bg-[#F3F6FD] text-center text-3xl h-[63px] w-[63px]' value='5'></TextInput>
            <TextInput className='p-4 rounded-2xl bg-[#F3F6FD] text-center text-3xl h-[63px] w-[63px]' value='2'></TextInput>
          </View>

          <View className='pt-8'>
          <Text className='text-[#9DB2CE] text-center '>Didn't get the code? <Text className='text-[#3195F7]'>Resend</Text></Text>
           
          </View>
          <Pressable className='pt-8 flex justify-center w-full flex-row' onPress={() => {navigation.navigate('Register')}}>
            <View className='bg-[#3195F7] py-4 w-[78%] rounded-3xl'><Text className='text-white text-center font-semibold'>Verify</Text></View>
          </Pressable>
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