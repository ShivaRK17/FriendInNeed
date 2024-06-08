import { View, Text, ScrollView, ToastAndroid, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { Button, Divider, IconButton, Snackbar, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDown from 'react-native-paper-dropdown';
import { useApp } from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CustomerModal = ({ route, navigation }) => {
    const [deliveredto, setDeliveredto] = useState('')
    const [showDropDown, setShowDropDown] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [items, setItems] = useState("")
    const { item, customPlace } = route.params;

    const [orderDesc, setOrderDesc] = useState("")
    const { currOrders, setCurrOrders, currUserDetails } = useApp();
    const locationList = [
        {
            "label": "1k",
            "value": "1k"
        },
        {
            "label": "1.8k",
            "value": "1.8k"
        },
        {
            "label": "Lh",
            "value": "Lh"
        },
        {
            "label": "Old blocks (cafeteria)",
            "value": "Old blocks (cafeteria)"
        },
        {
            "label": "Ts",
            "value": "Ts"
        },
        {
            "label": "Ish",
            "value": "Ish"
        },
        {
            "label": "Mme lawn",
            "value": "Mme lawn"
        }
    ]
    const handleConfirm = async () => {
        if (orderDesc === "" || deliveredto === "") {
            setShowSnackbar(!showSnackbar)
            return;
        }
        setCurrOrders([{ //we can modify to add multiple orders
            "item": items,
            "place": item?.id,
            "order_description": orderDesc,
            "order_state": "pending",
            "destination": deliveredto
        }])
        const authToken = await AsyncStorage.getItem("authToken");

        try {
            const response = await axios.post(
                `${process.env.EXPO_PUBLIC_BACKEND_URL}/order/orderpost`,
                {
                    "item": items,
                    "place": item?._id,
                    "order_description": orderDesc,
                    "destination": deliveredto
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
                setCurrOrders(data.currOrder);
            }
        } catch (error) {
            console.log(error);
        }
        navigation.navigate("Home");
    }

    return (
        <>
            <SafeAreaView className="flex-1">
                <StatusBar barStyle="dark-content" />
                <Snackbar
                    visible={showSnackbar}
                    onDismiss={() => { setShowSnackbar(!showSnackbar) }}>
                    Please fill details
                </Snackbar>
                <ScrollView className="flex-1 pt-10 z-10 shadow-xl rounded" contentContainerStyle={{ justifyContent: 'space-between' }}>
                    <View>
                        <View className="flex-row-reverse w-full">
                            <IconButton className="shadow mx-5" containerColor='#f0b5ff' rippleColor={'#c573ff'} size={30} onPress={() => { navigation.goBack() }} icon={'close'} />
                        </View>
                        <View className="flex-col px-6">
                            <Text className="text-2xl text-black font-bold uppercase">{item?.name}</Text>
                            <Divider />
                            {customPlace && <>
                                <Text className="text-sm text-black mt-5 mb-3">Where do you want to order?</Text>
                                <TextInput mode='outlined' placeholder='Bring me from ...' multiline numberOfLines={3} maxLength={100} label={"Order Place"} /></>}
                            <Text className="text-sm text-black mt-5 mb-3">What do you want to order?</Text>
                            <TextInput className="mb-1" value={items} onChangeText={setItems} mode='outlined' placeholder='Bring me ...' multiline numberOfLines={2} maxLength={100} label={"Item Name(s)"} />
                            <TextInput value={orderDesc} onChangeText={setOrderDesc} mode='outlined' placeholder='Description ...' multiline numberOfLines={4} maxLength={250} label={"Order Description"} />
                            <Text className="text-sm mt-5 mb-3 text-black">Where to bring the order?</Text>
                            {/* <TextInput mode='outlined' placeholder='I am at ...' multiline numberOfLines={3} label={"My location"} /> */}
                            <DropDown
                                dropDownItemTextStyle={{ color: 'black' }}
                                label={"My Location"}
                                mode={"outlined"}
                                visible={showDropDown}
                                showDropDown={() => setShowDropDown(true)}
                                onDismiss={() => setShowDropDown(false)}
                                value={deliveredto}
                                setValue={setDeliveredto}
                                list={locationList}
                            />
                        </View>
                    </View>
                    <View className="flex-row p-6 my-6 place-items-end justify-around items-center">
                        <Button onPress={() => { navigation.goBack() }} mode='contained-tonal'>Close</Button>
                        <Button icon={'check-circle'} mode='elevated' onPress={handleConfirm}>Confirm</Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default CustomerModal