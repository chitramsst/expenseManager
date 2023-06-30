import { NavigationContainer } from '@react-navigation/native';
import { StackHeaderProps, createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeIcon from './assets/BottomBarIcons/Home'
import ExchangeIcon from './assets/BottomBarIcons/Exchange'
import HandIcon from './assets/BottomBarIcons/HandCoin'
import Wallet from './assets/BottomBarIcons/Wallet'
import Coin from './assets/BottomBarIcons/Coin'
import BackButtonIcon from './assets/Icons/BackButton'
const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator()


import HomeScreen from './views/HomeScreen';
import IncomeListScreen from './views/Income/IncomeListScreen';
import { Pressable, StatusBar, Text, View } from 'react-native';
import NotificationIcon from './assets/Icons/NotificationIcon';

interface RoutePropData {
    routeData: StackHeaderProps
}
function LogoTitle({ routeData }: RoutePropData) {
    return (
        <View className='flex flex-row justify-between items-center bg-white p-4'>
            <Pressable  hitSlop={30} onPress={({}) => (routeData.navigation.goBack())}><BackButtonIcon /></Pressable>
            <Text className='text-black text-xl font-bold '>{routeData.route.name}</Text>
            <Pressable className='flex flex-col justify-center relative '>
                <View className='absolute h-4 w-4 bg-red-500 -top-1 -right-1 rounded-full z-10 flex justify-center items-center'>
                    <Text className='text-white text-xs '>1</Text>
                </View>
                <NotificationIcon />
            </Pressable>
        </View>
    );
}

function IncomeStack() {
    return (
        <Stack.Navigator screenOptions={{ header: (props) => (<LogoTitle routeData={props} />) }}>
            <Tab.Screen name="Income" component={IncomeListScreen} options={{}} />
        </Stack.Navigator>
    )
}

function HomeStack() {
    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={{ tabBarPressColor: 'rgba(255, 255, 255, 0)', tabBarStyle: { borderColor: 'rgba(255, 255, 255, 0)', shadowColor: 'rgba(255, 255, 255, 0)', backgroundColor: '#F3F6FD', height: 65, display: 'flex' }, tabBarShowLabel: false, tabBarActiveTintColor: '#5EACF9', tabBarInactiveTintColor: '#9DB2CE', tabBarIndicatorStyle: { backgroundColor: '#5EACF9', width: 5, height: 5, borderRadius: 100, left: "9%", bottom: 20 } }} tabBarPosition='bottom' >
            <Tab.Screen name="Home0" component={HomeScreen} options={{ tabBarIcon: ({ focused, color }) => (focused ? <Coin color={color} /> : <Coin color={color} />) }} />
            <Tab.Screen name="Home1" component={HomeScreen} options={{ tabBarIcon: ({ focused, color }) => (focused ? <Wallet color={color} /> : <Wallet color={color} />) }} />
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ focused, color }) => (focused ? <HomeIcon color={color} /> : <HomeIcon color={color} />) }} />
            <Tab.Screen name="Home3" component={HomeScreen} options={{ tabBarIcon: ({ focused, color }) => (focused ? <HandIcon color={color} /> : <HandIcon color={color} />) }} />
            <Tab.Screen name="Home4" component={HomeScreen} options={{ tabBarIcon: ({ focused, color }) => (focused ? <ExchangeIcon color={color} /> : <ExchangeIcon color={color} />) }} />
        </Tab.Navigator>
    )
}

function Navigator() {
    return (
        <NavigationContainer>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'}/>
            <Stack.Navigator initialRouteName={"HomeStack"} screenOptions={{ gestureResponseDistance: 20, gestureDirection: 'horizontal' }}>
                <Stack.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
                <Stack.Screen name="IncomeStack" component={IncomeStack} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default Navigator; 