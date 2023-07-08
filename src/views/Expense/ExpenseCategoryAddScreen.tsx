import React, { useState, useEffect, useRef } from 'react';

import { Text, StyleSheet, Button, View, StatusBar, ScrollView, ActivityIndicator, Image, ImageBackground, Dimensions, Pressable, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../assets/globalstyles';
import { TextInput } from 'react-native-gesture-handler';
import { WHITE } from '../../assets/colors';
import { PaperClipIcon } from 'react-native-heroicons/outline'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { object, string, number, date, InferType } from 'yup';
import {icons,Icon} from '../../data/expenseCategoryIcons';
interface ScreenProps {
    navigation: any
}

import { CheckCircleIcon, ChevronDownIcon } from 'react-native-heroicons/solid'
import axios from 'axios';
import LoaderModal from '../../components/Modals/Common/LoaderModal';
import { useFocusEffect } from '@react-navigation/native';


export default function ExpenseCategoryAddScreen({ navigation }: ScreenProps) {
    const [expanded, setExpanded] = useState(false)
    const offset = useSharedValue(100);
    const opacity = useSharedValue(0);
    const [height,setHeight] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedIcon, setSelectedIcon] = useState<null | Icon>(null)

    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [errors,setErrors] = useState<Array<String>>([])

    

    const animatedStyle = useAnimatedStyle(() => {
        if(!loaded == true)
        {
            return {}
        }
        return {
            height: offset.value,
            opacity: opacity.value
        }
    })


    useEffect(() => {
        setSelectedIcon(icons[0])
    },[])

    async function saveData()
    {

        let check = await checkData()
        if(check != 1)
        {
            return;
        }
        setLoading(true)
        let data = {
            title,
            description,
            icon_number : (selectedIcon?.id)
        }
        try{
            await axios.post('user/category/create',data).then((response) => {
                navigation.navigate('Add Expense',{item : response.data.data})
            }).catch((e) => {
                console.log(e.toJSON())
            })
        }
        catch(e)
        {
            console.log(e)
        }
        setLoading(false)
    }
    async function checkData(inputKey : string | null = null )
    {
        let returnVal = 0;
        let userSchema = object({
            title: string().required(),
        });
        await userSchema.validate({title},{abortEarly : false}).then((out) => {
            setErrors([])
            returnVal = 1;
        }).catch((reason) => 
        {
            let errors : Array<String> = []
            // @ts-ignore
            reason.inner.forEach(error => {
                if(inputKey && inputKey == error.path)
                {
                    errors.push(error.path)
                }
                else if(!inputKey)
                {
                    errors.push(error.path)
                }
            })
            setErrors(errors)
            returnVal = 0;
        });
        return returnVal;
    }
    

    function expandContainer() {
        setExpanded(true)
        offset.value = withTiming(height, {
            duration: 500,
        });
        
    }

    function collapseContainer() {
        setExpanded(false)
        offset.value = withTiming(100, {
            duration: 500,
        });
    }

    function toggleContainer() {
        if (expanded == false) {
            expandContainer()
            return
        }
        collapseContainer();
        return
    }

    function setInitialHeight(e : any)
    {
        if(loaded == true)
        {
            return;
        }
        setHeight(e.nativeEvent.layout.height)
        opacity.value = withTiming(1, {
            duration: 500,
        });
        setLoaded(true)
    }

    function selectIcon(icon : Icon)
    {
        setSelectedIcon(icon)
    }

    return (
        <SafeAreaView style={GlobalStyles.mainScreenContainer}>
            <View className='flex justify-between flex-col' style={styles.container} >
                <View className=''>
                    <ScrollView className='flex flex-col mt-3 pb-20 pt-4' contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 20 }}>
                        <View className=''>
                            <Text className='text-black'>Title</Text>
                            <TextInput onBlur={() => {checkData('title')}} className='bg-[#F3F6FD] rounded-xl p-4 mt-2 text-black' value={title} onChangeText={(text) => setTitle(text)} placeholder='Enter Title' placeholderTextColor={'#9DB2CE'}></TextInput>
                            <Text className='h-4 text-red-500'>{errors.includes('title')? 'Title is required' : ''}</Text>
                        </View>
                        <View className='pt-4' >
                            <Text className='text-black'>Choose Icon</Text>
                            <Animated.View style={ [animatedStyle, {opacity : 0}] }  className={'overflow-hidden  rounded-xl'} onLayout={(e) => {
                                setInitialHeight(e)
                            }}>
                            <View className='flex flex-row  py-4 bg-[#F3F6FD] mt-2 rounded-xl flex-wrap  ' >
                               
                                {
                                    icons.map(function (x, i) {
                                        return (
                                            <Pressable onPress={() => selectIcon(x)} key={i} android_ripple={{color : x.color, borderless : true}} className='ml-3 rounded-full'>
                                                <View className='flex flex-col justify-between items-center  py-2' >
                                                    <View className='h-14 w-14 bg-[#F6AB65] flex flex-col justify-center items-center rounded-3xl' style={{ backgroundColor: x.color }}>
                                                        <Image source={x.icon} className='w-8 h-8'></Image>
                                                    </View>
                                                    {
                                                        selectedIcon?.id == x.id && (
                                                        <View className='absolute -right-1 bg-white rounded-full p-0.5 -top-2 z-50'>
                                                            <CheckCircleIcon color={'#000000'} size={28} />
                                                        </View>)
                                                    }
                                                
                                                </View>
                                            </Pressable>
                                            )
                                    })}
                                
                            </View>
                            </Animated.View>
                            <View className='absolute -bottom-4 z-20 flex justify-between items-center w-full' >
                                    <Pressable className='p-1 bg-[#F3F6FD] rounded-full border-[6px] border-white' onPress={() => { toggleContainer() }} hitSlop={20}>
                                        <ChevronDownIcon color={'#000000'} size={15} rotation={expanded ? 180 : 0} />
                                    </Pressable>
                                </View>
                        </View>
                        <View className='pt-4'>
                            <Text className='text-black'>Description</Text>
                            <View className=''>
                                <TextInput style={{ textAlignVertical: 'top' }} value={description} onChangeText={(text) => setDescription(text)} className='bg-[#F3F6FD] text-black rounded-xl p-4 mt-2 flex flex-row justify-start' placeholder='Enter Description' placeholderTextColor={'#9DB2CE'} multiline={true} numberOfLines={4}></TextInput>
                            </View>
                        </View>
                        <Pressable className='flex justify-center w-full flex-row mb-4 mt-4 ' onPress={() => {saveData()}} >
                            <View className='bg-black py-4 w-[95%] rounded-xl'><Text className='text-white text-center font-semibold'>Save</Text></View>
                        </Pressable>
                    </ScrollView>
                </View>
                <LoaderModal show={loading}/>
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