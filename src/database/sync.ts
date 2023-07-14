
import {synchronize} from '@nozbe/watermelondb/sync';
import database from './index';
import axios from 'axios';
// your_local_machine_ip_address usually looks like 192.168.0.x
// on *nix system, you would find it out by running the ifconfig command

export async function sync() {
  await synchronize({
    database,
    pullChanges: async ({lastPulledAt}) => {
        console.log('CHECKING SERVER')
        let response : any = null;
        await axios.get('/user/sync',{params : {lastPulledAt}}).then((response2) => {
            response = response2.data;
        })
        let changes = response.changes;
        let timestamp = response.timestamp;
        console.log('SERVER CHECK DONE')
        return {changes, timestamp};
    },
    pushChanges: async ({changes, lastPulledAt}) => {
        console.log('CHANGES!', changes)
        await axios.post('/user/sync',{params : {lastPulledAt}, changes}).then((response) => {
        }).catch((e) => {
            console.log(e)
            throw new Error(e);
        })
    },
  });
}