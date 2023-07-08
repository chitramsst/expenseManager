import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

export default function LoanSaveModal(props: any) {
    const [modalVisible, setModalVisible] = useState(false);
    const offset2 = useSharedValue(0);
    const height = useSharedValue(200);


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

    function hideModal(data : string) {
        offset2.value = withTiming(0, {
            duration: 300,
        });
        height.value = withTiming(200, {
            duration: 200
        })
        setTimeout(() => {
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
                        <Pressable className='h-full w-full' onPress={() => props.hideModal()}></Pressable>
                    </Animated.View>
                    <Animated.View style={[styles.centeredView, animatedStyle2]}>
                        <View className='flex flex-col bg-white' style={styles.modalView}>
                            <Text className='text-center'>Select Loan Start Month</Text>
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
