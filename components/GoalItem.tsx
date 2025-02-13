import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Text, Button, Modal, Alert, Image} from 'react-native';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { useRouter } from 'expo-router';

interface GoalItemProps{
  goalObj:{
    text: string;
    id: string;
  }
  deleteHandler:(deleteId:string)=>void
}

export default function GoalItem({goalObj, deleteHandler}:GoalItemProps){
    return (
        <View style={styles.output}>
          <Text style={styles.text}>{goalObj.text}</Text>
          <Button title="X" onPress={()=>{deleteHandler(goalObj.id)}}/>
          <Link  href={`/goals/${goalObj.id}`}>info</Link>
          {/* <Button title="info"
          onPress={()=>{ 
            router.navigate(`/goals/${goalObj.id}`)
          }}/> */}
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
  