import { View, Text } from 'react-native'
import React from 'react'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen'
import CustomerScreen from '../screens/CustomerScreen'
import DeliveryScreen from '../screens/DeliveryScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import CustomerModal from '../components/CustomerModal'
import DeliveryOrderScreen from '../screens/DeliveryOrderScreen'
import Header from '../components/Header'
import { useApp } from '../context/AppContext'
import ServerDown from '../screens/ServerDown'
import VerificationScreen from '../screens/VerificationScreen'
import { createStackNavigator } from '@react-navigation/stack'
import OpeningScreen from '../screens/OpeningScreen'
import StatsScreen from '../screens/StatsScreen'
// const Stack = createNativeStackNavigator();

const Stack = createStackNavigator();

const linking = {
    prefixes: [
        'friendinneed://'
    ],
    config: {
        screens: {
            Login:'login/:token?',
            Signup:'signup',
            Home:'home'
        },
    },
  };

const Navigation = () => {
    const {isServerDown,isLogin} = useApp();
    return <>
        {isServerDown?<ServerDown/>:
        <NavigationContainer linking={linking} fallback={<OpeningScreen/>}>
            <Stack.Navigator screenOptions={{ headerShown: false, animation: 'ios' }}>
                {!isLogin?
                <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                </>:
                <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Customer" component={CustomerScreen} />
                <Stack.Screen name="Delivery" component={DeliveryScreen} options={{headerShown: true,header:Header}}/>
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="DeliveryOrder" component={DeliveryOrderScreen} />
                <Stack.Screen name="Stats" component={StatsScreen} />
                <Stack.Group screenOptions={{ presentation: 'modal',animation:'slide_from_bottom'}} >
                    <Stack.Screen name="CustomerModal" component={CustomerModal}/>
                </Stack.Group>
                </>}
                <Stack.Screen name="Verification" component={VerificationScreen} />
            </Stack.Navigator>
        </NavigationContainer>}
    </>
}

export default Navigation