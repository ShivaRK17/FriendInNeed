import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Linking, Platform, StatusBar, StyleSheet } from 'react-native';
import { Avatar, Button, Icon,Portal,Dialog } from 'react-native-paper';
import logo from '../../assets/logo.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '../context/AppContext';


const LoginScreen = ({ route,navigation }) => {
  const [visible, setVisible] = useState(false)
  const {setIsLogin,loginLoad} = useApp();


  const handleLogin = async () => {
    let url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/google?client=${Platform.OS}`
    // let url = `friendinneed://login/error`
    console.log(url);
    Linking.canOpenURL(url).then(() => Linking.openURL(url));
    // await AsyncStorage.setItem("authToken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDA2YjM1NzBmNGE5MmE4Y2E1YjcyMiIsImlhdCI6MTcxMTkwNTQ4MiwiZXhwIjoxNzExOTkxODgyfQ.wRwOivz5xOUQE1glphgn7hcemPQmgcBxzYYvd5TkxXA") 
    // setIsLogin(true);
  };
  
  useEffect(() => {
    const setToken = async (token)=>{
      await AsyncStorage.setItem('authToken',token)
      console.log(token);
      setIsLogin(true);
    }
    if(route?.params?.token){
      const token = route?.params?.token;
      if(token==="error"){
        setVisible(true)
      }
      else{
        setToken(route?.params?.token);
      }
    }
  }, [route?.params?.token])
  

  return (
    <>
    <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(true)}>
          <Dialog.Title>Login Error</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" className="font-bold text-lg">Possible Errors:</Text>
            <Text variant="bodyMedium">Please login using NITW Student Email ID</Text>
            <Text variant="bodyMedium">Network Error</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    <View className={`flex-1 justify-center p-4`} style={styles.container}>
      <StatusBar className="auto" barStyle="light-content" animated />

      <View className={`items-center mb-8`}>
        <Avatar.Image size={100} source={logo} className="border-2 border-white" />
        <Text className={`text-2xl text-black font-bold`}>Welcome Back!</Text>
        <Text className={`text-gray-500 mt-2`}>Please login to continue</Text>
      </View>

      <View className={`mb-4`}>
        {/* <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          className={`bg-gray-200 p-2 mb-2 rounded`}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          className={`bg-gray-200 p-2 rounded`}
        /> */}
      </View>

      <Button disabled={loginLoad} loading={loginLoad} icon={'google'} mode="contained" onPress={handleLogin} className={`w-full`}>
        Login with Google
      </Button>

      <View className={`mt-4 items-center`}>
        <Text className={`text-gray-500`}>Don't have an account? <Text onPress={() => { navigation.navigate("Signup") }} className={`text-blue-500`}>Sign up</Text></Text>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily:'Montserrat-VariableFont_wght'
  }});

export default LoginScreen;

