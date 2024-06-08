import { View, Text } from 'react-native'
import React from 'react'
import { IconButton, Surface } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const Header = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Surface elevation={1} className="flex-row justify-between bg-purple-100 z-6">
                <IconButton icon={'chevron-left'} size={35} className="mx-1" onPress={() => { navigation.goBack() }} />
                <IconButton icon={'account-circle-outline'} size={35} className="mx-1" onPress={() => { navigation.navigate("Profile") }} />
            </Surface>
        </SafeAreaView>
    )
}

export default Header