import React, { useState, useEffect } from 'react';

import { Text, StyleSheet, Button, View, StatusBar, ScrollView, ActivityIndicator, Image, ImageBackground, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../assets/globalstyles';
import { TextInput } from 'react-native-gesture-handler';
import NotificationIcon from '../../assets/Icons/NotificationIcon';
import { WHITE } from '../../assets/colors';
import { MagnifyingGlassIcon, PlusIcon } from 'react-native-heroicons/outline'

interface HomeScreenProps {
  navigation: any
}

interface HomeState {
  count: number;
}

function IncomeItem(){
    return ( 
    <View className='flex flex-row justify-between mt-3'>
        <View className='flex flex-row '>
            <View className='h-10 w-10 bg-[#89D9BC] flex justify-center items-center rounded-lg'>
                <Text className='text-white text-xl font-bold'>27</Text>
            </View>
            <View className='flex flex-col gap-1 ml-2'>
                <Text className='font-bold text-black text-md'>Xfortech</Text>
                <Text className='text-[#9DB2CE] text-xs'>Monthly Salary </Text>
            </View>
        </View>
        <View className='flex flex-row '>
            <View className='flex flex-col gap-1 ml-3 items-end'>
                <Text className='font-bold text-black text-md'>+$ 1500<Text className='text-[#9DB2CE]'>.00</Text></Text>
                <Text className='text-[#9DB2CE] text-xs'>27 March, 2023</Text>
            </View>
        </View>
    </View>
    )
}   

export default function HomeScreen() {
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
        <View className='absolute bottom-5 bg-[#3195F7] rounded-full flex justify-center items-center ' style={{width : 60 , height : 60,left : ((Dimensions.get('window').width / 2) - 30)}}>
            <PlusIcon color={'#ffffff'} size={30}/>
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