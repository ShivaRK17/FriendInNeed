import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
const AppContext = createContext();

const useAppContext = () => {
    const [isServerDown, setIsServerDown] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [loginLoad, setLoginLoad] = useState(true);
    const [currUserDetails, setCurrUserDetails] = useState([])
    const [rollNumber, setRollNumber] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [course, setCourse] = useState(null)
    const [currOrders, setCurrOrders] = useState([])
    const [customersPlaces, setCustomersPlaces] = useState([])
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const authToken = await AsyncStorage.getItem("authToken");
                const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/getUserInfo`, {
                    headers: {
                        "authorization": authToken,
                        "Content-Type": "application/json"
                    }
                });
                const data = response.data;
                if (data?.success) {
                    setCurrUserDetails(data?.userDetails);
                }
            } catch (error) {
                setCurrUserDetails([])
                console.log('user info error');
                console.log(error);
            }
        }
        const getCustomerPlaces = async () => {
            try {
                const authToken = await AsyncStorage.getItem("authToken");
                const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/order/getplaces`, {
                    headers: {
                        "authorization": authToken,
                        "Content-Type":"application/json",
                    }
                });
                const data = response.data;
                if (data.success) {
                    setCustomersPlaces(data.places);
                } else {
                    setCustomersPlaces([]);
                }
            } catch (error) {
                setCustomersPlaces([])
                console.log('customer places error');
                console.log(error);
            }
        }
        const getUserCurrOrders = async () => {
            try {
                const authToken = await AsyncStorage.getItem("authToken");
                const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/order/userOrders`, {
                    headers: {
                        "authorization": authToken,
                        "Content-Type":"application/json",
                    }
                });
                const data = response.data;
                if (data.success) {
                    setCurrOrders(data.currentorders);
                } else {
                    setCurrOrders([]);
                }
            } catch (error) {
                setCurrOrders([])
                console.log('curr orders error');
                console.log(error);
            }
        }
        if(isLogin){
            getUserInfo();
            getCustomerPlaces();
            getUserCurrOrders();
        }
    }, [isLogin])
    useEffect(() => {
        const setIsAlreadyLogin = async ()=>{
            try {
                const authToken = await AsyncStorage.getItem("authToken");
                if(authToken){
                    setIsLogin(true);
                }
                setLoginLoad(false);
            } catch (error) {
                console.log('already login error');
                console.log(error);
            }
        }
        setIsAlreadyLogin();
    }, [])
    


    return {
        isLogin, setIsLogin,
        isServerDown, setIsServerDown,
        rollNumber, setRollNumber,
        phoneNumber, setPhoneNumber,
        course, setCourse,
        currOrders, setCurrOrders,
        customersPlaces,
        currUserDetails,
        loginLoad, setLoginLoad
    }
}
const AppProvider = ({ children }) => {
    const contextValue = useAppContext();
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}
const useApp = () => {
    return useContext(AppContext)
}

export { AppProvider, useApp };