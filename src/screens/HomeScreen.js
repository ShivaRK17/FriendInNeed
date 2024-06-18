import { ScrollView, StatusBar, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, IconButton, MD3Colors, Surface } from 'react-native-paper'
import TrendingSlides from '../components/TrendingSlides'
import Footer from '../components/Footer'
import RecentOrders from '../components/RecentOrders'
import CustomerOrders from '../components/CustomerOrders'
import { useApp } from '../context/AppContext'

const HomeScreen = ({ navigation }) => {
    const {currUserDetails } = useApp();

    return (
        <SafeAreaView className="flex-1">
            <StatusBar barStyle="light-content" />
            <Surface className="pb-2 bg-violet-100  shadow-lg z-10" elevation={2}>
                <View className="flex-row px-5 items-center justify-between">
                    <Text className="font-bold text-gray-600 text-sm w-3/4">Hi {currUserDetails?.name} 👋</Text>
                    <IconButton
                        icon="account-circle-outline"
                        iconColor={MD3Colors.primary0}
                        size={30}
                        onPress={() => navigation.navigate("Profile")}
                    />
                </View>
                <View className="flex-col">
                    <Text className="mx-5 text-black font-bold text-base">I want to</Text>
                    <View className="flex-row p-1 m-1 justify-between">
                        <Button className="mx-1" mode='elevated' icon="shopping" onPress={() => { navigation.navigate("Customer") }}>
                            <Text>Place an Order</Text>
                        </Button>
                        <Button className="mx-1" mode='elevated' icon="motorbike" onPress={() => { navigation.navigate("Delivery") }}>
                            <Text>Bring an Order</Text>
                        </Button>
                    </View>
                </View>
            </Surface>
            {/* <CustomerPage/> */}
            <ScrollView className="flex-1 pb-3">
                {/* {currOrders?.length === 0 ? <></> : */}
                 <View>
                    <Text className="font-bold text-black antialiased text-2xl my-5 ml-3">Your Order</Text>
                    <CustomerOrders />
                </View>
                <View>
                    <Text className="font-bold text-black antialiased text-2xl my-5 ml-3">Trending Places</Text>
                    <TrendingSlides />
                </View>
                <View className="">
                    <Text className="font-bold text-black antialiased text-2xl mt-5 ml-5">Recent Orders</Text>
                    <RecentOrders />
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen