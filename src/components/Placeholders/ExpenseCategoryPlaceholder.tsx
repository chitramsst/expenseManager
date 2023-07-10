import { View } from "react-native";
import PlaceHolderBase from "./PlaceholderBase";

export default function ExpenseCategoryPlaceholder() {
    let views = []
   
    for (let i = 0; i < 5; i++) {
        views.push(
            <View className='flex flex-col justify-center items-center px-[7px] mb-6' key={i}>
                <PlaceHolderBase height={72} width={72} style={{ borderRadius : 20, marginHorizontal : 4}} />
                <PlaceHolderBase height={8} width={40} style={{ borderRadius : 10, marginTop : 10}} />
            </View>
        )
    }
    return views
}

// className="h-[74px] w-[74px] bg-[#F6AB65] flex flex-col justify-center items-center rounded-3xl mx-1"