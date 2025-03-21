import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Text, Button, Modal, Alert, Image} from 'react-native';
import { useState } from 'react';
import ImageManager from './ImageManager';
import { UserInput } from '@/app/(protected)';

interface InputProps {
  isFocused: boolean;
  inputHandler: (data: UserInput) => void;
  isModalVisible: boolean;
  onCancel:()=>void;
}

export default function App({ isFocused, inputHandler, isModalVisible,onCancel}: InputProps) {
  const [text, setText] = useState(''); 
  const [counter, setCounter] = useState('');
  const [blur, setBlur] = useState(false);
  const [takenImageUri, setTakenImageUri] = useState("")
  const minLength = 3
  const localImage = require('../assets/goal-image.png')

  const handleImageUri = (uri: string) => {
    setTakenImageUri(uri); // Store the image URI in the state
  };

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
    inputHandler({ text: text, imageUri: takenImageUri });
    setText("")
  }

  function handleCancel() {
    setText("")
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
        <Image
            style={styles.image}
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }}
            alt="Goal icon from website"
          />
        <Image
            style={styles.image}
            source={localImage}
            alt="Goal icon from local"
          />
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
            (text.length >= minLength ? <Text>Thank you</Text> : <Text>Please type more than 3 characters</Text>)
          )}
        <ImageManager  imageUriHandler={handleImageUri} />
        <View style={styles.button}>
        <View style={styles.buttonWrapper}>
            <Button title="Cancel" onPress={handleCancel} />
        </View>
        <View style={styles.buttonWrapper}>
            <Button title='Confirm' onPress={handleConfirm} disabled={text.length < minLength} />
        </View>
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
    width: '70%', 
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
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems: 'center',
    marginTop: 20
  },
  buttonWrapper:{
    marginHorizontal: 10,
  },
  image:{
    width:100,
    height:100,
    marginBottom:10
  }
});
