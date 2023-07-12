import React, { useState, useEffect } from 'react';

import { Text, StyleSheet, Button, View, StatusBar, ScrollView, ActivityIndicator, Image, ImageBackground, Dimensions, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../assets/globalstyles';
import { TextInput } from 'react-native-gesture-handler';
import NotificationIcon from '../../assets/Icons/NotificationIcon';
import { WHITE } from '../../assets/colors';
import { MagnifyingGlassIcon, PlusIcon } from 'react-native-heroicons/outline'
import BankIcon from '../../assets/Icons/BankIcon';

interface ScreenProps {
  navigation: any
}

interface HomeState {
  count: number;
}

function LoanItem(){
    return ( 
        <View className='my-1'>
            <View className='bg-[#599651] py-2 pb-4 rounded-t-3xl'>
                <Text className='text-white text-xs text-center'>6 Months Remaining</Text>
            </View>
            <View className='flex flex-col rounded-2xl pt-2 justify-between  bg-[#F3F6FD] p-4 -translate-y-3'>
                <View className=' w-full flex flex-col pr-5'>
                    <View className='flex flex-row pb-4 border-b border-[#1316131A]'>
                        <View className='flex flex-col w-[70%]'>
                            <Text className='text-[#9DB2CE] '>loan From</Text>
                            <View className='flex flex-row  items-center'>
                                <BankIcon/>
                                <Text className='text-black ml-2 font-medium text-lg'>ESAF Bank</Text>
                            </View>
                        </View>
                        <View className='flex flex-col'>
                            <Text className='text-[#9DB2CE] '>Next EMI</Text>
                            <View className='flex flex-row '>
                                <Text className='text-black font-medium text-lg'>28-06-2023</Text>
                            </View>
                        </View>
                    </View>
                    <View className='flex flex-row  pt-4'>
                        <View className='flex flex-col w-[70%]'>
                            <Text className='text-[#9DB2CE] '>EMI Amount</Text>
                            <View className='flex flex-row'>
                                <Text className='text-black font-medium text-lg'>$ 25,00<Text className='text-[#9DB2CE]'>.98</Text></Text>
                            </View>
                        </View>
                        <View className='flex flex-col'>
                            <Text className='text-[#9DB2CE] text-start '>Balance Amount</Text>
                            <View className='flex flex-row '>
                                <Text className='text-black font-medium text-lg'>$ 25,00<Text className='text-[#9DB2CE]'>.98</Text></Text>
                            </View>
                        </View>
                    </View>
                    
                </View>
            </View>
    </View>
    )
}   

export default function LoanListScreen({navigation} : ScreenProps) {
  return (
    <SafeAreaView style={GlobalStyles.mainScreenContainer}>
      <View className='' style={styles.container} >
        <View className='px-4'>
            <View className='flex flex-row bg-[#F3F6FD] px-3 py-1 rounded-2xl items-center '>
                <MagnifyingGlassIcon color={'#9DB2CE'} size={20}/>
                <TextInput placeholder="Search" className='ml-2 flex w-full' placeholderTextColor="#9DB2CE" hitSlop={100}/>
            </View>
        </View>
    
        <ScrollView className='flex flex-col mt-3 h-full pb-20' contentContainerStyle={{paddingBottom : 10 , paddingHorizontal : 20}}>
            <Pressable onPress={() => {navigation.navigate('View Loan')}}>
                <LoanItem/>
            </Pressable>
            <LoanItem/>
            <LoanItem/>
            <LoanItem/>
        </ScrollView>
        <Pressable onPress={() => {navigation.navigate('Add Loan')}} className='absolute bottom-5 bg-[#3195F7] rounded-full flex justify-center items-center ' style={{width : 60 , height : 60,left : ((Dimensions.get('window').width / 2) - 30)}}>
            <PlusIcon color={'#ffffff'} size={30}/>
        </Pressable>
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