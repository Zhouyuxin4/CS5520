import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import Header from "./components/Header"
import Input from "./components/Input"
import { useState } from 'react';

export default function App() {
  const [isFocused, setIsFocused] = useState(true);
  const [recievedData, setRecievedData] = useState("")
  const appName = "My awesome app"

  function handleInputData(data: string){
    console.log("data recieved from Input", data)
    setRecievedData(data)
  }

  return (
    <View style={styles.container}>
      <Header name={appName} />
      <Input isFocused={isFocused} inputHandler={handleInputData} />
      <Text 
        onPress={() => setIsFocused(!isFocused)}
      >{recievedData}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
