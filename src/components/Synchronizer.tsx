import { View, Text, DeviceEventEmitter } from "react-native";
import {sync} from '../database/sync';
import { hasUnsyncedChanges } from '@nozbe/watermelondb/sync'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSyncing } from "../stores/slices/appSlice";
import database from "../database";

export default function Synchronizer({ children }: any) {
  const dispatch = useDispatch();

  const [syncState, setSyncState] = useState<string>('Syncing data...');
    let timeout : any = null;
    useEffect(() => {
        timeout = setInterval(() => {
            checkUnSyncedChanges()
        },10000)
    },[]);

    async function checkUnSyncedChanges() {
        let hasChanges=  await hasUnsyncedChanges({database})
        dispatch(setSyncing('NO'))
        if(hasChanges)
        {
            dispatch(setSyncing('SYNCING'))
        }
        console.log('SYNC: SYNC STARTED!')
        sync()
        .then(() => {
            if(hasChanges)
            {
                DeviceEventEmitter.emit('synchronizer','success')
            }
            dispatch(setSyncing('DONE'))
            setSyncState('')
        })
        .catch((e) => {
            setSyncState('Sync failed!')
            console.log('SYNC FAILED!')
            dispatch(setSyncing('FAIL'))
        });
    }

    return (
        <>
            {children}
        </>
    );
}
