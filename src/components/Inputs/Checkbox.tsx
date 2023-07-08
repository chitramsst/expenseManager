import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { CheckIcon } from "react-native-heroicons/solid";

export default function Checkbox({ onChange , value , label = '', boxValue  } : any) {
    const [ticked,setTicked] = useState(false)
    useEffect(() => {
        if(boxValue  == value )
        {
            setTicked(true)
        }
        else{
            setTicked(false)
        }
    },[value])
    const toggleTick = () => {
        if(ticked == true)
        {
            try{
                onChange(boxValue )
            }
            catch(e)
            {
                console.warn('No change event connected')
            }
        }
        else{
            try{
                onChange(boxValue )
            }
            catch(e)
            {
                console.warn('No change event connected')
            }
        }
    }
    return (
        <Pressable className="flex flex-row" onPress={() => {toggleTick()}} hitSlop={25}>
            <View className={`rounded-full h-5 w-5 border flex justify-center items-center ${ticked ? 'border-transparent bg-[#3195F7]' : 'border-[#9DB2CE]'}`} > 
                {ticked && <CheckIcon color={'white'} size={12}/>}
            </View>
            <Text className={`ml-2 ${ticked ? 'text-black' : 'text-[#9DB2CE]'} `}>{label}</Text>
        </Pressable>
        
    )
}
