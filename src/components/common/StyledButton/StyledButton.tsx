//* Libraries imports
import type { ReactNode } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';


type Props = {
  children: ReactNode;
  to: string;
}

export default function StyledButton(props: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className='flex items-center justify-center w-3/4 py-2 m-2 bg-blue-400 rounded-2xl'
      onPress={() => { router.push(props.to) }}
    >
      <Text className='w-full text-center text-black'>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}