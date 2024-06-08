import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-paper';
import axios from 'axios';

const Footer = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://favqs.com/api/qotd');
      const resp = response.data
      setQuote(resp.quote.body);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  return (
    <View className={` p-4 justify-end bg-gray-100`}>
      <Text className={`text-gray-500 text-lg font-bold`}><Icon source={'copyright'}/>Friend in Need</Text>
      <Text className={`text-gray-400 text-xs mt-1`}>{quote}</Text>
    </View>
  );
};

export default Footer;
