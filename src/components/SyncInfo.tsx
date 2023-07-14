
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SyncInfo({  }: any) {
    const [syncState, setSyncState] = useState<string>('Syncing data...');
    let timeout : any = null;
    const isSyncing = useSelector((state) => state.appSlice.isSyncing);
    console.log(isSyncing)
    useEffect(() => {
    },[]);
    if(isSyncing && isSyncing != 'DONE' && isSyncing != 'NO')
    {
        return (
            <View className="bg-blue-500 opacity-80 p-2 py-1 absolute bottom-20 right-6 rounded-lg">
                 <Text className="text-xs text-white">{isSyncing}</Text>
            </View>
         );
    }
    else{
        return (
            <></>
         );
    }
}
