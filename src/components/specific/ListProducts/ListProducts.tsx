//* Libraries imports
import { useEffect, useState } from 'react';
import { Trash, Plus } from 'phosphor-react-native';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

//* Local imports
import firebase from "@services/connectionFirebase";

type Props = {
  data: any;
  deleteItem: (id: number) => void;
  editItem: (id: number) => void;
}

export default function ListProducts({ data, deleteItem, editItem }: Props) {
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState<any[]>([]);

  useEffect(() => {
    async function search() {
      setLoading(true);
      setCars([]);
      await firebase.database().ref('products').on('value', (snapshot) => {
        snapshot.forEach((childItem) => {
          let data = {
            // de acordco com a chave de cada item, ele vai pegar o valor de cada um
            key: childItem.key,
            name: childItem.val().name,
            brand: childItem.val().brand,
            price: childItem.val().price,
            color: childItem.val().color,
          }
          setCars(oldArray => [...oldArray, data]);
        })
      })
      setLoading(false);
    }
    search();
  }, []);

  return (
    <View className='w-full flex flex-col justify-center items-center'>
      <Text>Carro: {data.name}</Text>
      <Text>Marca: {data.brand}</Text>
      <Text>Preço(R$): {data.price}</Text>
      <Text>Cor: {data.color}</Text>

      <View className='w-full flex flex-row justify-center items-center'>
        <TouchableOpacity onPress={() => deleteItem(data.id)}>
          <Trash size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => editItem(data.id)}>
          <Plus size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
