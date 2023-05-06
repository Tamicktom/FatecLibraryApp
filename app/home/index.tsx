//* Libraries imports
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import { useRouter } from 'expo-router';

//* Store imports
import { userStore } from "@store/user";

type Props = {}

const Home = (props: Props) => {
  const router = useRouter();

  return (
    <View className='flex items-center justify-center flex-1 bg-black'>
      <Text className='text-white'>Home</Text>
      <TouchableOpacity
        className="p-4 bg-blue-800"
        onPress={() => {
          userStore.setState({
            user: {
              id: '',
              name: '',
              email: '',
              isLogedIn: false,
            }
          });
        }}
      >
        <Text className='text-white'>Fazer logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home