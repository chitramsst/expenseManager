import React, { useState, useEffect } from 'react';

import { Text, StyleSheet, Button, View, StatusBar, ScrollView, ActivityIndicator, Image, ImageBackground, Dimensions, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../assets/globalstyles';
import { TextInput } from 'react-native-gesture-handler';
import NotificationIcon from '../../assets/Icons/NotificationIcon';
import { WHITE } from '../../assets/colors';
import { MagnifyingGlassIcon, PlusIcon } from 'react-native-heroicons/outline'

interface ScreenProps {
  navigation: any
}

interface HomeState {
  count: number;
}

let randomItems = [
  {
    color : '#C4F439',
    icon : require('../../assets/images/Icons/house.png')
  },
  {
    color : '#F6AB65',
    icon : require('../../assets/images/Icons/burger.png')
  },
  {
    color : '#FE94B3',
    icon : require('../../assets/images/Icons/fuel.png')
  },
  {
    color : '#F9D75E',
    icon : require('../../assets/images/Icons/shirt.png')
  },
  {
    color : '#5EACF9',
    icon : require('../../assets/images/Icons/medical.png')
  },
]

function IncomeItem(){
    return ( 
    <View className='flex flex-row justify-between mt-3'>
        <View className='flex flex-row '>
            <View className='h-12 w-12 bg-[#F6AB65] flex justify-center items-center rounded-2xl' style={{backgroundColor : randomItems[Math.floor(Math.random() * 4)].color}}>
                <Image source={randomItems[Math.floor(Math.random() * 4)].icon}></Image>
            </View>
            <View className='flex flex-col justify-between py-1 ml-2'>
                <Text className='font-semibold text-black text-md'>KFC</Text>
                <Text className='text-[#9DB2CE] text-xs'>Food</Text>
            </View>
        </View>
        <View className='flex flex-row '>
            <View className='flex flex-col gap-1 ml-3 items-end'>
                <Text className='font-bold text-black text-md'>-$ 1500<Text className='text-[#9DB2CE]'>.00</Text></Text>
                <Text className='text-[#9DB2CE] text-xs'>27 March, 2023</Text>
            </View>
        </View>
    </View>
    )
}   

export default function ExpenseListScreen({navigation} : ScreenProps) {
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
            <Text className='text-[#9DB2CE] font-bold'>March 2023</Text>
            <IncomeItem/>
            <IncomeItem/>
            <IncomeItem/>
            <IncomeItem/>
            <IncomeItem/>
            <IncomeItem/>
            <Text className='text-[#9DB2CE] font-bold mt-2'>February 2023</Text>
            <IncomeItem/>
            <IncomeItem/>
            <IncomeItem/>
            <IncomeItem/>
            <IncomeItem/>
            <IncomeItem/>
            <IncomeItem/>
            <IncomeItem/>
            <IncomeItem/>
            <IncomeItem/>
        </ScrollView>
        <Pressable onPress={() => {navigation.navigate('Add Expense')}} className='absolute bottom-5 bg-[#3195F7] rounded-full flex justify-center items-center ' style={{width : 60 , height : 60,left : ((Dimensions.get('window').width / 2) - 30)}}>
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