//* Libraries imports
import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

type Props = {}

const Help = (props: Props) => {
  return (
    <SafeAreaView className='flex items-center justify-start flex-1'>
      <View className='flex items-center justify-center flex-1'>
        <Text className='text-black'>Help</Text>
      </View>
    </SafeAreaView>
  )
}

export default Help