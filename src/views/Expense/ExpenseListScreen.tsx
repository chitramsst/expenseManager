import React, { useState, useEffect, useRef } from 'react';

import { Text, StyleSheet, View, ScrollView, Dimensions, Pressable, RefreshControl, Alert, Image, FlatList } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../assets/globalstyles';
import { Swipeable, TextInput } from 'react-native-gesture-handler';
import NotificationIcon from '../../assets/Icons/NotificationIcon';
import { WHITE } from '../../assets/colors';
import { MagnifyingGlassIcon, PlusIcon } from 'react-native-heroicons/outline'
import { Expense } from '../../interfaces';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { PencilIcon, TrashIcon } from 'react-native-heroicons/solid';
import { icons } from '../../data/expenseCategoryIcons';
import moment from 'moment';
import EmptyComponent from '../../components/Common/EmptyComponent';
import ExpensePlaceholder from '../../components/Placeholders/ExpensePlaceholder';
interface ScreenProps {
  navigation: any
}

interface HomeState {
  count: number;
}

interface ExpenseData{
  [key: string]: Array<Expense>; 
}




interface ExpenseDataProps{
  items: Array<Expense>; 
  performActionCallback : Function;
}

function ExpenseList({ items,performActionCallback } : ExpenseDataProps) {
  return (
    items.map((income , index) => {
      return <ExpenseItem key={income.id} item={income} performActionCallback={performActionCallback}/>
    })
  )
}
interface LeftActionProps{
  item : Expense;
  performActionCallback : Function
}
function LeftAction({item,performActionCallback} : LeftActionProps)
{
  return (
    <View className='pt-3 '>
        <View className=' w-full h-full  rounded-lg  flex flex-row  items-center overflow-clip'>
          <Pressable onPress={() => {performActionCallback('EDIT',item)}}>
            <View className='flex flex-row items-center bg-blue-500 h-full w-full px-5'>
              <PencilIcon color={'white'} size={15}/>
              <Text className='pl-2 text-white text-xs font-bold'>Edit</Text>
            </View>
          </Pressable>
          <Pressable className='' onPress={() => {performActionCallback('DELETE',item)}}>
            <View className='flex flex-row items-center bg-red-500 h-full px-4'>
              <TrashIcon color={'white'} size={15}/>
              <Text className='pl-2 text-white text-xs font-bold'>Delete</Text>
            </View>
          </Pressable>
        </View>
    </View>
  )
}


function ExpenseItem({ item,performActionCallback } : any) {
  const swipeableRef = useRef<any>(null);
  return (
    <Swipeable ref={swipeableRef} renderRightActions={() => <LeftAction item={item} performActionCallback={(action : any,item : Expense) => { performActionCallback(action,item); swipeableRef.current.close()}} />}>
    <View className='flex flex-row justify-between mt-3 bg-white pr-2'>
      <View className='flex flex-row '>
        <View className='h-12 w-12 bg-[#F6AB65] flex justify-center items-center rounded-2xl' style={{ backgroundColor: icons[item.category?.icon_number - 1].color }}>
          <Image source={icons[item.category?.icon_number - 1].icon} className='w-6 h-6'></Image>
        </View>
        <View className='flex flex-col justify-between py-2 ml-2'>
          <Text className='font-semibold text-black text-md'>{item.title}</Text>
          <Text className='text-[#9DB2CE] text-xs'>{item.category?.title}</Text>
        </View>
      </View>
      <View className='flex flex-row '>
          <View className='flex flex-col gap-1 ml-3 items-end'>
            <Text className='font-bold text-black text-md'>-$ {Math.trunc(item.amount)}<Text className='text-[#9DB2CE]'>.{(item.amount).toFixed(2).split('.')[1]}</Text></Text>
            <Text className='text-[#9DB2CE] text-xs'>{moment(item.date).format('LL')}</Text>
          </View>
        </View>
    </View>
    </Swipeable>
  )
}

export default function ExpenseListScreen({ navigation }: ScreenProps) {
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
    axios.get('/user/expense/get-expense').then((response) => {
      if (response.data.success == true) {
        setOriginalList(response.data.data)
        //pass original data to filter because above set state is asynchronous and changes wont be shown in handleSearchChange
        handleSearchChange('', response.data.data)
        setRefreshing(false)
      }
    })
  }

  //Compute data filter
  function filterData(text: string, preload: null | ExpenseData) {
    let mytext = text;
    let obj: any = {}
    let currentList: ExpenseData = preload ? preload : originalList
    Object.keys(currentList).forEach((y, i) => {
      obj[y] = currentList[y].filter((expense: Expense) => {
        if (search.trim() == '') {
          return expense
        }
        else {
          return expense.title.toLowerCase().includes(mytext.toLowerCase())
        }
      })
    })
    setItemList(obj)
  }

  //Handle search input
  function handleSearchChange(text: string, preload: null | ExpenseData = null) {
    setSearch(text)
    filterData(text, preload)
  }

  function deleteItemFromList(item: Expense) {
    let obj: any = {}
    let currentList: ExpenseData = originalList
    Object.keys(currentList).forEach((y, i) => {
      let index = currentList[y].findIndex((expense: Expense) => expense.id == item.id)
      if (index != -1) {
        currentList[y].splice(index, 1)
      }
      obj[y] = currentList[y]
      if(currentList[y].length == 0)
      {
        delete obj[y]
      }
    })
    setOriginalList(obj)
    handleSearchChange(search, obj)
  }

  //handle delete
  function performAction(action: 'EDIT' | 'DELETE', item: Expense) {
    if (action == 'DELETE') {
      Alert.alert('Delete Confirmation', 'Are you sure you want to delete this expense?', [
        {
          text: 'No',
          onPress: () => {
            //Safely Cancel

          },
          style: 'cancel',
        },
        {
          text: 'Yes', onPress: () => {
            //Delete Item Here
            axios.get('/user/expense/delete/' + item.id).then((response) => {
              if (response.data.success == true) {
                deleteItemFromList(item)
              }
            })
          }
        },
      ]);
    }
    if (action == 'EDIT') {
      navigation.navigate('Edit Expense', { item: item })
    }
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
        {
          refreshing && <ExpensePlaceholder/>
        }
        {
          (Object.keys(itemList).length > 0 && !refreshing) && (
            <FlatList className='flex flex-col mt-3 px-4' contentContainerStyle={{paddingBottom : 20}} data={Object.keys(itemList)}  refreshControl={(<RefreshControl refreshing={refreshing} onRefresh={() => (getItems())} />)} 
              renderItem={({item,index}) => {
              return (
              <View>
                {itemList[item].length > 0 && <Text className='text-[#9DB2CE] font-bold mt-3' key={item}>{item}</Text>}
                  <ExpenseList items={itemList[item]} key={item + 'expense'} performActionCallback={performAction}/>
              </View>
              )}}
            >
            </FlatList>
          )
        }
      {
          (Object.keys(itemList).length <= 0 && !refreshing) && (
            <EmptyComponent title="No Expense Recorded" text="Begin tracking your expenses by adding your spending. Tap the '+' button to record your expenses and gain insights into your financial habits."/>
          )
        }
        <Pressable onPress={() => { navigation.navigate('Add Expense') }} className='absolute bottom-5 bg-[#3195F7] rounded-full flex justify-center items-center ' style={{ width: 60, height: 60, left: ((Dimensions.get('window').width / 2) - 30) }}>
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