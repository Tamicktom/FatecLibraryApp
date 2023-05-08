//* Libraries imports
import { TextInput } from "react-native";

type InputTwoProps = {
  value?: string;
  placeholder?: string;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
  onChangeText: (text: string) => void;
};

export default function InputTwo(props: InputTwoProps) {

  return (
    <TextInput
      className='w-full px-4 py-2 mb-2 text-xl rounded-lg bg-slate-300'
      placeholder={props.placeholder}
      value={props.value}
      keyboardType={props.keyboardType}
      onChangeText={props.onChangeText}
    />
  );
}