import React, { useState, useEffect } from 'react';

import { Text, StyleSheet, Button, View, StatusBar, ScrollView, ActivityIndicator, Image, ImageBackground, Pressable, SafeAreaView, TextInput, KeyboardAvoidingView, Alert } from 'react-native'
import GlobalStyles from '../../assets/globalstyles';
import { WHITE } from '../../assets/colors';
import DropDownIcon from '../../assets/Icons/DropDown'
import BackButtonIcon from '../../assets/Icons/BackButton'
import ProfilePictureChooseModal from '../../components/Modals/ProfilePictureChooseModal';
import DocumentPicker from 'react-native-document-picker'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


import { object, string, number, date, InferType } from 'yup';
import { setUserObject } from '../../stores/slices/authSlice';
import LoaderModal from '../../components/Modals/Common/LoaderModal';
interface PageProps {
    navigation: any
}

interface HomeState {
    count: number;
}

export default function RegisterScreen({ navigation } : PageProps) {
    const [showModal, setShowModal] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [profile, setProfile] = useState(null)
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const dispatch = useDispatch();
    const [showLoader, setShowLoader] = useState(false)

    const phoneNumber: string = useSelector((state) => state.phoneNumber.value);

    function hideModal() {
        setShowModal(false)
    }

    async function checkValidations()
    {
        let messages = []
        let userSchema = object({
            name: string().required(),
            email: string().email().required(),
        });

        userSchema.validate({name,email},{abortEarly : false}).then((out) => {
            registerUser()
        }).catch((reason) => {
            reason.inner.forEach(error => {
                if(error.path == 'name')
                {
                    setNameError(error.message)
                }
                else{
                    setEmailError(error.message)
                }
            })
        });
    }

    function registerUser()
    {
        setShowLoader(true)
        axios.post('register',{name, email, phone : phoneNumber}).then((response) => {
            if(response.data.success == true)
            {
                dispatch(setUserObject(response.data.user))
                navigation.navigate('HomeStack')
            }
            else{
                setShowLoader(false)
                Alert.alert('Failed to register!', 'Registration failed, Try again')
            }
        })
    }

    return (
        <SafeAreaView style={GlobalStyles.mainScreenContainer}>
            <StatusBar backgroundColor={'rgba(49, 149, 247, 1)'} />
            <View className="h-full w-full bg-white rounded-t-[30px] p-4 pt-1 flex justify-between flex-col " behavior='padding'>
                <View className=" ">
                    <View className='flex flex-row justify-between pt-6 items-center'>
                        <Pressable onPress={() => {navigation.navigate('Login')}}>
                            <BackButtonIcon />
                        </Pressable>
                        <Text className='text-lg text-[#1C2340] font-bold'>Registration</Text>
                        <Text className='text-black pl-3'></Text>
                    </View>

                    <View className='pt-8 flex flex-row justify-between items-center'>
                        <Text className='text-black'>Profile Photo</Text>
                        <Pressable className='bg-[#C4F439] p-2 rounded-full' onPress={() => {setShowModal(true)}} >
                            <Image source={require('../../assets/images/Profile/profile_icon.png')} />
                        </Pressable>
                    </View>
                    <View className='pt-4'>
                        <Text className='text-black'>Name</Text>
                        <View className=''>
                            <TextInput placeholder='Enter Your Name' placeholderTextColor={'#9DB2CE'} className='flex flex-row items-center bg-[#F3F6FD] p-3 py-4  mt-2 rounded-2xl text-black' onChangeText={(text) => {setName(text); ; setNameError('')}} />
                            <View className='h-5'>{nameError != '' && <Text className='text-xs text-red-500'>Name is required</Text>}</View>
                        </View>
                    </View>
                    <View className='pt-3'>
                        <Text className='text-black'>Email</Text>
                        <View className=''>
                            <TextInput keyboardType='email-address' onChangeText={(text) => {setEmail(text); setEmailError('')}} placeholder='Enter Your Email Address' placeholderTextColor={'#9DB2CE'} className='flex flex-row items-center bg-[#F3F6FD] p-3 py-4  mt-2 rounded-2xl text-black' />
                            <View className='h-5'>{emailError != '' && <Text className='text-xs text-red-500'>Email is required</Text>}</View>

                        </View>
                    </View>

                    <View className='pt-3'>
                        <Text className='text-black'>Phone Number</Text>
                        <View className=''>
                            <TextInput keyboardType='phone-pad' placeholder='Enter Your Phone Number' value={phoneNumber} editable={false}  placeholderTextColor={'#9DB2CE'} className='flex flex-row items-center text-black bg-[#F3F6FD] p-3 py-4  mt-2 rounded-2xl' />
                        </View>
                    </View>
                </View>
                <Pressable className='mt-8 flex justify-center w-full flex-row ' onPress={() => {checkValidations()}}>
                    <View className='bg-black py-4 w-[95%] rounded-xl'><Text className='text-white text-center font-semibold'>Register</Text></View>
                </Pressable>
            </View>
            <View>
                <ProfilePictureChooseModal show={showModal} hideModal={hideModal}/>
                <LoaderModal show={showLoader}/>
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