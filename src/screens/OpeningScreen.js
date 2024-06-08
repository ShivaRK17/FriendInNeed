import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const OpeningScreen = () => {
    return (
        <>
            <SafeAreaView>
                <View className="bg-orange-300 h-screen w-screen flex">
                    <Text className="text-black font-2xl text-center">Fin is Loading</Text>
                </View>
            </SafeAreaView>
        </>
    )
}

export default OpeningScreen