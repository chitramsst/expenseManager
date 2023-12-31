import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, View, ActivityIndicator } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function LoaderModal(props: any) {
    const [modalVisible, setModalVisible] = useState(false);
    const [count, setCount] = useState(1);
    const offset2 = useSharedValue(0);
    const height = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: (offset2.value)
        };
    });
    const animatedStyle2 = useAnimatedStyle(() => {
        return {
            opacity: (height.value),
            transform: [{ scale: height.value }]
        };
    });

    function hideModal() {
        offset2.value = withTiming(0, {
            duration: 300,
        });
        height.value = withTiming(0, {
            duration: 200
        })
        setTimeout(() => {
            props.hideModal();
        }, 100)
    }

    function startShowAnimations() {
        offset2.value = withTiming(1, {
            duration: 500,
        });
        height.value = withTiming(1, {
            duration: 300
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
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <Animated.View className={'h-screen w-screen absolute top-0 bg-black/40'} style={animatedStyle}>
                    </Animated.View>
                    <Animated.View style={[styles.centeredView, animatedStyle2]}>
                        <ActivityIndicator size={'large'} style={{width : 40 , height : 40}} color={'white'}/>
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
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: '90%',
        paddingHorizontal: 10,
        width: '100%',

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
