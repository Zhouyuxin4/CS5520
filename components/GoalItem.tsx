import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Text, Button, Modal, Alert, Image} from 'react-native';
import { useState } from 'react';
import { GoalDB }from"@/App"

interface GoalItemProps{
  goalObj:GoalDB
  deleteHandler:(deleteId:string)=>void
}

export default function GoalItem({goalObj, deleteHandler}:GoalItemProps){
    return (
        <View style={styles.output}>
          <Text style={styles.text}>{goalObj.text}</Text>
          <Button title="X" onPress={()=>{deleteHandler(goalObj.id)}}/>
        </View>
      );
}

const styles = StyleSheet.create({
    output: {
      marginBottom: 30,
      backgroundColor: "#ccc",
      padding: 10,
      borderRadius: 10,
      flexDirection:"row",
      alignItems:"center"
    },
    text:{
      color:"#800080",
      fontSize:16,
    }
  });
  