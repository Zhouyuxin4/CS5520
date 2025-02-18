import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Text, Button, Modal, Alert, Image, Pressable} from 'react-native';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { useRouter } from 'expo-router';
import { GoalFromDB } from '@/app';

interface GoalItemProps{
  goalObj:GoalFromDB;
  deleteHandler:(deleteId:string)=>void
}

export default function GoalItem({goalObj, deleteHandler}:GoalItemProps){
    return (
        <Pressable 
          style={styles.output}
          onPress={()=>{
            router.navigate(`/goals/${goalObj.id}`)
          }}
          
        >
          <Text style={styles.text}>{goalObj.text}</Text>
          <Button title="X" onPress={()=>{deleteHandler(goalObj.id)}}/>
          {/* <Button title="info"
          onPress={()=>{ 
            router.navigate(`/goals/${goalObj.id}`)
          }}/> */}
        </Pressable>
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
  