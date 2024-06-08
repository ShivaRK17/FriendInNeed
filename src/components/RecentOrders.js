import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { List, Surface } from 'react-native-paper'

const RecentOrders = () => {
    const [recentOrders, setRecentOrders] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        const getRecentOrders = async () => {
            try {
                const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/order/getrecentOrders`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                const data = response.data;
                if (data.success) {
                    setRecentOrders(data.recentorders);
                    setIsLoaded(true)
                } else {
                    setRecentOrders([]);
                }
            } catch (error) {
                console.log('recent orders error');
                console.log(error);
            }
        }
        getRecentOrders()
    }, [])
    if(!isLoaded){
        return <ActivityIndicator color='purple' size={'large'} animating/>
    }
    return (
        <>
            <View className={`mx-4`}>
                <List.Section>
                    {/* <FlatList
                        data={recentOrders}
                        keyExtractor={(item) => item?._id?.toString()}
                        renderItem={({item}) => <Surface className='rounded my-1 px-2'>
                                <List.Item
                                    title={item?.item}
                                    description={`Place: ${item?.place?.name}, Price: ${item?.created_at}`}
                                    left={() => <List.Icon icon="food" />}
                                />
                            </Surface>
                        }
                    /> */}
                    {recentOrders.map((item,ind)=>{
                        return <Surface key={ind} className='rounded my-1 px-2'>
                        <List.Item
                            title={`Someone ordered ${item?.item}`}
                            // description={`Place: ${item?.place?.name}, Price: ${item?.created_at}`}
                            description={`${item?.order_description}\nPlace: Gate`}
                            left={() => <List.Icon icon="food" />}
                        />
                        {/* <Text>{}</Text */}
                    </Surface>
                    })}
                </List.Section>
            </View>
        </>
    )
}

export default RecentOrders