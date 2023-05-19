//* Libraries import
import { View, FlatList } from 'react-native';

//* Components import
import EliteFourCard from "@components/common/EliteFour/EliteFourCard";

//* Hooks import
import useEliteFour from '@hooks/common/useEliteFour';

export default function LegendaryPokemons() {
  const pkm = useEliteFour();

  return (
    <View className='w-full h-full'>
      <FlatList
        className='w-full h-full bg-slate-100'
        data={pkm.data?.elite_four || []}
        renderItem={({ item }) => <EliteFourCard data={item} />}
        keyExtractor={item => item.name}
      />
    </View>
  );
}