import React, { Suspense, useEffect, useState } from 'react'
import { View, ScrollView, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import data from '../constants/trendingItems';
import axios from 'axios';

const TrendingSlides = ({ navigation }) => {
    const [trendingPlaces, setTrendingPlaces] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const handleOrder = () => {
        // navigation.navigate("CustomerModal", { item, customPlace:false })
    }
    useEffect(() => {
        const getTrendingPlaces = async () => {
            try {
                const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/order/trendingplaces`);
                const data = response.data;
                if (data.success) {
                    setTrendingPlaces(data.trendingPlaces);
                    setIsLoaded(true)
                }
                else {
                    setTrendingPlaces([]);
                }
            } catch (error) {
                console.log('trending places error');
                console.log(error);
            }
        }
        getTrendingPlaces();
    }, [])

    if(!isLoaded){
        return <ActivityIndicator color='purple' size={'large'} animating/>
    }
    return (
            <FlatList
                data={trendingPlaces}
                horizontal={true}
                keyExtractor={(item) => item?._id?.toString()}
                renderItem={({ item }) => <Card className={`rounded-md overflow-hidden shadow-md m-1 w-80`} onPress={handleOrder}>
                    <Image
                        source={{ uri: item?.image_url }}
                        className={`w-full h-40 object-cover rounded-t-md`}
                    />
                    <Card.Content>
                        <Title className={`text-black text-lg font-bold`}>{item?.name}</Title>
                        <View className={`flex flex-row items-center justify-between mt-2`}>
                            <View>
                                <Text className={`text-sm font-bold text-purple-800`}>{item?.category}</Text>
                            </View>
                            <View>
                                <Text className={`text-sm font-bold text-gray-500`}>Ordered {item?.number_of_orders} times</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>}
                showsHorizontalScrollIndicator={false} // Hide scroll indicator for cleaner look
            />
    )
}

export default TrendingSlides