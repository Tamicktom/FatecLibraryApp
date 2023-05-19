//* Libraries import
import { View, FlatList } from 'react-native';

//* Components import
import LegendaryPokemonCard from "@components/common/LegendaryPokemons/LegendaryPokemonCard";

//* Hooks import
import useLegendaryPkms from '@hooks/common/useLegendaryPkms';

export default function LegendaryPokemons() {
  const pkm = useLegendaryPkms();

  return (
    <View>
      <FlatList
        data={pkm.data?.Legendary_Pokemons || []}
        renderItem={({ item }) => <LegendaryPokemonCard data={item} />}
        keyExtractor={item => item.name}
      />
    </View>
  );
}