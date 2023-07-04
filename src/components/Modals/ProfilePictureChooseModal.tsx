import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

export default function ProfilePictureChooseModal(props: any) {
    const [dragging, setDragging] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const offset2 = useSharedValue(0);
    const height = useSharedValue(200);

    function handleDrag(e: any) {
        console.log(e.evt)
        setDragging(true)
    }

    function stopDrag(e: any) {
        setDragging(false)
    }

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
        height.value = withTiming(200, {
            duration: 200
        })
        setTimeout(() => {
            props.hideModal();
        }, 200)
    }

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

            <View style={[styles.centeredView]} onTouchMove={handleDrag} onTouchEnd={stopDrag}>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={props.show}
                    onShow={() => {
                        startShowAnimations()
                    }}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <Animated.View className={'h-screen w-screen absolute top-0 bg-black/40'} style={animatedStyle}>
                    </Animated.View>
                    <Animated.View style={[styles.centeredView, animatedStyle2]}>
                        <View className='flex flex-col bg-white' style={styles.modalView}>
                            <Pressable className='flex justify-center items-center p-8 border-b border-black/10'><Text className='text-black'>Camera</Text></Pressable>
                            <Pressable className='flex justify-center items-center p-8 border-b border-black/10'><Text className='text-black'>Choose From Album</Text></Pressable>
                            <Pressable className='flex justify-center items-center p-8 border-black/10'   onPress={() => { hideModal() }}><Text className='text-[#FF0000]'>Cancel</Text></Pressable>
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
