//* Libraries imports
import { TouchableOpacity } from 'react-native';
import { Plus } from 'phosphor-react-native';
import colors from "tailwindcss/colors";

type PlusButtonProps = {
  onPress: () => void;
}

export default function PlusButton(props: PlusButtonProps) {
  return (
    <TouchableOpacity
      className='absolute z-10 flex items-center justify-center p-3 border-2 bg-neutral-100 rounded-2xl border-neutral-400 bottom-4 right-4'
      onPress={props.onPress}
    >
      <Plus size={32} weight='fill' color={colors.neutral[400]} />
    </TouchableOpacity>
  );
}