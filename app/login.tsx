//* Libraries imports
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import { useState, useEffect } from "react";

//* Components imports
import StyledInput from '../src/components/common/StyledInput/StyledInput';

export default function Login() {
  const [userCredentials, setUserCredentials] = useState({
    email: "", password: ""
  });

  useEffect(() => {
    console.log(userCredentials);
  }, [userCredentials])

  return (
    <SafeAreaView className="flex-1">
      <View className='flex flex-col items-center justify-center flex-1 w-full h-full bg-black'>
        <StyledInput
          label="Insira seu email"
          setValue={(e) => { setUserCredentials({ ...userCredentials, email: e }) }}
        />
        <StyledInput
          label="Insira sua senha"
          setValue={(e) => { setUserCredentials({ ...userCredentials, password: e }) }}
          password
        />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
