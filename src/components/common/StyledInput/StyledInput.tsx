//* Libraries imports
import { Text, TextInput, View, } from 'react-native';

type StyledInputProps = {
  label: string;
  setValue: (e: any) => void;
  password?: boolean;
}

export default function StyledInput({ label, setValue, password = false }: StyledInputProps) {
  return (
    <View className='flex items-center justify-center w-full'>
      <View className='flex items-start justify-center'>
        <Text className='text-xl font-bold text-white'>{label}</Text>
      </View>
      <TextInput
        className='w-3/4 h-12 px-4 text-xl text-black bg-white rounded-full'
        onChangeText={setValue}
        secureTextEntry={password}
      />
    </View>
  );
}