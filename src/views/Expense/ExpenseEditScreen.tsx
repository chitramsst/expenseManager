import React, { useState, useEffect, useCallback } from 'react';

import { Text, StyleSheet, Button, View, StatusBar, ScrollView, ActivityIndicator, Image, ImageBackground, Dimensions, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../assets/globalstyles';
import { TextInput } from 'react-native-gesture-handler';
import { WHITE } from '../../assets/colors';
import { PaperClipIcon } from 'react-native-heroicons/outline'
import { CheckCircleIcon } from 'react-native-heroicons/solid'
import {ImagePickerResponse, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ChooseDocumentPickerModal from '../../components/Modals/Common/ChooseDocumentPickerModal';
import { object, string, number, date, InferType } from 'yup';
import axios from 'axios';
import {icons,Icon} from '../../data/expenseCategoryIcons';
import LoaderModal from '../../components/Modals/Common/LoaderModal';
import stringLimit from '../../utlities/stringLimit';
import { useFocusEffect } from '@react-navigation/native';
import { Expense } from '../../interfaces';
import { getCategories } from '../../database/helpers/CategoryHelper';
import { updateExpense } from '../../database/helpers/ExpenseHelper';
interface ScreenProps {
    navigation: any
    route :any
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

export default function ExpenseEditScreen({ navigation,route }: ScreenProps) {
    const [editingItem,setEditingItem] = useState<Expense | null>(null)
    const [fileResponse, setFileResponse] = useState<ImagePickerResponse | null>(null);
    const [showModal,setShowModal] = useState(false)
    const [loading,setLoading] = useState(false)
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [amount,setAmount] = useState('')
    const [errors,setErrors] = useState<Array<String>>([])
    const [categories,setCategories] = useState<Array<any>>([])
    const [selectedCategory,setSelectedCategory] = useState<any>(null)

    useFocusEffect(
        React.useCallback(() => {
            getData()
        }, [])
    );




    useEffect(() => {
    },[])
    async function getData()
    {
        setLoading(true)
        let categories = await getCategories()
        setCategories(categories)
        setEditingItem(route.params.item)
        performInitialEditDataInput(route.params.item,categories)
        setLoading(false)
    }

    function performInitialEditDataInput(item : Expense,categories : Array<any>)
    {
        setAmount(item.amount.toString())
        setDescription(item.description)
        setTitle(item.title)
        let index = categories.findIndex((x) => x.id == item.category_id)
        if(index != -1)
        {
            setSelectedCategory(categories[index])
        }
    }


    const handleDocumentSelection = useCallback(async () => {
        setShowModal(true)
    }, []);
    
    async function handleModalClose(data : string)
    {
        setShowModal(false)
        if(data == 'CAMERA')
        {
            let output = await launchCamera({mediaType : 'photo',cameraType : 'back',saveToPhotos : true , quality : 0.7});
            if(output.didCancel)
            {
                return;
            }
            setFileResponse(output)
        }
        else if(data == 'ALBUM')
        {
            let output = await launchImageLibrary({mediaType : 'photo',selectionLimit : 1,quality :0.7});
            if(output.didCancel)
            {
                return;
            }
            setFileResponse(output)
        }
    }
    async function saveData()
    {

        let check = await checkData()
        if(check != 1)
        {
            return;
        }
        setLoading(true)
        await updateExpense({
            id : editingItem?.id,
            amount : Number(amount),
            title,
            //@ts-ignore
            date : new Date(),
            //@ts-ignore
            attachment_url : '',
            category_id : selectedCategory?.id,
            description
        });
        setLoading(false)
        navigation.navigate('Expense')
    }
    async function checkData(inputKey : string | null = null )
    {
        let returnVal = 0;
        let userSchema = object({
            amount: number().required(),
            selectedCategory: object().required(),
            title: string().required(),
        });
        await userSchema.validate({amount,title,selectedCategory},{abortEarly : false}).then((out) => {
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

    function selectCategory(category : any)
    {
        setSelectedCategory(category)
    }
    return (
        <SafeAreaView style={GlobalStyles.mainScreenContainer}>
            <View className='flex justify-between flex-col h-full' style={styles.container} >
                <View className='flex  flex-col h-full'>
                    <View className='px-4'>
                        <View className='flex flex-col  px-3 py-0 rounded-2xl items-center justify-center '>
                            <View><Text className='text-black'>Enter Amount</Text></View>
                            <View className='flex flex-row items-center pt-5 pb-1 px-4 border-b border-[#C9CFDC] '>
                                <Text className='text-black text-3xl pb-0'>$</Text>
                                <TextInput onBlur={() => {checkData('amount')}} style={{alignSelf  : 'stretch'}} value={amount} onChangeText={(text) => setAmount(text)} placeholder='0.00' inputMode='decimal'  className=' text-black  font text-center text-3xl' textBreakStrategy='simple' placeholderTextColor={'black'}/>
                            </View>
                            <Text className='h-4 text-red-500'>{errors.includes('amount')? 'Amount is required' : ''}</Text>
                        </View>
                    </View>
                    <ScrollView className='mt-3 pt-4  h-full' contentContainerStyle={{paddingBottom :40,  paddingHorizontal: 20 }} scrollEnabled={true}>
                        <View className=''>
                            <Text className='text-black'>Title</Text>
                            <TextInput onBlur={() => {checkData('title')}} className='bg-[#F3F6FD] rounded-xl p-4 mt-2 text-black' value={title} onChangeText={(text) => setTitle(text)} placeholder='Enter Title' placeholderTextColor={'#9DB2CE'}></TextInput>
                            <Text className='h-4 text-red-500'>{errors.includes('title')? 'Title is required' : ''}</Text>
                        </View>
                        <View className='pt-4'>
                            <View className='flex flex-row justify-between'>
                                <Text className='text-black'>Choose Category</Text>
                                <Pressable onPress={() => {navigation.navigate('Add Expense Category')}} hitSlop={20} className='py-2'>
                                    <Text className='text-[#3195F7]'>+Add Category</Text>
                                </Pressable>

                            </View>
                            <ScrollView horizontal={true} className='flex flex-row gap-3 py-4'>
                                {
                                    categories.map((category,index) => {
                                        return ( 
                                            <Pressable key={category.id} onPress={() => selectCategory(category)}>
                                                <View className='flex flex-col justify-between items-center' >
                                                    <View className='h-16 w-16 bg-[#F6AB65] flex flex-col justify-center items-center rounded-3xl' style={{ backgroundColor: icons[category.icon_number - 1].color }}>
                                                        <Image source={icons[category.icon_number - 1].icon} className='w-8 h-8'></Image>
                                                    </View>
                                                    <Text className='text-[#9DB2CE] mt-2 text-xs'>{ stringLimit(category.title,10)}</Text>
                                                    {
                                                        (selectedCategory?.id == category.id) && (
                                                            <View className='absolute -right-1 bg-white rounded-full p-0.5 -top-2 z-50'>
                                                                <CheckCircleIcon color={'#000000'} size={28} />
                                                            </View>
                                                        )
                                                    }
                                                </View>
                                            </Pressable>
                                        )
                                    })
                                }
                               
                            </ScrollView>
                            <Text className='h-5 text-red-500'>{errors.includes('selectedCategory')? 'A category must be selected!' : ''}</Text>
                        </View>
                        <View className='pt-2'>
                            <Text className='text-black '>Attachments</Text>
                            <Pressable className='flex justify-center flex-row items-center bg-[#F3F6FD] py-4 mt-2 rounded-xl' hitSlop={30} onPress={handleDocumentSelection}>
                                <PaperClipIcon color={'#9DB2CE'} size={20}  />
                                <Text className='ml-3 text-[#9DB2CE]'>{fileResponse ? 'Attached File' : 'Add Attachments'}</Text>
                            </Pressable>
                        </View>
                        <View className='pt-4'>
                            <Text className='text-black'>Description</Text>
                            <View className=''>
                                <TextInput style={{ textAlignVertical: 'top' }} value={description} onChangeText={(text) => setDescription(text)} className='bg-[#F3F6FD] text-black rounded-xl p-4 mt-2 flex flex-row justify-start' placeholder='Enter Description' placeholderTextColor={'#9DB2CE'} multiline={true} numberOfLines={4}></TextInput>
                            </View>
                        </View>
                        <Pressable className='flex justify-center w-full flex-row pt-6' onPress={() => {saveData()}}>
                            <View className='bg-black py-4 w-[95%] rounded-xl'><Text className='text-white text-center font-semibold'>Save</Text></View>
                        </Pressable>
                    </ScrollView>

                </View>
                <ChooseDocumentPickerModal show={showModal} hideModal={handleModalClose}/>
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