import React, { useEffect } from 'react';
import { View, Text, TextInput, StatusBar } from 'react-native';
import { Avatar, Button, Icon } from 'react-native-paper';
import logo from '../../assets/logo.jpg'
import { useApp } from '../context/AppContext';

const SignupScreen = ({ navigation }) => {
  const {isLogin} = useApp();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Signing up...');
    navigation.navigate("Verification")
  };
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
        <Text className={`text-2xl text-black font-bold`}>Welcome Back!</Text>
        <Text className={`text-gray-500 mt-2`}>Please sign up to continue</Text>
      </View>

      <Button icon={'google'} mode="contained" onPress={handleLogin} className={`w-full`}>
        Sign up with Google
      </Button>

      <View className={`mt-4 items-center`}>
        <Text className={`text-gray-500`}>Already have an account? <Text onPress={() => { navigation.navigate("Login") }} className={`text-blue-500`}>Sign in</Text></Text>
      </View>
    </View>
  );
};

export default SignupScreen;

