import React, { useState, useEffect } from 'react';

import { Text, StyleSheet, Button, View, StatusBar, ScrollView, ActivityIndicator, Image, ImageBackground, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../assets/globalstyles';
import { TextInput } from 'react-native-gesture-handler';
import NotificationIcon from '../assets/Icons/NotificationIcon';
import { ArrowDownLeftIcon, PlusIcon, ArrowUpRightIcon, EllipsisHorizontalIcon } from 'react-native-heroicons/solid'
import { WHITE } from '../assets/colors';
import { useSelector } from 'react-redux';

interface HomeScreenProps {
  navigation: any
}

interface HomeState {
  count: number;
}

export default function HomeScreen({navigation}) {
  const store = useSelector((state: any) => state.store);
  return (
    <SafeAreaView style={GlobalStyles.mainScreenContainer}>
      <View className='px-4 ' style={styles.container} >
        <View className='flex justify-between w-100 flex-row p-3 px-0'>
          <View className='flex flex-row gap-2 items-center'>
            <Pressable className='w-12 h-12 rounded-full bg-[#C4F439] flex justify-center items-center' onPress={() => {navigation.navigate('ItemStack', {screen : 'Profile'})}}>
              <Image source={require('../assets/images/Profile/profile_icon.png')} />
            </Pressable>
            <View className='flex flex-col gap-1'>
              <Text className='text-black text-xs'>Hello👋 </Text>
              <Text className='font-bold text-black text-md'>{store.userInfo?.name}</Text>
            </View>
          </View>
          <View className='flex flex-col justify-center relative '>
            <View className='absolute h-4 w-4 bg-red-500 top-2 -right-1 rounded-full z-10 flex justify-center items-center'>
              <Text className='text-white text-xs '>1</Text>
            </View>
            <NotificationIcon />
          </View>
        </View>
        <ImageBackground source={require('../assets/images/Backgrounds/home_card_bg.png')} className='w-100 z-10  mt-3 bg-[#3195F7] rounded-xl '>
          <View className='flex flex-col gap-3 p-5 '>
            <Text className='text-white'>Total Balance</Text>
            <Text className='text-white text-3xl font-semibold'>$28,865.<Text className='text-white/40'>00</Text></Text>
            <View className='flex justify-between pt-2 flex-row'>
              <View className='h-16 w-16 bg-white flex justify-center items-center rounded-2xl'><PlusIcon color={'rgb(0 0 0)'} /></View>
              <Pressable onPress={() => {navigation.navigate('ItemStack', {screen : 'Income'})}} className='h-16 w-16 bg-white flex justify-center items-center rounded-2xl'><ArrowDownLeftIcon color={'rgb(0 0 0)'} /></Pressable>
              <Pressable onPress={() => {navigation.navigate('ItemStack', {screen : 'Expense'})}}  className='h-16 w-16 bg-white flex justify-center items-center rounded-2xl'><ArrowUpRightIcon color={'rgb(0 0 0)'} /></Pressable>
              <View className='h-16 w-16 bg-white flex justify-center items-center rounded-2xl'><EllipsisHorizontalIcon color={'rgb(0 0 0)'} /></View>
            </View>
          </View>
        </ImageBackground>

        <View className='mt-3'>
          <Text className='font-bold text-black text-xl'>Outcome Statistics</Text>
        </View>
        <View>
          <ScrollView className='py-4 gap-2  ' horizontal={true}>
            <View className='p-2 bg-[#F3F6FD] w-fit flex flex-row  px-3 rounded-lg items-center'>
              <View className='bg-[#5EACF9] rounded-lg h-5 w-5 mr-2'></View>
              <Text className='font-bold text-black'>Health <Text className='text-gray-400'>20%</Text></Text>
            </View>

            <View className='p-2 bg-[#F3F6FD] w-fit flex flex-row  px-3 rounded-lg items-center'>
              <View className='bg-[#A3E1CB] rounded-lg h-5 w-5 mr-2'></View>
              <Text className='font-bold text-black'>Grocery <Text className='text-gray-400'>20%</Text></Text>
            </View>

            <View className='p-2 bg-[#F3F6FD] w-fit flex flex-row  px-3 rounded-lg items-center'>
              <View className='bg-[#FE94B3] rounded-lg h-5 w-5 mr-2'></View>
              <Text className='font-bold text-black'>Fuel <Text className='text-gray-400'>20%</Text></Text>
            </View>

            <View className='p-2 bg-[#F3F6FD] w-fit flex flex-row  px-3 rounded-lg items-center'>
              <View className='bg-[#5EACF9] rounded-lg h-5 w-5 mr-2'></View>
              <Text className='font-bold text-black'>Health <Text className='text-gray-400'>20%</Text></Text>
            </View>

            <View className='p-2 bg-[#F3F6FD] w-fit flex flex-row  px-3 rounded-lg items-center'>
              <View className='bg-[#5EACF9] rounded-lg h-5 w-5 mr-2'></View>
              <Text className='font-bold text-black'>Health <Text className='text-gray-400'>20%</Text></Text>
            </View>
          </ScrollView>
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