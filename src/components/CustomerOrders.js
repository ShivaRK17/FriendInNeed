import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Icon } from 'react-native-paper'
import { useApp } from '../context/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import moment from 'moment'

const CustomerOrders = () => {
  const {currOrders, setCurrOrders, isLogin } = useApp();
  const [cancelBtnDown, setcancelBtnDown] = useState(false)
  const [refreshBtnDown, setRefreshBtnDown] = useState(false)
  const cancelOrder = async () => {
    try {
      setcancelBtnDown(true);
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
        setcancelBtnDown(false);
      }
    } catch (error) {
      setcancelBtnDown(false);
      console.log(error);
    }
  }
  const getUserCurrOrders = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/order/userOrders`, {
        headers: {
          "authorization": authToken,
          "Content-Type": "application/json",
        }
      });
      const data = response.data;
      if (data.success) {
        setCurrOrders(data.currentorders);
      } else {
        setCurrOrders([]);
      }
    } catch (error) {
      setCurrOrders([])
      console.log('curr orders error');
      console.log(error);
    }
  }
  const refreshOrder = ()=>{
    setRefreshBtnDown(true);
    setTimeout(() => {
      setRefreshBtnDown(false);
      if(isLogin){
        getUserCurrOrders();
      }
    }, 10000);
  }
  useEffect(() => {
    if (isLogin) {
      getUserCurrOrders();
    }
  }, [isLogin])

  return (
    <View className={`bg-purple-100 mx-3 p-3 rounded-lg`}>
      {currOrders.length===0 && <Text>No Orders</Text>}
      {currOrders && currOrders?.map((item, index) => (
        <View key={index} className={`flex mb-2`}>
          <View className="flex flex-row text-black justify-between items-center">
            <Text className="text-sm font-bold text-black">You ordered at: {item?.place?.name?.toLocaleUpperCase()}</Text>
            <View className="flex flex-col">
              <View className="flex flex-row items-center justify-center">
                <Icon source={'circle'} color={!item?.userDetails || item?.userDetails === "none" ? "#dd4444" : "green"} size={18} />
                <Text className="text-xs text-black">{!item?.userDetails || item?.userDetails === "none" ? "Pending" : "Accepted"}</Text>
              </View>
              <Text className="text-xs">{moment(item.created_at).fromNow()}</Text>
            </View>
          </View>
          <Text className="text-sm font-bold text-black">Your Location: {item?.destination?.toLocaleUpperCase()}</Text>
          <Text className="font-semibold text-gray-600 text-sm">- {item?.item}</Text>
          <Text className="font-semibold text-gray-600 text-sm">&nbsp; {item?.order_description}</Text>
          {
            new Date().getTime() - new Date(item?.created_at).getTime() > 3600000 ?
              <Text className="font-semibold text-black text-base uppercase">Order not accepted in over an hour. Please cancel.</Text> :
              <Text className="font-semibold text-black text-base">Your Order is Accepted by {item?.userDetails === "none" ? "No one" : item?.userDetails?.name}</Text>
          }
          <View className="flex flex-row items-center justify-center">
            <Button onPress={cancelOrder} disabled={cancelBtnDown} mode='text' labelStyle={{ color: 'white' }} className=" m-2 items-center justify-center bg-red-400" icon={'cancel'}>Cancel Order</Button>
            <Button onPress={refreshOrder} disabled={refreshBtnDown}  mode='text' labelStyle={{ color: 'white' }} className=" m-2 items-center justify-center bg-purple-600" icon={'refresh'}>Refresh</Button>
          </View>
        </View>
      ))}
    </View>
  )
}

export default CustomerOrders