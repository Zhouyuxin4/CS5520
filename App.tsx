import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Text, Button, SafeAreaView,} from 'react-native';
import Header from "./components/Header"
import Input from "./components/Input"
import { useState } from 'react';

export default function App() {
  const [isFocused, setIsFocused] = useState(true);
  const [recievedData, setRecievedData] = useState("")
  const [isModalVisible, setISModalVisible] = useState(false)
  const appName = "My awesome app"

  function handleInputData(data: string){
    console.log("data recieved from Input", data)
    setRecievedData(data)
    setISModalVisible(false)
  }

  function handleModalVisibility(){
    setISModalVisible(true)
  }

  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.welcome}>
      <Header name={appName}/>
      </View>
      <View style = {styles.button}>
      <Input isFocused={isFocused} inputHandler={handleInputData} isModalVisible={isModalVisible}   />
      <Button title="Add a goal" onPress={handleModalVisibility}/></View>
      <View><Text 
        onPress={() => setIsFocused(!isFocused)}  style = {styles.output}
      >{recievedData}
      </Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome:{
    borderColor:"purple",
    borderWidth:2,
    borderRadius:10,
    padding:10,
  },
  button:{
    marginTop:20,
    width:"30%"
  },
  output:{
    marginTop:20,
    color:"purple",
    fontSize:18
  }
});
