//* Libraries imports
import { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { MagnifyingGlass } from "phosphor-react-native"

//* custom hooks imports
import useDebounce from '@hooks/common/useDebouncer';

type Props = {
  setQuery: (query: string) => void;
}

export default function SearchInput(props: Props) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    props.setQuery(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <View className='w-full justify-between flex flex-row rounded-2xl bg-gray-200 px-4 py-2'>
      <TextInput
        placeholder="Search for a Pokémon"
        className='w-72'
        onChangeText={(text) => setQuery(text)}
      />
      <MagnifyingGlass size={24} />
    </View>
  );
}