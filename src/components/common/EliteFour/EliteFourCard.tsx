//* Libraries import
import { View, Text } from 'react-native';

import type { EliteFourMember } from '@localTypes/EliteFour';

type Props = {
  data: EliteFourMember;
}

export default function EliteFour(props: Props) {
  return (
    <View className='flex flex-col items-center justify-center w-full h-20 bg-red-600'>
      <Text className='text-2xl font-bold text-white'>{props.data.name}</Text>
      <Text className='text-'>{props.data.type}</Text>
      {
        props.data.pokemon.map((pkm, index) => (
          <Text key={index}>{pkm}</Text>
        ))
      }
    </View>
  );
}