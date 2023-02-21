//* Libraries imports
import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <SafeAreaView className="flex-1">
      <View className='flex flex-col items-center justify-center flex-1 w-full h-full bg-black'>
        <StatusBar style="auto" />
        <Link href="/login" className='w-full h-24 bg-blue-600'>
          Login
        </Link>
      </View>
    </SafeAreaView>
  );
}
