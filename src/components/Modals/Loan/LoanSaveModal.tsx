import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Checkbox from '../../Inputs/Checkbox';
import MainCheckbox from '../../Inputs/MainCheckbox';

export default function LoanSaveModal(props: any) {
    const [modalVisible, setModalVisible] = useState(false);
    const offset2 = useSharedValue(0);
    const height = useSharedValue(500);


    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: (offset2.value)
        };
    });
    const animatedStyle2 = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: height.value }]
        };
    });

    function hideModal() {
        offset2.value = withTiming(0, {
            duration: 300,
        });
        height.value = withTiming(500, {
            duration: 200
        })
        setTimeout(() => {
            props.hideModal()
        }, 200)
    }0

    function startShowAnimations() {
        offset2.value = withTiming(1, {
            duration: 500,
        });
        height.value = withTiming(0, {
            duration: 200
        })
    }

    return (
        <>

            <View style={[styles.centeredView]} >
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={props.show}
                    onShow={() => {
                        startShowAnimations()
                    }}
                   >
                    <Animated.View className={'h-screen w-screen absolute top-0 bg-black/40'} style={animatedStyle}>
                        <Pressable className='h-full w-full' onPress={() => hideModal()}></Pressable>
                    </Animated.View>
                    <Animated.View style={[styles.centeredView, animatedStyle2]}>
                        <View className='flex flex-col bg-white p-5' style={styles.modalView}>
                            <Text className='text-center text-black pb-4 pt-3'>How would you like to record the payment?</Text>
                            <View className='bg-[#F3F6FD] px-4 py-4 flex flex-row items-center rounded-xl mt-5 w-[60%]'>
                                <MainCheckbox label="Detect Actual Amount"  boxValue={1}  />
                            </View>
                            <Text className='text-xs w-[90%] pt-3 pb-4  text-black' >
                                Record the payment by deducting the actual amount from the balance.
                            </Text>

                            <View className='bg-[#F3F6FD] px-4 py-4 flex flex-row items-center rounded-xl mt-5 w-[60%]'>
                                <MainCheckbox label="Detect Dummy Account" boxValue={1}  />
                            </View>
                            <Text className='text-xs w-[90%] pt-3 pb-4 text-black'>
                                Record the payment by deducting a dummy amount for record-keeping purposes, without affecting the balance.
                            </Text>
                            <Pressable className='flex justify-center w-full flex-row pb-4 mt-4' onPress={() => {hideModal()}}>
                                <View className='bg-black py-4 w-[95%] rounded-xl'><Text className='text-white text-center font-semibold'>Save</Text></View>
                            </Pressable>
                        </View>
                    </Animated.View>
                </Modal>
            </View>
        </>
    )
}
// backgroundColor : 'rgba(0, 0, 0, 0.32)',

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        paddingVertical: 20,
        paddingHorizontal : 10,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
