import { View, Text } from "react-native";
import {sync} from '../database/sync';
import { hasUnsyncedChanges } from '@nozbe/watermelondb/sync'
import { useEffect, useState } from "react";

export default function Synchronizer({ children }: any) {
    const [syncState, setSyncState] = useState<string>('Syncing data...');
    let timeout : any = null;
    useEffect(() => {
        timeout = setInterval(() => {
            checkUnSyncedChanges()
        },10000)
    },[]);

    async function checkUnSyncedChanges() {
        console.log('SYNC: SYNC STARTED!')
        sync()
        .then(() => setSyncState(''))
        .catch((e) => {
            setSyncState('Sync failed!')
            console.log('SYNC FAILED!')
           
        });
  }

    return (
        <>
            {children}
        </>
    );
}
