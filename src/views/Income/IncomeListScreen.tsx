import React, { useRef, useState } from 'react';

import { Text, StyleSheet, View, ScrollView, Dimensions, Pressable, RefreshControl, Alert, FlatList } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../assets/globalstyles';
import { Swipeable, TextInput } from 'react-native-gesture-handler';
import { WHITE } from '../../assets/colors';
import { MagnifyingGlassIcon, PlusIcon } from 'react-native-heroicons/outline'
import axios from 'axios';
import moment from 'moment'
import { Income } from '../../interfaces';
import stringLimit from '../../utlities/stringLimit';
import { PencilIcon, TrashIcon } from 'react-native-heroicons/solid';
import EmptyComponent from '../../components/Common/EmptyComponent';
import IncomePlaceholder from '../../components/Placeholders/IncomePlaceholder';
import database from '../../database';
import { deleteIncome } from '../../database/helpers/IncomeHelper';


interface ScreenProps {
  navigation: any
}

interface IncomeData {
  [key: string]: Array<Income>;
}

interface IncomeDataProps {
  items: Array<Income>;
  performActionCallback: Function;
}

function IncomeList({ items, performActionCallback }: IncomeDataProps) {
  return (
    items.map((income, index) => {
      return <IncomeItem key={income.id} item={income} performActionCallback={performActionCallback} />
    })
  )
}
interface LeftActionProps {
  item: Income;
  performActionCallback: Function
}
function LeftAction({ item, performActionCallback }: LeftActionProps) {
  return (
    <View className='pt-3 '>
      <View className=' w-full h-full  rounded-lg  flex flex-row  items-center overflow-clip'>
        <Pressable onPress={() => { performActionCallback('EDIT', item) }}>
          <View className='flex flex-row items-center bg-blue-500 h-full w-full px-5'>
            <PencilIcon color={'white'} size={15} />
            <Text className='pl-2 text-white text-xs font-bold'>Edit</Text>
          </View>
        </Pressable>
        <Pressable className='' onPress={() => { performActionCallback('DELETE', item) }}>
          <View className='flex flex-row items-center bg-red-500 h-full px-4'>
            <TrashIcon color={'white'} size={15} />
            <Text className='pl-2 text-white text-xs font-bold'>Delete</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

function IncomeItem({ item, performActionCallback }: any) {
  const swipeableRef = useRef<any>(null);
  return (
    <Swipeable ref={swipeableRef} renderRightActions={() => <LeftAction item={item} performActionCallback={(action: any, item: Income) => { performActionCallback(action, item); swipeableRef.current.close() }} />}>
      <View className='flex flex-row justify-between mt-3 bg-white pr-2'>
        <View className='flex flex-row '>
          <View className='h-10 w-10 bg-[#89D9BC] flex justify-center items-center rounded-lg'>
            <Text className='text-white text-xl font-bold'>{moment(item.date).format('D')}</Text>
          </View>
          <View className='flex flex-col gap-1 ml-2'>
            <Text className='font-bold text-black text-md'>{item.title}</Text>
            <Text className='text-[#9DB2CE] text-xs'>{stringLimit(item.description, 20)} </Text>
          </View>
        </View>
        <View className='flex flex-row '>
          <View className='flex flex-col gap-1 ml-3 items-end'>
            <Text className='font-bold text-black text-md'>+$ {Math.trunc(item.amount)}<Text className='text-[#9DB2CE]'>.{(item.amount).toFixed(2).split('.')[1]}</Text></Text>
            <Text className='text-[#9DB2CE] text-xs'>{moment(item.date).format('LL')}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
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
  function getFromDB() {
    return new Promise(async (resolve) => {
      let myItems = await database.collections.get('incomes').query().fetch();
      resolve(myItems)
    })
  }
  //Get Data From API
  async function getItems() {
    setRefreshing(true)
    getFromDB().then((items) => {
    setRefreshing(false)
    // @ts-ignore
    const groups = items.reduce((groups : any, game : any) => {
      const date = moment(game._raw.date).format('MMMM MM');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(game._raw);
      return groups;
    }, {});
    setOriginalList(groups);
    handleSearchChange('',groups)
    })
   
  }

  //Compute data filter
  function filterData(text: string, preload: null | IncomeData) {
    let mytext = text;
    let obj: any = {}
    let currentList: IncomeData = preload ? preload : originalList
    Object.keys(currentList).forEach((y, i) => {
      obj[y] = currentList[y].filter((income: Income) => {
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
  function handleSearchChange(text: string, preload: null | IncomeData = null) {
    setSearch(text)
    filterData(text, preload)
  }

  function deleteItemFromList(item: Income) {
    let obj: any = {}
    let currentList: IncomeData = originalList
    Object.keys(currentList).forEach((y, i) => {
      let index = currentList[y].findIndex((income: Income) => income.id == item.id)
      if (index != -1) {
        currentList[y].splice(index, 1)
      }
      obj[y] = currentList[y]
      if (currentList[y].length == 0) {
        delete obj[y]
      }
    })
    setOriginalList(obj)
    handleSearchChange(search, obj)
  }

  //handle delete
  function performAction(action: 'EDIT' | 'DELETE', item: Income) {
    if (action == 'DELETE') {
      Alert.alert('Delete Confirmation', 'Are you sure you want to delete this income?', [
        {
          text: 'No',
          onPress: () => {
            //Safely Cancel

          },
          style: 'cancel',
        },
        {
          text: 'Yes', onPress: async () => {
            //Delete Item Here
            await deleteIncome(item)
            deleteItemFromList(item)
          }
        },
      ]);
    }
    if (action == 'EDIT') {
      navigation.navigate('Edit Income', { item: item })
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
          refreshing && <IncomePlaceholder />
        }
        {
          (Object.keys(itemList).length > 0 && !refreshing) && (
            <FlatList className='flex flex-col mt-3 px-4' contentContainerStyle={{ paddingBottom: 20 }} data={Object.keys(itemList)} refreshControl={(<RefreshControl refreshing={refreshing} onRefresh={() => (getItems())} />)}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    {itemList[item].length > 0 && <Text className='text-[#9DB2CE] font-bold mt-3' key={item}>{item}</Text>}
                    <IncomeList items={itemList[item]} key={item + 'income'} performActionCallback={performAction} />
                  </View>
                )
              }}
            >
            </FlatList>
          )
        }
        {
          (Object.keys(itemList).length <= 0 && !refreshing) && (
            <EmptyComponent title="No Income Recorded" text="Start tracking your income by adding your earnings. Tap the '+' button to record your income transactions and stay on top of your finances." />
          )
        }
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