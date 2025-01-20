import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Text, Button} from 'react-native';
import { useState } from 'react';

interface InputProps{
    isFocused: boolean;
    inputHandler: (data: string)=>void;
}



export default function App({isFocused, inputHandler}:InputProps) {
  const [text, setText] = useState("")
  const [counter, setCounter] = useState("")
  const [blur, setBlur] = useState(false)

  function updateText(changedText:string){
    setText(changedText);
    setCounter(changedText.length.toString())
    setBlur(false)
  }

  function handleFocused(){
    setBlur(false);
  }

  function handleBlur(){
    setBlur(true);
  }

  function handleConfirm(){
    console.log('User input:', text);
    inputHandler(text);
  }

  return (
    <View >
      <TextInput value={text} 
      onChangeText={updateText}
      onFocus={handleFocused}
      onBlur={handleBlur}
      placeholder='enter here'
      autoFocus={isFocused} />

    {text && !blur?(
        <Text>character count:{counter}</Text>
    ):(
        blur && (text.length >= 3?(
          <Text>Thank you</Text>  
        ):(
          <Text>Please type more than 3 characters</Text>
        ))
    )}
    <Button title="Confirm" onPress={handleConfirm} />

    <StatusBar style="auto"/>
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
