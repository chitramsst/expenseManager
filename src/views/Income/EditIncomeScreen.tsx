import React, { useState, useEffect, useCallback } from 'react';

import { Text, StyleSheet, Button, View, StatusBar, ScrollView, ActivityIndicator, Image, ImageBackground, Dimensions, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../assets/globalstyles';
import { TextInput } from 'react-native-gesture-handler';
import { WHITE } from '../../assets/colors';
import { PaperClipIcon } from 'react-native-heroicons/outline'
import {ImagePickerResponse, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ChooseDocumentPickerModal from '../../components/Modals/Common/ChooseDocumentPickerModal';
import { object, string, number, date, InferType } from 'yup';
import axios from 'axios';
import LoaderModal from '../../components/Modals/Common/LoaderModal';
import { useFocusEffect } from '@react-navigation/native';
import { Income } from '../../interfaces';
import { updateIncome } from '../../database/helpers/IncomeHelper';

interface ScreenProps {
    navigation: any
    route: any
}


export default function EditIncomeScreen({ navigation,route }: ScreenProps) {
    const [fileResponse, setFileResponse] = useState<ImagePickerResponse | null>(null);
    const [showModal,setShowModal] = useState(false)
    const [editingItem,setEditingItem] = useState<Income | null>(null)
    const [loading,setLoading] = useState(false)
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [amount,setAmount] = useState('')
    const [errors,setErrors] = useState<Array<String>>([])

    useFocusEffect(
        React.useCallback(() => {
            setEditingItem(route.params.item)
            performInitialEditDataInput(route.params.item)
        }, [])
    );
    
    function performInitialEditDataInput(item : Income)
    {
        setAmount(item.amount.toString())
        setDescription(item.description)
        setTitle(item.title)
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
        await updateIncome({
            id : editingItem?.id,
            amount : Number(amount),
            title,
            date : new Date(),
            description
        });
        navigation.navigate('Income');
        // const data = new FormData();
        // if(fileResponse && fileResponse != undefined && fileResponse.assets)
        // {
        //     data.append("attachment", {
        //         name: fileResponse?.assets[0].fileName,
        //         type: fileResponse?.assets[0].type,
        //         uri: fileResponse?.assets[0].uri
        //     });
        // }
        // data.append('amount',amount);
        // data.append('title',title);
        // data.append('description',description);
        // try{
        //     await axios.post('user/income/edit/'+editingItem?.id,data,{headers : {'Content-Type' : 'multipart/form-data'}}).then((response) => {
        //         navigation.navigate('Income')
        //     }).catch((e) => {
        //         console.log(e.toJSON())
        //     })
        // }
        // catch(e)
        // {
        //     console.log(e)
        // }
        setLoading(false)
    }
    async function checkData(inputKey : string | null = null )
    {
        let returnVal = 0;
        let userSchema = object({
            amount: number().required(),
            title: string().required(),
        });
        await userSchema.validate({amount,title},{abortEarly : false}).then((out) => {
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
    return (
        <SafeAreaView style={GlobalStyles.mainScreenContainer}>
            <View className='flex justify-between flex-col' style={styles.container} >
                <View className=''>
                    <View className='px-4'>
                        <View className='flex flex-col  px-3 py-0 rounded-2xl items-center justify-center '>
                            <View><Text className='text-black'>Enter Amount</Text></View>
                            <View className='flex flex-row items-center pt-5 pb-1 px-4 border-b border-[#C9CFDC] '>
                                <Text className='text-[#3195F7] text-3xl pb-0'>$</Text>
                                <TextInput onBlur={() => {checkData('amount')}} style={{alignSelf  : 'stretch'}} value={amount} onChangeText={(text) => setAmount(text)} placeholder='0.00' inputMode='decimal'  className=' text-[#3195F7]  font text-center text-3xl' textBreakStrategy='simple' placeholderTextColor={'#3195F7'}/>
                            </View>
                            <Text className='h-4 text-red-500'>{errors.includes('amount')? 'Amount is required' : ''}</Text>
                        </View>
                    </View>
                    <ScrollView className='flex flex-col mt-3 pb-20 pt-4' contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 20 }}>
                        <View className=''>
                            <Text className='text-black'>Title</Text>
                            <TextInput onBlur={() => {checkData('title')}} className='bg-[#F3F6FD] rounded-xl p-4 mt-2 text-black' value={title} onChangeText={(text) => setTitle(text)} placeholder='Enter Title' placeholderTextColor={'#9DB2CE'}></TextInput>
                            <Text className='h-4 text-red-500'>{errors.includes('title')? 'Title is required' : ''}</Text>
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
                    </ScrollView>
                </View>
                <Pressable className='flex justify-center w-full flex-row pb-6' onPress={() => {saveData()}}>
                    <View className='bg-black py-4 w-[95%] rounded-xl'><Text className='text-white text-center font-semibold'>Save</Text></View>
                </Pressable>
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