import React, { useState, useEffect } from 'react';

import { Text, StyleSheet, Button, View, StatusBar, ScrollView, ActivityIndicator, Image, ImageBackground, Dimensions, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../assets/globalstyles';
import { TextInput } from 'react-native-gesture-handler';
import { WHITE } from '../../assets/colors';
import { PaperClipIcon } from 'react-native-heroicons/outline'
import { CheckCircleIcon } from 'react-native-heroicons/solid'

interface ScreenProps {
    navigation: any
}


let randomItems = [
    {
        color: '#C4F439',
        icon: require('../../assets/images/Icons/house.png')
    },
    {
        color: '#F6AB65',
        icon: require('../../assets/images/Icons/burger.png')
    },
    {
        color: '#FE94B3',
        icon: require('../../assets/images/Icons/fuel.png')
    },
    {
        color: '#F9D75E',
        icon: require('../../assets/images/Icons/shirt.png')
    },
    {
        color: '#5EACF9',
        icon: require('../../assets/images/Icons/medical.png')
    },
]

export default function ExpenseAddScreen({ navigation }: ScreenProps) {
    return (
        <SafeAreaView style={GlobalStyles.mainScreenContainer}>
            <View className='flex justify-between flex-col' style={styles.container} >
                <View className=''>
                    <View className='px-4'>
                        <View className='flex flex-col  px-3 py-1 rounded-2xl items-center justify-center '>
                            <View><Text className='text-black'>Enter Amount</Text></View>
                            <View className='flex flex-row items-center pt-5 pb-1 px-4 border-b border-[#C9CFDC] '>
                                <Text className='text-black font-extrabold text-3xl'>$</Text>
                                {/* <TextInput inputMode='decimal' value='2932.' className=' text-[#3195F7] font-extrabold text-center text-3xl' placeholderTextColor={'#3195F7'}/> */}
                                <Text className=' text-black font-extrabold text-center text-3xl '>3,3995.</Text>
                                <Text className=' text-black/30 font-extrabold text-center text-3xl'>00</Text>
                            </View>
                        </View>
                    </View>
                    <ScrollView className='flex flex-col mt-3 pb-20 pt-4' contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 20 }}>
                        <View className=''>
                            <Text className='text-black'>Title</Text>
                            <TextInput className='bg-[#F3F6FD] rounded-xl p-4 mt-2' placeholder='Enter Title' placeholderTextColor={'#9DB2CE'}></TextInput>
                        </View>
                        <View className='pt-4'>
                            <View className='flex flex-row justify-between'>
                                <Text className='text-black'>Choose Category</Text>
                                <Pressable onPress={() => {navigation.navigate('Add Expense Category')}} hitSlop={20} className='py-2'>
                                    <Text className='text-[#3195F7]'>+Add Category</Text>
                                </Pressable>

                            </View>
                            <ScrollView horizontal={true} className='flex flex-row gap-3 py-4'>
                                <View className='flex flex-col justify-between items-center'>
                                    <View className='h-16 w-16 bg-[#F6AB65] flex flex-col justify-center items-center rounded-3xl' style={{ backgroundColor: randomItems[Math.floor(Math.random() * 4)].color }}>
                                        <Image source={randomItems[Math.floor(Math.random() * 4)].icon}></Image>
                                    </View>
                                    <Text className='text-[#9DB2CE] mt-2 text-xs'>Food</Text>
                                </View>
                                <View className='flex flex-col justify-between items-center'>
                                    <View className='h-16 w-16 bg-[#F6AB65] flex flex-col justify-center items-center rounded-3xl' style={{ backgroundColor: randomItems[Math.floor(Math.random() * 4)].color }}>
                                        <Image source={randomItems[Math.floor(Math.random() * 4)].icon}></Image>
                                    </View>
                                    <Text className='text-black mt-2 text-xs'>Food</Text>
                                    <View className='absolute -right-1 bg-white rounded-full p-0.5 -top-2 z-50'>
                                        <CheckCircleIcon color={'#000000'} size={28} />
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        <View className='pt-4'>
                            <Text className='text-black '>Attachments</Text>
                            <Pressable className='flex justify-center flex-row items-center bg-[#F3F6FD] py-4 mt-2 rounded-xl'>
                                <PaperClipIcon color={'#9DB2CE'} size={20} />
                                <Text className='ml-3 text-[#9DB2CE]'>Add Attachments</Text>
                            </Pressable>
                        </View>
                        <View className='pt-4'>
                            <Text className='text-black'>Description</Text>
                            <View className=''>
                                <TextInput style={{ textAlignVertical: 'top' }} className='bg-[#F3F6FD] rounded-xl p-4 mt-2 flex flex-row justify-start' placeholder='Enter Description' placeholderTextColor={'#9DB2CE'} multiline={true} numberOfLines={4}></TextInput>
                            </View>
                        </View>
                        <Pressable className='flex justify-center w-full flex-row pb-4 pt-5' >
                            <View className='bg-black py-4 w-[95%] rounded-xl'><Text className='text-white text-center font-semibold'>Save</Text></View>
                        </Pressable>
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
        backgroundColor: WHITE
    }
})