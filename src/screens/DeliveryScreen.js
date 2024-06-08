import { View, Text, StatusBar, ScrollView, FlatList, RefreshControl, Linking, ActivityIndicator } from 'react-native'
import React, { Suspense, memo, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {  Button, Card, Chip, Dialog, Icon, IconButton, List, MD3Colors, Portal, Searchbar, Surface } from 'react-native-paper'
import delivery from '../constants/deliveryOrders'
import moment from 'moment'
import { useApp } from '../context/AppContext'
import axios from 'axios'

const DeliveryScreen = ({ navigation }) => {
  const [searchString, setSearchString] = useState("")
  const [visible, setVisible] = useState(false)
  const [currOrder, setCurrOrder] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [deliveryOrders, setDeliveryOrders] = useState([])
  const { currUserDetails } = useApp()
  const handleConfirmOrder = () => {
    setVisible(false)
    navigation.navigate("DeliveryOrder", { currOrder })
  }
  useEffect(() => {
    const getDeliveryOrders = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/order/getCurrentOrders`);
        const data = response.data
        if (data.success) {
          setDeliveryOrders(data.currentorders);
          setIsLoaded(true)
        }
        else {
          setDeliveryOrders([])
        }
      } catch (error) {
        console.log(error);
      }
    }
    // setDeliveryOrders(delivery)
    getDeliveryOrders()
  }, [])



  const OrderCard = ({ order }) => {
    const handleAcceptOrder = (order) => {
      setVisible(true)
      setCurrOrder(order)
    }
    return (
      <Card className={`m-4 p-2 rounded-lg shadow-lg`}>
        <Card.Content>
          <View className={`flex-row justify-between align-center`}>
            <View>
              <Text className={`text-xl text-black font-bold`}>{(order?.userDetails?.name.length > 15) ? (order?.userDetails?.name.substring(0, 15) + '...') : (order?.userDetails?.name)}</Text>
              <Text className={`text-gray-500 text-black`}>{order?.userDetails?.roll_number}</Text>
            </View>
            <View>
              <Button disabled={order?.ordered_by === currUserDetails._id} mode='contained' onPress={() => handleAcceptOrder(order)}>
                <Text className={`text-white text-center`}>Accept</Text>
              </Button>
            </View>
          </View>
          <Chip className="mt-2 flex-row flex-wrap " mode='flat' icon={'map-marker'}>{'Go to: ' + order?.place?.name}</Chip>
          <List.Section className="bg-transparent">
            <List.Accordion className="bg-purple-100 px-3 py-0 mt-0 rounded"
              title="Order Details">
              <View className={`mb-2 border-x-2 border-b-2 border-purple-100 p-1`}>
                <Text className={`text-sm text-black font-semibold`}>{order?.item}</Text>
                <Text className={`text-sm text-black font-semibold`}>{order?.order_description}</Text>
                <Text className={`text-gray-500`}>Meet me at {order?.destination}</Text>
                <View className="flex-row items-center my-2"><Icon source={'clock'} size={17} /><Text className={`text-gray-500`}> {moment(order?.created_at).format('MMMM Do YYYY, h:mm a')}</Text></View>
              </View>
            </List.Accordion >
            <View className="justify-between flex-row">
              <IconButton onPress={async () => await Linking.openURL(`tel:+91${order?.userDetails?.phonenumber}`)} icon={'phone'} className="bg-purple-200" />
              <IconButton onPress={async () => await Linking.openURL(`whatsapp://send?phone=+91${order?.userDetails?.phonenumber}&text=Hey!\nI am ready to accept your order from FIN!`)} icon={'whatsapp'} className="bg-purple-200" />
            </View>
          </List.Section >
        </Card.Content>
      </Card >
    );
  };
  if(!isLoaded){
    return <ActivityIndicator className="py-10" color='purple' size={'large'} animating/>
}
  return (
    <>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Order Details</Dialog.Title>
          <Dialog.Content>
            <Chip mode='flat' className="mb-1" icon={'motorbike'}>{currOrder?.place?.name}</Chip>
            <Chip mode='flat' icon={'map-marker'}>{currOrder?.destination}</Chip>
            <Text className="font-bold text-lg">{currOrder?.userDetails?.name}</Text>
            <Text variant="bodyMedium">{currOrder?.item}</Text>
            <Text variant="bodyMedium">{currOrder?.order_description}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button onPress={handleConfirmOrder}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* <Surface className="py-2 bg-violet-100 shadow-lg z-10" elevation={2}>
        <View className="flex-row px-5 items-center justify-between">
          <Text className="font-bold text-2xl">Hi Sriyash 👋</Text>
          <IconButton
            icon="account-circle-outline"
            iconColor={MD3Colors.primary0}
            size={30}
            onPress={() => navigation.navigate("Profile")}
          />
        </View>
        <View className="flex-col px-5 pb-3">
          <View className="bg-red">
            <Searchbar
              value={searchString}
              className="bg-white"
              maxLength={30}
              onChangeText={setSearchString}
              mode='bar'
              right={() => <IconButton className="bg-purple-100" icon={'filter-variant'} />}
              placeholder="Search"
            />
          </View>
        </View>
      </Surface> */}
      {/* <Surface elevation={1} className="flex-row bg-purple-100">
        <IconButton icon={'chevron-left'} size={35} className="mx-1" onPress={() => { navigation.goBack() }} />
      </Surface> */}
        <View style={{ flex: 1 }} className="my-2">

          {/* <View className={`flex-1`}> */}
          <FlatList
            refreshControl={<RefreshControl refreshing={false} />}
            ListHeaderComponent={<View><Text className="font-bold text-black antialiased text-2xl ml-5">Customer Orders</Text>{deliveryOrders.length === 0 ? <Text className="m-7 text-black font-semibold text-xl">No Orders :(</Text> : <></>}</View>}
            // data={deliveryOrders.filter((e) => e.place.includes(searchString))}
            data={deliveryOrders}
            renderItem={({ item }) => <OrderCard order={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
          {/* </View> */}
        </View>
    </>
  )
}

export default memo(DeliveryScreen)