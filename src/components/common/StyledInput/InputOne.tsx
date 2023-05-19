//* Libraries imports
import { Text, TextInput, View, } from 'react-native';

type StyledInputProps = {
  label: string;
  setValue: (e: any) => void;
  password?: boolean;
}

export default function StyledInput({ label, setValue, password = false }: StyledInputProps) {
  return (
    <View className='flex items-center justify-center w-full mb-4'>
      <View className='flex items-start justify-center'>
        <Text className='text-xl font-bold text-neutral-900'>{label}</Text>
      </View>
      <TextInput
        className='w-full h-12 px-4 text-xl text-black bg-white border rounded-2xl border-neutral-300'
        onChangeText={setValue}
        secureTextEntry={password}
      />
    </View>
  );
}