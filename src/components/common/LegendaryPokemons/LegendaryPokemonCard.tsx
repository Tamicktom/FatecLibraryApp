//* Libraries import
import { View, Text } from 'react-native';

import type { LegendaryPkm } from '@localTypes/LegendaryPokemon';

type Props = {
  data: LegendaryPkm;
}

export default function LegendaryPokemons(props: Props) {
  return (
    <View>
      <Text>{props.data.name}</Text>
      <Text>{props.data.type}</Text>
      <Text>{props.data.generation}</Text>
    </View>
  );
}