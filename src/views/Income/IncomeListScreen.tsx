import React, { useState, useEffect, useCallback } from 'react';

import { Text, StyleSheet, Button, View, StatusBar, ScrollView, ActivityIndicator, Image, ImageBackground, Dimensions, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../assets/globalstyles';
import { TextInput } from 'react-native-gesture-handler';
import NotificationIcon from '../../assets/Icons/NotificationIcon';
import { WHITE } from '../../assets/colors';
import { MagnifyingGlassIcon, PlusIcon } from 'react-native-heroicons/outline'
import axios from 'axios';
import moment from 'moment'
interface ScreenProps {
  navigation: any
}

interface HomeState {
  count: number;
}
function IncomeList({ items }) {
  return (
    items.map((x, i) => {
      return <IncomeItem key={i} item={x} />
    })
  )
}
function IncomeItem({ item }) {
  return (
    <View className='flex flex-row justify-between mt-3'>
      <View className='flex flex-row '>
        <View className='h-10 w-10 bg-[#89D9BC] flex justify-center items-center rounded-lg'>
          <Text className='text-white text-xl font-bold'>{moment(item.date).format('d')}</Text>
        </View>
        <View className='flex flex-col gap-1 ml-2'>
          <Text className='font-bold text-black text-md'>{item.title}</Text>
          <Text className='text-[#9DB2CE] text-xs'>{item.description} </Text>
        </View>
      </View>
      <View className='flex flex-row '>
        <View className='flex flex-col gap-1 ml-3 items-end'>
          <Text className='font-bold text-black text-md'>+$ {item.amount}<Text className='text-[#9DB2CE]'>.00</Text></Text>
          <Text className='text-[#9DB2CE] text-xs'>{moment(item.date).format('LL')}</Text>
        </View>
      </View>
    </View>
  )
}

export default function IncomeListScreen({ navigation }: ScreenProps) {
  const [itemList, setItemList] = useState({})
  const [originalList, setOriginalList] = useState({})
  const [search, setSearch] = useState('')

  function getItems() {

      axios.get('/user/income/get-income').then((response) => {
        if (response.data.success == true) {
          setOriginalList(response.data.data)
          handleSearchChange('')
        }
      })

  }
  let cloned = JSON.parse(JSON.stringify(itemList))
  let filteredList = {}
  function handleSearchChange(text: string) {
    setSearch(text)
    let mytext = text;
    let obj = {}
    Object.keys(originalList).forEach((y, i) => {
      console.log(mytext)
      obj[y] = originalList[y].filter((x) => {
        if (search.trim() == '') {
          return x
        }
        else {
          return x.title.includes(mytext)
        }
      })
    })
    filteredList = obj
    setItemList(obj)
  }
  useEffect(() => {
    getItems()
  }, [])
  return (
    <SafeAreaView style={GlobalStyles.mainScreenContainer}>
      <View className='' style={styles.container} >
        <View className='px-4'>
          <View className='flex flex-row bg-[#F3F6FD] px-3 py-1 rounded-2xl items-center '>
            <MagnifyingGlassIcon color={'#9DB2CE'} size={20} />
            <TextInput placeholder="Search" className='ml-2 flex w-full text-black' placeholderTextColor="#9DB2CE" hitSlop={100} onChangeText={(text) => { handleSearchChange(text) }} />
          </View>
        </View>

        <ScrollView className='flex flex-col mt-3 h-full pb-20' contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 20 }}>
          {Object.keys(itemList).map((x, i) => {
            return (
              <>
                {itemList[x].length > 0 && <Text className='text-[#9DB2CE] font-bold mt-3' key={i}>{x}</Text>}
                <IncomeList items={itemList[x]} key={i + 'income'} />
              </>
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