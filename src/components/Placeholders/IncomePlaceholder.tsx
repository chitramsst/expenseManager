import { View } from "react-native";
import PlaceHolderBase from "./PlaceholderBase";

export default function IncomePlaceholder() {
    let views = []
    views.push(<View className="px-3 pt-6 pb-0" key={'placeholder-main'}>
        <PlaceHolderBase width={100} height={12} style={{ backgroundColor: 'rgba(0, 0, 0, 0.34)', borderRadius: 10 }} />
    </View>)
    for (let i = 0; i < 5; i++) {
        views.push(
            <View className='flex flex-row justify-between mt-3 bg-white pr-2 px-4 pt-1' key={i}>
                <View className="flex flex-row ">
                    <PlaceHolderBase width={38} height={38} style={{ backgroundColor: 'rgba(0, 0, 0, 0.48)', borderRadius: 10 }} />
                    <View className="flex flex-col justify-between px-3 py-1.5">
                        <PlaceHolderBase width={150} height={10} style={{ backgroundColor: 'rgba(0, 0, 0, 0.34)', borderRadius: 10 }} />
                        <PlaceHolderBase width={100} height={10} style={{ backgroundColor: 'rgba(0, 0, 0, 0.34)', borderRadius: 10 }} />
                    </View>
                </View>
                <View className="flex flex-col justify-between py-2 items-end">
                    <PlaceHolderBase width={50} height={8} style={{ backgroundColor: 'rgba(0, 0, 0, 0.60)', borderRadius: 10 }} />
                    <PlaceHolderBase width={80} height={8} style={{ backgroundColor: 'rgba(0, 0, 0, 0.34)', borderRadius: 10 }} />
                </View>
            </View>
        )
    }
    return views
}