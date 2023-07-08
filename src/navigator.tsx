import { NavigationContainer, Route, useNavigationContainerRef } from '@react-navigation/native';
import { StackHeaderProps, createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HomeIcon from './assets/BottomBarIcons/Home'
import ExchangeIcon from './assets/BottomBarIcons/Exchange'
import HandIcon from './assets/BottomBarIcons/HandCoin'
import Wallet from './assets/BottomBarIcons/Wallet'
import Coin from './assets/BottomBarIcons/Coin'
import BackButtonIcon from './assets/Icons/BackButton'
const Tab = createMaterialTopTabNavigator();
import { useFlipper } from '@react-navigation/devtools';
const Stack = createStackNavigator()


import HomeScreen from './views/HomeScreen';
import IncomeListScreen from './views/Income/IncomeListScreen';
import LoginScreen from './views/Auth/LoginScreen';
import { Pressable, StatusBar, Text, View } from 'react-native';
import NotificationIcon from './assets/Icons/NotificationIcon';
import OtpScreen from './views/Auth/OtpScreen';
import RegisterScreen from './views/Auth/RegisterScreen';
import { loginStore } from "./stores/loginStore";

import { useSelector, useDispatch } from 'react-redux';
import AddIncomeScreen from './views/Income/AddIncomeScreen';
import ExpenseListScreen from './views/Expense/ExpenseListScreen';
import ExpenseAddScreen from './views/Expense/ExpenseAddScreen';
import ExpenseCategoryAddScreen from './views/Expense/ExpenseCategoryAddScreen';
import ProfileScreen from './views/Profile/ProfileScreen';
import axios from 'axios';
import EditIncomeScreen from './views/Income/EditIncomeScreen';
import ExpenseEditScreen from './views/Expense/ExpenseEditScreen';
import LoanListScreen from './views/Loans/LoanListScreen';
import LoanAddScreen from './views/Loans/LoanAddScreen';
import ExpenseCategoriesListScreen from './views/Categories/ExpenseCategoriesListScreen';
import ExpenseCategoriesEditScreen from './views/Categories/ExpenseCategoriesListEditScreen';

interface ExtendedRoute extends Route<string>{
    params : any
}

interface ExtendedProps extends StackHeaderProps {
    route: ExtendedRoute
}
interface RoutePropData {
    routeData: ExtendedProps
}
function LogoTitle({ routeData }: RoutePropData) {
    return (
        <View className='flex flex-row justify-between items-center bg-white p-4'>
            <Pressable hitSlop={30} onPress={({ }) => (routeData.navigation.goBack())}><BackButtonIcon /></Pressable>
            <Text className='text-black text-xl font-bold '>{routeData.route.params?.customName ? routeData.route.params.customName :  routeData.route.name}</Text>
            {
                // @ts-ignore
                routeData.route.params?.hideNotification != true ?
                     (
                        <Pressable className='flex flex-col justify-center relative '>
                            <View className='absolute h-4 w-4 bg-red-500 -top-1 -right-1 rounded-full z-10 flex justify-center items-center'>
                                <Text className='text-white text-xs '>1</Text>
                            </View>
                            <NotificationIcon />
                        </Pressable>
                    )
                    :
                    (<View></View>)
            }

        </View>
    );
}

// {useSelector((state) => { console.log(state); return <></> })}
function AuthStack() {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} options={{}} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} options={{}} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{}} />
        </Stack.Navigator>
    )
}

function ItemStack() {
    return (
        <Stack.Navigator screenOptions={{ header: (props) => (<LogoTitle routeData={(props as ExtendedProps)} />) }} >
            <Tab.Group>
                <Tab.Screen name="Income" component={IncomeListScreen} options={{}}  />
                <Tab.Screen name="Add Income" component={AddIncomeScreen} options={{}} initialParams={{ hideNotification: true }} />
                <Tab.Screen name="Edit Income" component={EditIncomeScreen} options={{}} initialParams={{ hideNotification: true }} />
            </Tab.Group>
            <Tab.Group>
                <Tab.Screen name="Expense" component={ExpenseListScreen} options={{}}  />
                <Tab.Screen name="Add Expense" component={ExpenseAddScreen} options={{}}  initialParams={{ hideNotification: true }}  />
                <Tab.Screen name="Edit Expense" component={ExpenseEditScreen} options={{}}  initialParams={{ hideNotification: true }} />
            </Tab.Group>
            <Tab.Group>
                <Tab.Screen name="Profile" component={ProfileScreen} options={{}}  />
            </Tab.Group>
            <Tab.Group>
                <Tab.Screen name="Loan" component={LoanListScreen} options={{}}  />
                <Tab.Screen name="Add Loan" component={LoanAddScreen} options={{}} initialParams={{ hideNotification: true }}  />
            </Tab.Group>
            <Tab.Group>
                <Tab.Screen name="Expense Category" component={ExpenseCategoriesListScreen} options={{}} initialParams={{ hideNotification: true }} />
            </Tab.Group>
            <Stack.Group screenOptions={{presentation : 'modal'}}>
                {/* @ts-ignore */}
                <Tab.Screen  name="Add Expense Category" component={ExpenseCategoryAddScreen} options={{}}  initialParams={{ hideNotification: true, customName : 'Add Category' }} />
                <Tab.Screen  name="Edit Expense Category" component={ExpenseCategoriesEditScreen} options={{}}  initialParams={{ hideNotification: true, customName : 'Edit Category' }} />
            </Stack.Group>
        </Stack.Navigator>
    )
}
function BottomBarComponent({ state, descriptors, navigation } : any)
{
    return (
        <View className=' bg-[#F3F6FD] flex justify-evenly flex-row py-5'>
            <Pressable onPress={() => {navigation.navigate('ItemStack',{screen : 'Income'})}}>
                <Coin color={'#9DB2CE'}></Coin>
            </Pressable>
            <Pressable onPress={() => {navigation.navigate('ItemStack',{screen : 'Expense'})}}>
                <Wallet color={'#9DB2CE'}></Wallet>
            </Pressable>
            <Pressable onPress={() => {navigation.navigate('ItemStack',{screen : 'Home'})}}>
                <HomeIcon color={'#5EACF9'}></HomeIcon>
                <View className='bg-[#5EACF9] h-1.5 w-1.5 rounded-full absolute -bottom-2 left-2'></View>
            </Pressable>
            <Pressable onPress={() => {navigation.navigate('ItemStack',{screen : 'Loan'})}}>
                <HandIcon color={'#9DB2CE'}></HandIcon>
            </Pressable>
            <Pressable>
                <ExchangeIcon color={'#9DB2CE'}></ExchangeIcon>
            </Pressable>
        </View>
    )
}
function HomeStack() {
    return (
        <Tab.Navigator  initialRouteName='Home' tabBar={props =>  <BottomBarComponent {...props}/>} tabBarPosition='bottom'>
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ focused, color }) => (focused ? <HomeIcon color={color} /> : <HomeIcon color={color} />) }} />
        </Tab.Navigator>
    )
}

function Navigator() {
    const navigationRef = useNavigationContainerRef();
    useFlipper(navigationRef);
    const store = useSelector((state: any) => state.store);
    axios.defaults.headers.common['Token'] = store.userInfo.token
    return (
        <NavigationContainer ref={navigationRef} >
            <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />
            {store.userInfo.token ? (
                <>
                    <Stack.Navigator initialRouteName={"HomeStack"} screenOptions={{ gestureResponseDistance: 20, gestureDirection: 'horizontal' }}>
                        <Stack.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
                        <Stack.Screen name="ItemStack" component={ItemStack} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </>
            )
                : (
                    <>
                        <Stack.Navigator initialRouteName={"AuthStack"} screenOptions={{ gestureResponseDistance: 20, gestureDirection: 'horizontal' }}>
                            <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
                        </Stack.Navigator>
                    </>
                )
            }

        </NavigationContainer>
    )
}

export default Navigator; 