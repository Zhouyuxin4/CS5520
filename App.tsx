import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Text, Button, SafeAreaView, FlatList, } from 'react-native';
import Header from "./components/Header"
import Input from "./components/Input"
import { useState } from 'react';
import GoalItem from './components/GoalItem';

interface Goal {
  text: string;
  id: number;
}
export default function App() {
  const [isFocused, setIsFocused] = useState(true);
  const [isModalVisible, setISModalVisible] = useState(false)
  const [goals, setGoals] = useState<Goal[]>([])
  const appName = "My awesome app"

  function handleInputData(data: string) {
    console.log("data recieved from Input", data)
    setISModalVisible(false)

    let newGoal: Goal = {
      text: data,
      id: Math.random()
    }
    let newArray = [...goals, newGoal]
    setGoals((currentGoals) => {
      return ([...currentGoals, newGoal])
    })

  }

  function handleModalVisibility() {
    setISModalVisible(true)
  }

  function handleCancelAction() {
    setISModalVisible(false)
  }

  function handleDeleteGoal(deleteId:number){
    const newArray=goals.filter((goalObj)=>{
      return goalObj.id != deleteId
    })
    setGoals(()=>newArray)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.welcome}>
          <Header name={appName} />
        </View>
        <View style={styles.button}>
          <Input isFocused={isFocused} inputHandler={handleInputData} isModalVisible={isModalVisible} onCancel={handleCancelAction} />
          <Button title="Add a goal" onPress={handleModalVisibility} /></View>
      </View>
      <View style={styles.buttonContainer}>
      <FlatList
        data={goals}
        renderItem={({ item }) => {
          return <GoalItem goalObj={item} deleteHandler={handleDeleteGoal}/>
        }}
      />
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
  welcome: {
    borderColor: "purple",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    marginTop: 20,
    width: "30%"
  },
  output: {
    marginTop: 100,
    color: "purple",
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 10,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 4,
    alignItems: 'center',
    backgroundColor: "pink",
    width: "100%"
  }
});
