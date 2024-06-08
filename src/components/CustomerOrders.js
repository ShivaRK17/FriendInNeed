import { View, Text } from 'react-native'
import React from 'react'
import { Button, Icon } from 'react-native-paper'
import { useApp } from '../context/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const CustomerOrders = () => {
  const { currOrders, setCurrOrders } = useApp();
  const cancelOrder = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/order/orderDelete`,
        {
          id: currOrders[0]._id
        },
        {
          headers: {
            "Authorization": authToken,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );

      const data = response.data;
      console.log(data);

      if (data.success) {
        setCurrOrders([]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View className={`bg-purple-100 mx-3 p-3 rounded-lg`}>
      {currOrders?.map((item, index) => (
        <View key={index} className={`flex mb-2`}>
          <View className="flex flex-row text-black justify-between items-center">
            <Text className="text-sm font-bold text-black">You ordered at: {item?.place?.name?.toLocaleUpperCase()}</Text>
            <View className="flex flex-row items-center justify-center">
              <Icon source={'circle'} color={!item?.userDetails || item?.userDetails === "none" ? "#dd4444" : "green"} size={18} />
              <Text className="text-xs text-black">{!item?.userDetails || item?.userDetails === "none" ? "Pending" : "Accepted"}</Text>
            </View>
          </View>
          <Text className="text-sm font-bold text-black">Your Location: {item?.destination?.toLocaleUpperCase()}</Text>
          <Text className="font-semibold text-gray-600 text-base">- {item?.item}</Text>
          <Text className="font-semibold text-gray-600 text-base">&nbsp; {item?.order_description}</Text>
          <Text className="font-semibold text-black text-base">Your Order is Accepted by {item?.userDetails === "none" ? "No one" : item?.userDetails?.name}</Text>
          <View className="flex flex-row">
          <Button onPress={cancelOrder} mode='text' labelStyle={{color:'white'}} className="w-1/2 mt-1 items-center justify-center bg-red-400" icon={'cancel'}>Cancel Order</Button>
          </View>
        </View>
      ))}
    </View>
  )
}

export default CustomerOrders