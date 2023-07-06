import React, { useState, useEffect, useRef } from 'react';

import { Text, StyleSheet, Button, View, StatusBar, ScrollView, ActivityIndicator, Image, ImageBackground, Dimensions, Pressable, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../assets/globalstyles';
import { TextInput } from 'react-native-gesture-handler';
import { WHITE } from '../../assets/colors';
import { PaperClipIcon } from 'react-native-heroicons/outline'

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
import { CheckCircleIcon, ChevronDownIcon } from 'react-native-heroicons/solid'


export default function ExpenseCategoryAddScreen({ navigation }: ScreenProps) {
    const [expanded, setExpanded] = useState(false)
    const containerRef = useRef()

    function expandContainer() {
        setExpanded(true)
    }

    function collapseContainer() {
        setExpanded(false)
    }

    function toggleContainer() {
        if (expanded == false) {
            expandContainer()
            return
        }
        collapseContainer();
        return

    }
    return (
        <SafeAreaView style={GlobalStyles.mainScreenContainer}>
            <View className='flex justify-between flex-col' style={styles.container} >
                <View className=''>

                    <ScrollView className='flex flex-col mt-3 pb-20 pt-4' contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 20 }}>
                        <View className=''>
                            <Text className='text-black'>Title</Text>
                            <TextInput className='bg-[#F3F6FD] rounded-xl p-4 mt-2' placeholder='Enter Title' placeholderTextColor={'#9DB2CE'}></TextInput>
                        </View>
                        <View className='pt-4' >
                            <Text className='text-black'>Choose Icon</Text>
                            <View className='flex flex-row  py-4 bg-[#F3F6FD] mt-2 rounded-xl flex-wrap overflow-hidden' style={{ maxHeight: expanded ? '100%' : 130 }} ref={containerRef}>
                                <View className='flex flex-col justify-between items-center ml-3 py-2'>
                                    <View className='h-14 w-14 bg-[#F6AB65] flex flex-col justify-center items-center rounded-3xl' style={{ backgroundColor: randomItems[Math.floor(Math.random() * 4)].color }}>
                                    </View>
                                    <Text className='text-[#9DB2CE] mt-2 text-xs'>Food</Text>
                                </View>
                                <View className='flex flex-col justify-between items-center ml-3 py-2'>
                                    <View className='h-14 w-14 bg-[#F6AB65] flex flex-col justify-center items-center rounded-3xl' style={{ backgroundColor: randomItems[Math.floor(Math.random() * 4)].color }}>
                                    </View>
                                    <Text className='text-black mt-2 text-xs'>Food</Text>
                                    <View className='absolute -right-1 bg-white rounded-full p-0.5 -top-2 z-50'>
                                        <CheckCircleIcon color={'#000000'} size={28} />
                                    </View>
                                </View>
                                {
                                    Array.apply(0, Array(10)).map(function (x, i) {
                                        return (
                                            <View className='flex flex-col justify-between items-center ml-3 py-2' key={i}>
                                                <View className='h-14 w-14 bg-[#F6AB65] flex flex-col justify-center items-center rounded-3xl' style={{ backgroundColor: randomItems[Math.floor(Math.random() * 4)].color }}>
                                                </View>
                                                <Text className='text-[#9DB2CE] mt-2 text-xs'>Food</Text>
                                            </View>)
                                    })}

                            </View>
                            <View className='absolute -bottom-4 z-20 flex justify-between items-center w-full' >
                                <Pressable className='p-1 bg-[#F3F6FD] rounded-full border-[6px] border-white' onPress={() => { toggleContainer() }} hitSlop={40}>
                                    <ChevronDownIcon color={'#000000'} size={15} rotation={expanded ? 180 : 0} />
                                </Pressable>
                            </View>
                        </View>
                        <View className='pt-4'>
                            <Text className='text-black'>Description</Text>
                            <View className=''>
                                <TextInput style={{ textAlignVertical: 'top' }} className='bg-[#F3F6FD] rounded-xl p-4 mt-2 flex flex-row justify-start' placeholder='Enter Description' placeholderTextColor={'#9DB2CE'} multiline={true} numberOfLines={4}></TextInput>
                            </View>
                        </View>
                        <Pressable className='flex justify-center w-full flex-row pb-4 mt-4 ' >
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