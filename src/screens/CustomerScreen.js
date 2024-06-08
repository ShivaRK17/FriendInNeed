import { View, Text, FlatList, Modal, ScrollView, Linking, StatusBar, ActivityIndicator } from 'react-native'
import React, { Suspense, memo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, IconButton, Searchbar, Card, Title, Divider, TextInput, Tooltip, Portal, Dialog } from 'react-native-paper'
import { useApp } from '../context/AppContext'
import logo from '../../assets/restaurent.jpg'
// import customersPlaces from '../constants/customersPlaces'

const CustomerScreen = ({ navigation }) => {
    const [visible, setVisible] = useState(false)
    const [searchString, setSearchString] = useState("")
    const [currPlace, setcurrPlace] = useState([])
    const { customersPlaces, currOrders,currUserDetails } = useApp();

    const toggleModal = (item) => {
        setcurrPlace(item)
        setVisible(!visible);
    };
    const handleOrder = (item, customPlace) => {
        // toggleModal();
        navigation.navigate("CustomerModal", { item, customPlace })
    };

    const RenderDeliveryItem = ({ item }) => (
        <Card className={`m-4 shadow-lg`}>
            <Card.Cover source={{ uri: item?.image_url || logo }} />
            <Card.Content className="mt-1">
                <View className={`flex-row  justify-between items-center`}>
                    <View>
                        <Text className={`text-xl text-black font-bold`}>{item?.name}</Text>
                        <Text className={`text-gray-500`}>{item?.category}</Text>
                    </View>
                    <View className="justify-between items-center flex-row">
                        <IconButton onPress={() => { toggleModal(item) }} icon={'playlist-edit'} className="bg-purple-200" />
                        <Button disabled={currOrders?.length > 0 || currUserDetails?.corders_placed?.length > 0} onPress={() => { handleOrder(item, false) }} icon={'shopping'} className="bg-purple-200" >Order</Button >
                    </View>
                </View>
                {/* <Chip className="mt-2 flex-row flex-wrap" mode='flat' icon={'map-marker'}>{'Go to: '}</Chip> */}
            </Card.Content>
        </Card >
    );
    if(!customersPlaces){
        return <ActivityIndicator color='purple' size={'large'} animating/>
    }
    return (
        <>
            <SafeAreaView className={`flex-1 ${visible ? 'bg-black/25' : 'bg-white'}`}>

                    {/* {renderModal()} */}
                    <Portal>
                        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                            <Dialog.Title>Items</Dialog.Title>
                            <Dialog.Content>
                                {currPlace.items && currPlace.items.map((e, ind) => {
                                    return <Text className="text-black" key={ind}>{e}</Text>
                                })}
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={() => setVisible(false)}>Cancel</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                    <View className="flex-row">
                        <IconButton icon={'chevron-left'} size={35} className="mx-1" onPress={() => { navigation.goBack() }} />
                    </View>
                    <View className="flex-col px-5 pb-3">
                        <Text className="mb-3 text-black text-xl font-bold">Where do you want to order?</Text>
                        <View className="bg-red">
                            <Searchbar
                                value={searchString}
                                onChangeText={setSearchString}
                                maxLength={50}
                                mode='bar'
                                right={() => <Tooltip title='Add Place'><IconButton disabled className="bg-gray-100" icon={'plus'} onPress={() => { handleOrder({ name: 'Custom Place' }, true) }} /></Tooltip>}
                                placeholder="Search"
                            />
                        </View>
                    </View>
                    {/* <CustomersPlaces className='m-[30px]' customersPlaces={data} /> */}
                    <View className={`flex-1`}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            ListHeaderComponent={<Text className="px-5 text-black text-lg font-bold">PLACES</Text>}
                            data={customersPlaces.filter((e) => e.name.includes(searchString))}
                            renderItem={RenderDeliveryItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

            </SafeAreaView>
        </>
    )
}

export default memo(CustomerScreen)