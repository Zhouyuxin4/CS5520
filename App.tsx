import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View } from 'react-native';
import Header from "./components/Header"
import Input from "./components/Input"

export default function App() {
  const appName = "My awesome app"


  return (
    <View style={styles.container}>
      <Header name = {appName}/>
      <Input/>
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
