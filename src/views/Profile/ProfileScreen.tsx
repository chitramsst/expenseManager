import React, { useState, useEffect } from 'react';

import { Text, StyleSheet, Button, View, StatusBar, ScrollView, ActivityIndicator, Image, ImageBackground, Dimensions, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../assets/globalstyles';
import { TextInput } from 'react-native-gesture-handler';
import NotificationIcon from '../../assets/Icons/NotificationIcon';
import { WHITE } from '../../assets/colors';
import { MagnifyingGlassIcon, PlusIcon, ChevronRightIcon } from 'react-native-heroicons/outline'
import { ChartPieIcon, TrophyIcon, DocumentIcon, ReceiptPercentIcon, UserIcon, BellIcon, Cog8ToothIcon , QuestionMarkCircleIcon, ArrowLeftOnRectangleIcon } from 'react-native-heroicons/solid'

interface ScreenProps {
  navigation: any
}

interface HomeState {
  count: number;
}


export default function ProfileScreen({ navigation }: ScreenProps) {
  return (
    <SafeAreaView style={GlobalStyles.mainScreenContainer}>
      <View className='' style={styles.container} >
        <ScrollView className='flex flex-col mt-3 h-full pb-20' contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 20 }}>
          <View className='py-4'>
            <View className='flex flex-row  items-center p-4 bg-[#F3F6FD] rounded-full'>
              <Pressable className='w-12 h-12 rounded-full bg-[#C4F439] flex justify-center items-center' onPress={() => { navigation.navigate('ItemStack', { screen: 'Profile' }) }}>
                <Image source={require('../../assets/images/Profile/profile_icon.png')} />
              </Pressable>
              <View className='flex flex-col justify-between ml-2'>
                <Text className='text-black text-md font-medium'>Moncy James </Text>
                <Text className=' text-black text-xs'>moncyjames778@gmail.com</Text>
              </View>
            </View>
          </View>

          <View className='py-2'>
            <View className='flex flex-col p-4 bg-[#F3F6FD] rounded-3xl mt-2'>
              <View className='flex flex-row justify-between'>
                <View className='flex flex-row items-center'>
                  <View className='bg-[#5EACF9] p-1 rounded-full'>
                    <ChartPieIcon color={'white'} size={20} />
                  </View>
                  <Text className='text-black ml-3 font-medium'>Account Overview</Text>
                </View>
                <ChevronRightIcon color={'#92a2c5'} size={20} />
              </View>
              <View className='flex flex-row justify-between mt-4'>
                <View className='flex flex-row items-center'>
                  <View className='bg-[#FDB73D] p-1 rounded-full'>
                    <TrophyIcon color={'white'} size={20} />
                  </View>
                  <Text className='text-black ml-3 font-medium'>Saving Goals</Text>
                </View>
                <ChevronRightIcon color={'#92a2c5'} size={20} />
              </View>
              <Pressable className='flex flex-row justify-between mt-4' onPress={() => {navigation.navigate('Expense Category')}}>
                <View className='flex flex-row items-center'>
                  <View className='bg-[#9C50E6] p-1 rounded-full'>
                    <ChartPieIcon color={'white'} size={20} />
                  </View>
                  <Text className='text-black ml-3 font-medium'>Expense Categories</Text>
                </View>
                <ChevronRightIcon color={'#92a2c5'} size={20} />
              </Pressable>
              <View className='flex flex-row justify-between mt-4'>
                <View className='flex flex-row items-center'>
                  <View className='bg-[#76D95B] p-1 rounded-full'>
                    <DocumentIcon color={'white'} size={20} />
                  </View>
                  <Text className='text-black ml-3 font-medium'>Download Statement</Text>
                </View>
                <ChevronRightIcon color={'#92a2c5'} size={20} />
              </View>
              <View className='flex flex-row justify-between mt-4'>
                <View className='flex flex-row items-center'>
                  <View className='bg-[#5EACF9] p-1 rounded-full'>
                    <ChartPieIcon color={'white'} size={20} />
                  </View>
                  <Text className='text-black ml-3 font-medium'>EMI Calculator</Text>
                </View>
                <ChevronRightIcon color={'#92a2c5'} size={20} />
              </View>
            </View>

          </View>

          <View className='py-2'>
            <View className='flex flex-col p-4 bg-[#F3F6FD] rounded-3xl mt-2'>
              <View className='flex flex-row justify-between'>
                <View className='flex flex-row items-center'>
                  <View className='bg-[#5D60FF] p-1 rounded-full'>
                    <UserIcon color={'white'} size={20} />
                  </View>
                  <Text className='text-black ml-3 font-medium'>Edit Profile</Text>
                </View>
                <ChevronRightIcon color={'#92a2c5'} size={20} />
              </View>
              <View className='flex flex-row justify-between mt-4'>
                <View className='flex flex-row items-center'>
                  <View className='bg-[#FDB73D] p-1 rounded-full'>
                    <BellIcon color={'white'} size={20} />

                  </View>
                  <Text className='text-black ml-3 font-medium'>Notification and Reminders</Text>
                </View>
                <ChevronRightIcon color={'#92a2c5'} size={20} />
              </View>
              <View className='flex flex-row justify-between mt-4'>
                <View className='flex flex-row items-center'>
                  <View className='bg-[#76D95B] p-1 rounded-full'>
                    <Cog8ToothIcon color={'white'} size={20} />
                  </View>
                  <Text className='text-black ml-3 font-medium'>Settings</Text>
                </View>
                <ChevronRightIcon color={'#92a2c5'} size={20} />
              </View>

            </View>

          </View>

          <View className='py-2'>
            <View className='flex flex-col p-4 bg-[#F3F6FD] rounded-3xl mt-2'>
              <View className='flex flex-row justify-between'>
                <View className='flex flex-row items-center'>
                  <View className='bg-[#5EACF9] p-1 rounded-full'>
                    <Text className='text-white font-bold h-[20px] w-[20px] text-center text-md' >?</Text>
                  </View>
                  <Text className='text-black ml-3 font-medium'>Help & Support</Text>
                </View>
                <ChevronRightIcon color={'#92a2c5'} size={20} />
              </View>
              <View className='flex flex-row justify-between mt-4'>
                <View className='flex flex-row items-center'>
                  <View className='bg-[#9C50E6] p-1 rounded-full'>
                    <ArrowLeftOnRectangleIcon color={'white'} size={20} />

                  </View>
                  <Text className='text-black ml-3 font-medium'>Logout</Text>
                </View>
                <ChevronRightIcon color={'#92a2c5'} size={20} />
              </View>
          
            </View>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: WHITE
  }
})