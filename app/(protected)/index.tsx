import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Text, Button, SafeAreaView, FlatList, ScrollView, Alert } from 'react-native';
import Header from "../../components/Header"
import Input from "../../components/Input"
import { useState, useEffect } from 'react';
import GoalItem from "../../components/GoalItem";
import { database } from '../../Firebase/firebaseSetup';
import { deleteAllFromDB, deleteFromDB, writeToDB } from '../../Firebase/firestoreHelper';
import { GoalData } from '../../Firebase/firestoreHelper';
import { collection, onSnapshot } from 'firebase/firestore';
import { query } from 'express';
import PressableButton from '@/components/PressableButton';

export interface GoalFromDB extends GoalData {
  id: string;
}
export default function App() {
  console.log(database)
  const [isFocused, setIsFocused] = useState(true);
  const [isModalVisible, setISModalVisible] = useState(false)
  const [goals, setGoals] = useState<GoalFromDB[]>([])
  const appName = "My awesome app"
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, "goals"), (querySnapshot) => {
      if (querySnapshot.empty) {
        setGoals([])
      } else {
        let newArrayOfGoals: GoalFromDB[] = []
        querySnapshot.forEach((docSnapshot) => {
          console.log(docSnapshot.id)
          const goalData: GoalData = docSnapshot.data() as GoalData;
          newArrayOfGoals.push({
            ...(docSnapshot.data() as GoalData),
            id: docSnapshot.id,
          });
          setGoals(newArrayOfGoals)
        })
      }
    });
    return () => {
      unsubscribe();
    }
  }, [])

  function handleInputData(data: string) {
    console.log("data recieved from Input", data)
    setISModalVisible(false)
    
    let newGoal: GoalData = {
      text: data,
    }
    writeToDB(newGoal, "goals")

    // let newArray = [...goals, newGoal]
    // setGoals((currentGoals) => {
    //   return ([...currentGoals, newGoal])
    // })

  }

  function handleModalVisibility() {
    setISModalVisible(true)
  }

  function handleCancelAction() {
    setISModalVisible(false)
  }

  function handleDeleteGoal(deleteId: string) {
    deleteFromDB(deleteId, "goals")
  }

  function handleDeleteAllGoals() {
    Alert.alert(
      "Delete All Goals",
      "You will delete all goals.",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: async() => {
            try{
                await deleteAllFromDB("goals");
            }
            catch(err){
              console.log(err)
            }
        }},
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.welcome}>
          <Header name={appName} />
        </View>
        <View style={styles.button}>
          <Input isFocused={isFocused} inputHandler={handleInputData} isModalVisible={isModalVisible} onCancel={handleCancelAction} />
          <PressableButton 
          pressedHandler={handleModalVisibility}
          componentStyle={{backgroundColor:"purple", borderRadius:10}}>
            <Text style={styles.addGoalButton}>add a goal</Text>
          </PressableButton>
          {/* <Button title="Add a goal" onPress={handleModalVisibility} /> */}
          </View>
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          style={styles.contentContainer}
          contentContainerStyle={styles.innerContainer}
          data={goals}
          renderItem={({ item, separators}) => {
            return <GoalItem goalObj={item} deleteHandler={handleDeleteGoal} separators={separators}/>
          }}
          ListEmptyComponent={<Text style={styles.text}>No goals to show</Text>}
          ListHeaderComponent={goals.length > 0 ? (<Text style={styles.text}>My Goals</Text>) : null}
          ListFooterComponent={goals.length > 0 ? (<Button title="Delete all" onPress={handleDeleteAllGoals} />) : null}
          ItemSeparatorComponent={({highlighted}) => {
            console.log('Highlighted:', highlighted); 
            return(<View style={[styles.separator, highlighted&&styles.separatorHighlighted]} />)}}
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
  bottomContainer: {
    flex: 4,
    alignItems: 'center',
    backgroundColor: "pink",
    width: "100%"

  },
  contentContainer: {
    width: "100%"
  },
  innerContainer: {
    alignItems: "center"
  },
  text: {
    color: "#800080",
    fontSize: 18,
    margin: 20
  },
  separator: {
    height: 4,
    backgroundColor: '#808080',
    marginHorizontal: 10,
    marginBottom: 30
  },
  separatorHighlighted: {
    height: 4,
    backgroundColor: 'purple',
    marginHorizontal: 10,
    marginBottom: 30
  },
  addGoalButton:{
    padding:12,
    backgroundColor:"purple",
    color:"white",
    fontSize:18,
    borderRadius:10
  }
});