import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [text, setText] = useState("")

  function updateText(changedText:string){
    console.log(changedText),
    setText(changedText)
  }

  return (
    <View style={styles.container}>
      <TextInput value={text} 
      onChangeText={updateText}
      placeholder='1'/>

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
