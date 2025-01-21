import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Text, Button, Modal, Alert} from 'react-native';
import { useState } from 'react';

interface InputProps {
  isFocused: boolean;
  inputHandler: (data: string) => void;
  isModalVisible: boolean;
  onCancel:()=>void;
}

export default function App({ isFocused, inputHandler, isModalVisible,onCancel}: InputProps) {
  const [text, setText] = useState(''); 
  const [counter, setCounter] = useState('');
  const [blur, setBlur] = useState(false);

  function updateText(changedText: string) {
    setText(changedText);
    setCounter(changedText.length.toString());
    setBlur(false);
  }

  function handleFocused() {
    setBlur(false);
  }

  function handleBlur() {
    setBlur(true);
  }

  function handleConfirm() {
    console.log('User input:', text);
    inputHandler(text);
  }

  function handleCancel() {
    Alert.alert(
      "Cancel?",
      "Are you sure you want to cancel?",
      [
        { text: "cancel", style: "cancel" },
        { text: "OK", onPress: () => onCancel() }
      ]
    );
  }

  return (
    <Modal visible={isModalVisible} animationType='slide' transparent={true}>
      <View style={styles.container}>
        <View style={styles.box}>
          <TextInput
            value={text}
            onChangeText={updateText}
            onFocus={handleFocused}
            onBlur={handleBlur}
            placeholder='enter your goal'
            autoFocus={isFocused}
            style={styles.input}
          />
          {text && !blur ? (
            <Text>character count: {counter}</Text>
          ) : (
            blur &&
            (text.length >= 3 ? <Text>Thank you</Text> : <Text>Please type more than 3 characters</Text>)
          )}
          <View style={styles.button}>
            <Button title="Cancel" onPress={handleCancel}></Button>
            <Button title='Confirm' onPress={handleConfirm} />
          </View>
          <StatusBar style='auto' />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  box: {
    backgroundColor: 'lightgrey', 
    borderRadius: 20, 
    padding: 30,
    alignItems: 'center', 
    width: '50%', 
  },
  input: {
    borderColor: 'purple',
    color:'dodgerblue',
    borderWidth: 2,
    padding: 10,
    marginTop:20,
    width: '100%', 
  },
  button: {
    width:"60%",
    marginTop: 20,
  },
});
