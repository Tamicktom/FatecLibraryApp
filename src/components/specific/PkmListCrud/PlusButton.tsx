//* Libraries imports
import { TouchableOpacity } from 'react-native';
import { Plus } from 'phosphor-react-native';

type PlusButtonProps = {
  onPress: () => void;
}

export default function PlusButton(props: PlusButtonProps) {
  return (
    <TouchableOpacity
      className='absolute z-10 flex items-center justify-center p-3 rounded-lg bg-neutral-500 bottom-4 right-4'
      onPress={props.onPress}
    >
      <Plus size={32} weight='fill' color='white' />
    </TouchableOpacity>
  );
}