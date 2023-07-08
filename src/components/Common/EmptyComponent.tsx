import { View , Image, Text } from "react-native";

export default function EmptyComponent({text = '' , title = ''}) {
    return (
        <View className='flex justify-center items-center w-full h-[75%]'>
            <Image source={require('../../assets/images/Backgrounds/not_found.png')}/>
            <Text className="font-bold text-xl text-black my-3">{title}</Text>
            <Text className="text-center text-[#9DB2CE] tracking-wide w-[90%] leading-5">
                {text}
            </Text>
        </View>
    )
}