import React, { useState, useEffect } from 'react';

import { Text, StyleSheet, Button, View, StatusBar, ScrollView, ActivityIndicator, Image, ImageBackground, Dimensions, Pressable, DeviceEventEmitter } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../assets/globalstyles';
import { FlatList, RefreshControl, TextInput } from 'react-native-gesture-handler';
import { WHITE } from '../../assets/colors';
import {  PlusIcon } from 'react-native-heroicons/outline'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import stringLimit from '../../utlities/stringLimit';
import {icons,Icon} from '../../data/expenseCategoryIcons';
import ExpenseCategoryPlaceholder from '../../components/Placeholders/ExpenseCategoryPlaceholder';
import { observeCategory } from '../../database/helpers/CategoryHelper';

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
  const [dimensions, setDimensions] = useState(0)
  useFocusEffect(
    React.useCallback(() => {
      getData()
      setDimensions(Dimensions.get('window').width)
      DeviceEventEmitter.addListener('synchronizer',(message) => {
        getData()
      })
      return () => {
        DeviceEventEmitter.removeAllListeners('synchronizer')
      }
    }, [])
  );

  useEffect(() => {
  }, [])
  async function getData() {
    setRefreshing(true)
    observeCategory().subscribe((items) => {
      setCategories(items)
    })
    setRefreshing(false)
  }

  function editItem(item :any)
  {
    navigation.navigate('Edit Expense Category',{item : item._raw})
  }
  return (
    <SafeAreaView style={GlobalStyles.mainScreenContainer}>
      <View className='' style={styles.container} >
        {refreshing && 
           <View className='flex flex-row flex-wrap mt-3 ' style={{paddingHorizontal: 8.29}}>
              <ExpenseCategoryPlaceholder/>
          </View>
        }
        { 
          !refreshing && (
              <FlatList className='mt-3 h-full pb-20   '
              contentContainerStyle={{ paddingBottom: 10 }}
              data={categories}
              numColumns={4}
              scrollEnabled={true}
              refreshControl={(<RefreshControl refreshing={refreshing} onRefresh={() => (getData())} />)}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              columnWrapperStyle={{  }}
              renderItem={({ item }) => (
                <View className='' key={item.id} style={{width : (dimensions/4) }}>
                  <Pressable android_ripple={{color : icons[item.icon_number - 1].color +'60', borderless : true}} className='flex flex-col justify-center items-center' onPress={ () => {editItem(item)}}> 
                    <View className='h-[74px] w-[74px] bg-[#F6AB65] flex flex-col justify-center items-center rounded-3xl' style={{ backgroundColor: icons[item.icon_number - 1].color  }}>
                      <Image source={icons[item.icon_number - 1].icon} className='w-8 h-8'></Image>
                    </View>
                    <Text className='text-center mt-2 w-28 text-xs text-[#9DB2CE] '>{stringLimit(item.title,18 )}</Text>
                  </Pressable>
                </View>
              )
              }>
            </FlatList>
          )
        }
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