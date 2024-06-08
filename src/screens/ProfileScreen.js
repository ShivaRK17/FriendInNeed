import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Icon } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Rating } from 'react-native-ratings';
import { useApp } from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const { setIsLogin, currUserDetails } = useApp();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken")
      setIsLogin(false);
      // navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <SafeAreaView className={`flex-1 bg-white`}>
      <ScrollView className={`p-5`}>

        <View className={`items-center m-8`}>
          <Avatar.Image size={100} source={{ uri: 'https://picsum.photos/200' }} />
          <Text className={`text-lg text-black font-bold mt-2 text-center`}>{currUserDetails?.name}{currUserDetails?.role === "admin" ? <Icon color='#049bf5' source={"check-decagram"} size={20} /> : <></>}</Text>
          {/* <Text className={`text-gray-500 text-sm`}>ks21meb0b30@student.nitw.ac.in</Text> */}
          <Text className={`text-gray-500 text-sm`}>{currUserDetails?.roll_number || "No Roll Number"}</Text>
          <Rating startingValue={currUserDetails?.Rating || 0} ratingCount={5} className="m-1" imageSize={25} readonly />
        </View>

        <Card className={`mt-8`}>
          <Card.Content>
            <Title>Profile Information</Title>
            <Paragraph>Email: {currUserDetails?.email}</Paragraph>
            <Paragraph>Hostel: 1K</Paragraph>
            <Paragraph>Number of Deliveries: {currUserDetails?.delivered_orders?.length}</Paragraph>
            <Paragraph>Number of Orders Placed: {currUserDetails?.orders_placed?.length}</Paragraph>
          </Card.Content>
          <Card.Actions className={`justify-end`}>
            <Button>Edit Profile</Button>
          </Card.Actions>
        </Card>

        <Card className={`mt-4`}>
          <Card.Content>
            <Title>Settings</Title>
            <Paragraph>Notifications</Paragraph>
            <Paragraph>Privacy & Security</Paragraph>
            <Paragraph>Account Settings</Paragraph>
          </Card.Content>
          <Card.Actions className={`justify-end`}>
            <Button>Manage Settings</Button>
          </Card.Actions>
        </Card>

        <View className={`mt-6 mb-10 items-center`}>
          {currUserDetails?.role === "admin" &&
            <Button mode="contained" onPress={()=>{navigation.navigate("Stats")}} className={`w-full my-2`}>
              <Text>Stats</Text>
            </Button>}
          <Button mode="contained" onPress={handleLogout} className={`w-full my-2`}>
            <Text>Logout</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
