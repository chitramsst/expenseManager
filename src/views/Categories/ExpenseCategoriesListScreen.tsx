import React, { useState, useEffect } from 'react';

import { Text, StyleSheet, Button, View, StatusBar, ScrollView, ActivityIndicator, Image, ImageBackground, Dimensions, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../assets/globalstyles';
import { FlatList, RefreshControl, TextInput } from 'react-native-gesture-handler';
import NotificationIcon from '../../assets/Icons/NotificationIcon';
import { WHITE } from '../../assets/colors';
import { MagnifyingGlassIcon, PlusIcon, ChevronRightIcon } from 'react-native-heroicons/outline'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import stringLimit from '../../utlities/stringLimit';
import {icons,Icon} from '../../data/expenseCategoryIcons';

interface ScreenProps {
  navigation: any
}

interface HomeState {
  count: number;
}


export default function ExpenseCategoriesListScreen({ navigation }: ScreenProps) {
  const [categories, setCategories] = useState<Array<any>>([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  useFocusEffect(
    React.useCallback(() => {
      getData()
    }, [])
  );

  useEffect(() => {
  }, [])
  async function getData() {
    setRefreshing(true)
    return axios.get('/user/expense/get-categories').then((response) => {
      if (response.data.success == true) {
        setCategories(response.data.data)
      }
      setRefreshing(false)
    })
  }

  function editItem(item :any)
  {
    navigation.navigate('Edit Expense Category',{item})
  }
  return (
    <SafeAreaView style={GlobalStyles.mainScreenContainer}>
      <View className='' style={styles.container} >
        <FlatList className='mt-3 h-full pb-20 flex flex-row'
          contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 10 }}
          data={categories}
          numColumns={4}
          refreshControl={(<RefreshControl refreshing={refreshing} onRefresh={() => (getData())} />)}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          columnWrapperStyle={{  }}
          renderItem={({ item }) => (
            <View className='w-[94px]'>
              <Pressable android_ripple={{color : icons[item.icon_number - 1].color +'60', borderless : true}} className='flex flex-col justify-center items-center' onPress={ () => {editItem(item)}}> 
                <View className='h-[74px] w-[74px] bg-[#F6AB65] flex flex-col justify-center items-center rounded-3xl' style={{ backgroundColor: icons[item.icon_number - 1].color  }}>
                  <Image source={icons[item.icon_number - 1].icon} className='w-8 h-8'></Image>
                </View>
                <Text className='text-center mt-2 w-28 text-xs text-[#9DB2CE] '>{stringLimit(item.title,20 )}</Text>
              </Pressable>
            </View>
          )
          }>
        </FlatList>
        <Pressable onPress={() => { navigation.navigate('Add Expense Category') }} className='absolute bottom-5 bg-[#3195F7] rounded-full flex justify-center items-center ' style={{ width: 60, height: 60, left: ((Dimensions.get('window').width / 2) - 30) }}>
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