import React, { useState, useEffect, useRef } from 'react';

import { Text, StyleSheet, Button, View, StatusBar, ScrollView, ActivityIndicator, Image, ImageBackground, Dimensions, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../assets/globalstyles';
import { Swipeable, TextInput } from 'react-native-gesture-handler';
import NotificationIcon from '../../assets/Icons/NotificationIcon';
import { WHITE } from '../../assets/colors';
import { MagnifyingGlassIcon, PlusIcon } from 'react-native-heroicons/outline'
import BankIcon from '../../assets/Icons/BankIcon';
import { ClockIcon, LightBulbIcon } from 'react-native-heroicons/solid';

interface ScreenProps {
  navigation: any
}

interface HomeState {
  count: number;
}

function LeftAction({})
{
  return (
    <View className='bg-[#3195F7] items-center rounded-xl flex flex-row justify-end mt-3 w-[50%] '>
       <Text className='text-white text-lg pr-8'>Add Late Fee</Text>
    </View>
  )
}

function LoanItem(){
  const swipeableRef = useRef<any>(null);
  return ( 
    <Swipeable ref={swipeableRef} overshootRight={false} overshootFriction={1} renderRightActions={() => <LeftAction />} >
        <View className='bg-[#F3F6FD] p-5 rounded-xl flex flex-row justify-between mt-3'>
            <Text className='text-black'>
                Jun 15, 2023
            </Text>
            <View className='flex flex-row items-center'>
                <Text className='text-black'>
                Paid
                </Text>
                <View className='ml-3 h-5 w-5 bg-[#3195F7] rounded-full'></View>
            </View>
        </View>
    </Swipeable>
    )
}   

export default function LoanViewScreen({navigation} : ScreenProps) {
  return (
    <SafeAreaView style={GlobalStyles.mainScreenContainer}>
      <View className='' style={styles.container} >
        <ScrollView className='flex flex-col mt-3 h-full pb-20' contentContainerStyle={{paddingBottom : 10 , paddingHorizontal : 20}}>
            <View className='flex flex-col  relative'>
                <View className='w-full h-32 bg-[#3195F7] rounded-2xl z-10 translate-y-6 flex justify-center items-center flex-col'>
                    <Text className='text-[#FFFFFFCC]'>Balance Amount</Text>
                    <Text className='text-white text-3xl font-bold pt-3'>$ 14,00<Text className='text-white/80'>.98</Text></Text>
                </View>
                <View className='w-full h-[150px] bg-[#131613] rounded-2xl  flex justify-center items-center flex-col'>
                    <Text className='text-[#FFFFFFCC] translate-y-2'>EMI Amount</Text>
                    <Text className='text-white text-3xl font-bold pt-3  translate-y-2'>$ 14,00<Text className='text-white/80'>.98</Text></Text>
                </View>
            </View>
            <View className='pt-4 flex flex-row justify-center items-center'>
                <ClockIcon color={'#3195F7'} size={18} />
                <Text className='text-center pl-1 text-[#3195F7]'>6 Months Remaining</Text>
            </View>
            <View className='flex flex-row justify-between border-b border-[#1316131A] pb-3'>
                <View className='flex flex-col w-[60%] pt-4'>
                    <Text className='text-[#9DB2CE] '>loan From</Text>
                    <View className='flex flex-row  items-center'>
                        <BankIcon/>
                        <Text className='text-black ml-2 font-medium text-lg'>ESAF Bank</Text>
                    </View>
                </View>
                <View className='flex flex-col  pt-4 pr-4'>
                    <Text className='text-[#9DB2CE] '>Next EMI</Text>
                    <View className='flex flex-row '>
                        <Text className='text-black font-medium text-lg'>28-06-2023</Text>
                    </View>
                </View>
            </View>
            <View className='flex flex-row justify-between pt-3'>
                <Text className='text-[#9DB2CE] '>Loan History</Text>
                <View className='flex flex-row items-center'>
                    <LightBulbIcon color={'black'} size={10}/>
                    <Text className='pl-1 text-xs text-black'>Swipe left for options</Text>
                </View>
            </View>
            <View className='mt-3'>
               <LoanItem/>
               <LoanItem/>
               <LoanItem/>
            </View>
            <View className='mt-4 pb-10'>
                <Text className='text-[#9DB2CE]'>
                    Description
                </Text>

                <Text className='text-black leading-5 pt-3'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
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