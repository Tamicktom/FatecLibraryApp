//* Libraries imports
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import { useRouter } from 'expo-router';


type Props = {}

const Home = (props: Props) => {
  const router = useRouter();

  return (
    <View className='flex flex-1 bg-black justify-center items-center'>
      <Text className='text-white'>Home</Text>
      <TouchableOpacity
        className='bg-blue-500 rounded-md p-2'
        onPress={() => {
          router.push('/search');
        }}
      >
        <Text className='text-white'>Search</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home