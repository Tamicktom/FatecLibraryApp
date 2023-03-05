//* Libraries imports
import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView, Text, Pressable, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

//* Components imports
import StyledButton from "@components/common/StyledButton/StyledButton";

export default function App() {

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="inverted" />
      <View className='flex flex-col items-center justify-center flex-1 w-full h-full gap-4 bg-white'>
        <View className='flex items-center justify-center w-full'>
          <Text className='text-4xl text-black'>Pokédex</Text>
        </View>

        <View className='flex flex-col items-center justify-center w-full'>
          <StyledButton to='/login'>Login</StyledButton>
          <StyledButton to='/help'>Help</StyledButton>
          <StyledButton to='/pokemon/1'>Pokémon 1</StyledButton>
        </View>

      </View>
    </SafeAreaView>
  );
}
