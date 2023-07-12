import React, { useState, useEffect, SyntheticEvent } from 'react';

import { Text, StyleSheet, Button, View, StatusBar, ScrollView, ActivityIndicator, Image, ImageBackground, Dimensions, Pressable, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../assets/globalstyles';
import { TextInput } from 'react-native-gesture-handler';
import { WHITE } from '../../assets/colors';
import { PaperClipIcon } from 'react-native-heroicons/outline'
import DateTimePicker from '@react-native-community/datetimepicker';
import { CalendarDaysIcon, CalendarIcon } from 'react-native-heroicons/solid';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import moment from 'moment';
import Checkbox from '../../components/Inputs/Checkbox';
import LoanSaveModal from '../../components/Modals/Loan/LoanSaveModal';
interface ScreenProps {
    navigation: any
}


export default function LoanAddScreen({ navigation }: ScreenProps) {
    const [date, setDate] = useState(new Date());
    const [loanFrom, setLoanFrom] = useState(1);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [dueDate, setDueDate] = useState('');
    const [billDate, setBillDate] = useState('');

    const onChange = (event: any, selectedDate: Date) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode: string) => {
        //@ts-ignore
        DateTimePickerAndroid.open({ value: date, onChange, mode: currentMode, is24Hour: false });
    };

    const showDatepicker = () => {
        {
            showMode('date');
        }
    }


    const handleBillDueDateInput = (e : string) => {
        if(parseInt(e) > 28)
        {
            return setDueDate((28).toString())
        }
        setDueDate(e)
        return;
    }

    const handleBillDateInput = (e : string) => {
        if(parseInt(e) > 28)
        {
            return setBillDate((28).toString())
        }
        setBillDate(e)
    }

    const hideModal = () => {
        setShowSaveModal(false)
    }

    const changeLoanFromType = (type: any) => {
        setLoanFrom(type)
    }
    return (
        <SafeAreaView style={GlobalStyles.mainScreenContainer}>
            <View className='flex justify-between flex-col' style={styles.container} >
                <View className='flex flex-col h-full'>
                    <View className='px-4'>
                        <View className='flex flex-col  px-3 py-0 rounded-2xl items-center justify-center '>
                            <View><Text className='text-black'>Enter Amount</Text></View>
                            <View className='flex flex-row items-center pt-5 pb-1 px-4 border-b border-[#C9CFDC] '>
                                <Text className='text-[#3195F7] text-3xl pb-0'>$</Text>
                                <TextInput style={{ alignSelf: 'stretch' }} placeholder='0.00' inputMode='decimal' className=' text-[#3195F7]  font text-center text-3xl' textBreakStrategy='simple' placeholderTextColor={'#3195F7'} />
                            </View>
                        </View>
                    </View>
                    <ScrollView className='flex flex-col mt-3 pb-20 pt-4' contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 20 }}>
                        <View className=''>
                            <Text className='text-black'>Loan Starting Date</Text>
                            <Pressable className='p-4 flex flex-row justify-between bg-[#F3F6FD] rounded-xl mt-2 items-center' onPress={() => { showDatepicker() }}>
                                <Text className='text-[#9DB2CE]'>{moment(date).format('L')}</Text>
                                <CalendarDaysIcon color={'#9DB2CE'} />
                            </Pressable>
                        </View>
                        <View className='pt-4'>
                            <Text className='text-black'>Down Payment</Text>
                            <TextInput className='bg-[#F3F6FD] rounded-xl p-4 mt-2 text-black' inputMode='numeric' placeholder='Enter Amount' placeholderTextColor={'#9DB2CE'}></TextInput>
                        </View>
                        <View className='pt-4'>
                            <Text className='text-black'>Tenure (In months)</Text>
                            <TextInput className='bg-[#F3F6FD] rounded-xl p-4 mt-2 text-black' inputMode='numeric' placeholder='Enter Amount' placeholderTextColor={'#9DB2CE'}></TextInput>
                        </View>
                        <View className='pt-4'>
                            <Text className='text-black'>Monthly EMI</Text>
                            <TextInput className='bg-[#F3F6FD] rounded-xl p-4 mt-2 text-black' inputMode='numeric' placeholder='Enter Months' placeholderTextColor={'#9DB2CE'}></TextInput>
                        </View>
                        <View className='flex flex-row justify-between p-4 bg-[#3195F7] rounded-3xl py-7 mt-4 items-center'>
                            <Text className='text-white/80'>Balance</Text>
                            <Text className='text-xl font-bold text-white'>$28,865.<Text className='text-xl font-bold text-white/80'>00</Text></Text>
                        </View>
                        <View className='pt-4'>
                            <Text className='text-black'>Loan For</Text>
                            <TextInput className='bg-[#F3F6FD] rounded-xl p-4 mt-2 text-black' inputMode='text' placeholder='Enter Reason' placeholderTextColor={'#9DB2CE'}></TextInput>
                        </View>
                        <View className='pt-4'>
                            <Text className='text-black'>Loan From</Text>
                            <View className='flex flex-row justify-between mt-2'>
                                <View className='bg-[#F3F6FD] px-4 py-4 flex flex-row items-center rounded-xl'>
                                    <Checkbox label="Person" value={loanFrom} boxValue={1} onChange={changeLoanFromType} />
                                </View>
                                <View className='bg-[#F3F6FD] px-4 py-4 flex flex-row items-center rounded-xl'>
                                    <Checkbox label="Bank" value={loanFrom} boxValue={2} onChange={changeLoanFromType} />
                                </View>
                                <View className='bg-[#F3F6FD] px-4 py-4 flex flex-row items-center rounded-xl'>
                                    <Checkbox label="Credit Card" value={loanFrom} boxValue={3} onChange={changeLoanFromType} />
                                </View>
                            </View>
                        </View>
                        {
                            loanFrom == 1 && (
                                <View className='pt-4'>
                                    <Text className='text-black'>Person Name</Text>
                                    <TextInput className='bg-[#F3F6FD] rounded-xl p-4 mt-2 text-black' inputMode='text' placeholder='Enter name' placeholderTextColor={'#9DB2CE'}></TextInput>
                                </View>
                            )
                        }
                        {
                            loanFrom == 2 && (
                                <View className='pt-4'>
                                    <Text className='text-black'>Bank Name</Text>
                                    <TextInput className='bg-[#F3F6FD] rounded-xl p-4 mt-2 text-black' inputMode='text' placeholder='Enter name' placeholderTextColor={'#9DB2CE'}></TextInput>
                                </View>
                            )
                        }
                        {
                            loanFrom == 3 && (
                                <>
                                    <View className='pt-4'>
                                        <Text className='text-black'>Card Name</Text>
                                        <TextInput className='bg-[#F3F6FD] rounded-xl p-4 mt-2 text-black' inputMode='text' placeholder='Enter name' placeholderTextColor={'#9DB2CE'}></TextInput>
                                    </View>
                                    <View className='mt-4'>
                                        <Text className='text-black'>Bill Date</Text>
                                        <TextInput value={billDate} className='bg-[#F3F6FD] rounded-xl p-4 mt-2 text-black' onChangeText={(e) => handleBillDateInput(e)} inputMode='numeric' placeholder='Enter a date between 1 and 28' placeholderTextColor={'#9DB2CE'}></TextInput>
                                        
                                    </View>
                                    <View className='mt-4'>
                                        <Text className='text-black'>Due Date</Text>
                                        <TextInput value={dueDate} className='bg-[#F3F6FD] rounded-xl p-4 mt-2 text-black' onChangeText={(e) => handleBillDueDateInput(e)} inputMode='numeric' placeholder='Enter a date between 1 and 28' placeholderTextColor={'#9DB2CE'}></TextInput>
                                        
                                    </View>
                                </>

                            )
                        }
                        <View className='pt-4'>
                            <Text className='text-black'>Description</Text>
                            <View className=''>
                                <TextInput style={{ textAlignVertical: 'top' }} className='bg-[#F3F6FD] rounded-xl p-4 mt-2 flex flex-row justify-start' placeholder='Enter Description' placeholderTextColor={'#9DB2CE'} multiline={true} numberOfLines={4}></TextInput>
                            </View>
                        </View>
                        <Pressable className='flex justify-center w-full flex-row pb-4 mt-4' onPress={() => { setShowSaveModal(true) }} >
                            <View className='bg-black py-4 w-[95%] rounded-xl'><Text className='text-white text-center font-semibold'>Save</Text></View>
                        </Pressable>
                    </ScrollView>
                </View>
                <LoanSaveModal show={showSaveModal} hideModal={hideModal}/>
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