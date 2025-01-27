import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Text, Button, Modal, Alert, Image} from 'react-native';
import { useState } from 'react';

interface GoalItemProps{
  goalObj:{
    text: string;
    id: number;
  }
  deleteHandler:(deleteId:number)=>void
}

export default function GoalItem({goalObj, deleteHandler}:GoalItemProps){
    return (
        <View style={styles.output}>
          <Text>{goalObj.text}</Text>
          <Button title="X" onPress={()=>{deleteHandler(goalObj.id)}}/>
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
      flexDirection:"row",
      alignItems:"center"
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
    }
  });
  