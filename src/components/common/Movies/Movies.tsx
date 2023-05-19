//* Libraries import
import { View, Text, Image } from 'react-native';

export type Movie = {
  "id": number;
  "nome": string;
  "sinopse": string;
  "foto": string;
}

type Props = {
  data: Movie;
}

export default function Movie(props: Props) {
  return (
    <View>
      <Image source={{ uri: props.data.foto }} style={{ height: 300 }} />
      <Text>{props.data.nome}</Text>
      <Text>{props.data.sinopse}</Text>
    </View>
  );
}