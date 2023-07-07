import React, { useState} from 'react';

import { Text, StyleSheet, View, ScrollView, Dimensions, Pressable, RefreshControl } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../assets/globalstyles';
import { TextInput } from 'react-native-gesture-handler';
import { WHITE } from '../../assets/colors';
import { MagnifyingGlassIcon, PlusIcon } from 'react-native-heroicons/outline'
import axios from 'axios';
import moment from 'moment'
import { Income } from '../../interfaces';
import stringLimit from '../../utlities/stringLimit';
interface ScreenProps {
  navigation: any
}

interface IncomeData{
  [key: string]: Array<Income>; 
}

interface IncomeDataProps{
  items: Array<Income>; 
}

function IncomeList({ items } : IncomeDataProps) {
  return (
    items.map((income , index) => {
      return <IncomeItem key={index} item={income} />
    })
  )
}

function IncomeItem({ item } : any) {
  return (
    <View className='flex flex-row justify-between mt-3'>
      <View className='flex flex-row '>
        <View className='h-10 w-10 bg-[#89D9BC] flex justify-center items-center rounded-lg'>
          <Text className='text-white text-xl font-bold'>{moment(item.date).format('d')}</Text>
        </View>
        <View className='flex flex-col gap-1 ml-2'>
          <Text className='font-bold text-black text-md'>{item.title}</Text>
          <Text className='text-[#9DB2CE] text-xs'>{ stringLimit(item.description,20)} </Text>
        </View>
      </View>
      <View className='flex flex-row '>
        <View className='flex flex-col gap-1 ml-3 items-end'>
          <Text className='font-bold text-black text-md'>+$ {Math.trunc(item.amount)}<Text className='text-[#9DB2CE]'>.{(item.amount).toFixed(2).split('.')[1]}</Text></Text>
          <Text className='text-[#9DB2CE] text-xs'>{moment(item.date).format('LL')}</Text>
        </View>
      </View>
    </View>
  )
}

export default function IncomeListScreen({ navigation }: ScreenProps) {
  const [itemList, setItemList] = useState<any>({})
  const [originalList, setOriginalList] = useState<any>({})
  const [search, setSearch] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  //Run when navigated to the route
  useFocusEffect(
    React.useCallback(() => {
      getItems()
    }, [])
  );

  //Get Data From API
  function getItems() {
    setRefreshing(true)
      axios.get('/user/income/get-income').then((response) => {
        if (response.data.success == true) {
          setOriginalList(response.data.data)
          //pass original data to filter because above set state is asynchronous and changes wont be shown in handleSearchChange
          handleSearchChange('',response.data.data)
          setRefreshing(false)
        }
      })
  }

  //Compute data filter
  function filterData(text : string,preload : null | IncomeData) {
    let mytext = text;
    let obj :any = {}
    let currentList : IncomeData = preload ? preload : originalList
    Object.keys(currentList).forEach((y, i) => {
      obj[y] = currentList[y].filter((income : Income) => {
        if (search.trim() == '') {
          return income
        }
        else {
          return income.title.toLowerCase().includes(mytext.toLowerCase())
        }
      })
    })
    setItemList(obj)
  }

  //Handle search input
  function handleSearchChange(text: string,preload : null | IncomeData = null) {
    setSearch(text)
    filterData(text,preload)
  }

  return (
    <SafeAreaView style={GlobalStyles.mainScreenContainer}>
      <View className='' style={styles.container} >
        <View className='px-4'>
          <View className='flex flex-row bg-[#F3F6FD] px-3 py-1 rounded-2xl items-center '>
            <MagnifyingGlassIcon color={'#9DB2CE'} size={20} />
            <TextInput placeholder="Search" className='ml-2 flex w-full text-black' placeholderTextColor="#9DB2CE" hitSlop={100} onChangeText={(text) => { handleSearchChange(text) }} />
          </View>
        </View>

        <ScrollView className='flex flex-col mt-3 h-full pb-20' contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 20 }} refreshControl={(<RefreshControl refreshing={refreshing} onRefresh={() => (getItems())} />)} >
          {Object.keys(itemList).map((x, i) => {
            return (
              <View key={i}>
                {itemList[x].length > 0 && <Text className='text-[#9DB2CE] font-bold mt-3' key={i}>{x}</Text>}
                <IncomeList items={itemList[x]} key={i + 'income'} />
              </View>
            )
          })}
        </ScrollView>
        <Pressable onPress={() => { navigation.navigate('Add Income') }} className='absolute bottom-5 bg-[#3195F7] rounded-full flex justify-center items-center ' style={{ width: 60, height: 60, left: ((Dimensions.get('window').width / 2) - 30) }}>
          <PlusIcon color={'#ffffff'} size={30} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: WHITE
  }
})