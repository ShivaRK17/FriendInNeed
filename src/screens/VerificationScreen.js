import React, { useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Avatar, Button, Icon, TextInput } from 'react-native-paper';
import logo from '../../assets/logo.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '../context/AppContext';


const VerificationScreen = ({ navigation }) => {
    const { rollNumber, setRollNumber, phoneNumber, setPhoneNumber,setIsLogin,isLogin } = useApp();
    const handleRegis = ()=>{
        setIsLogin(true)
        navigation.navigate("Home")
    }
    useEffect(() => {
        // console.log(isLogin);
        // if(isLogin){
        //   navigation.replace("Home")
        // }
      }, [])
    return (
        <View className={`flex-1 justify-center p-4`}>
            <StatusBar className="auto" barStyle="light-content" animated />

            <View className={`items-center mb-8`}>
                <Avatar.Image size={100} source={logo} className="border-2 border-white" />
                <Text className={`text-2xl text-black font-bold`}>Complete Registration</Text>
                <Text className={`text-gray-500 mt-2`}>Enter details to continue</Text>
            </View>

            <View className={`mb-4`}>
                <View className="my-2">
                    <Text className="font-bold">Enter Roll Number</Text>
                    <TextInput
                        mode='outlined'
                        label="Roll Number"
                        value={rollNumber}
                        onChangeText={setRollNumber}
                        placeholder="Enter your roll number"
                    />
                </View>
                <View>
                    <Text className="font-bold">Enter Phone Number (+91)</Text>
                    <TextInput
                        mode='outlined'
                        label="Phone Number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        placeholder="Enter your Phone Number"
                    />
                </View>
                <View>
                    <Text className="font-bold">Upload ID Card</Text>
                    
                </View>
            </View>
            <Button onPress={handleRegis} mode='contained'>Complete Registration</Button>
        </View>
    );
};

export default VerificationScreen;

