import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Text, Button, Modal, Alert, Image, Pressable} from 'react-native';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { useRouter } from 'expo-router';
import { GoalFromDB } from '@/app/(protected)';
import PressableButton from './PressableButton';
import EvilIcons from '@expo/vector-icons/EvilIcons';

interface GoalItemProps{
  goalObj:GoalFromDB;
  deleteHandler:(deleteId:string)=>void
  separators: Separators
}

interface Separators {
  highlight: () => void;
  unhighlight: () => void;
}

export default function GoalItem({goalObj, deleteHandler, separators}:GoalItemProps){
    return (
        <Pressable 
        onPressIn={() => separators.highlight()}
        onPressOut={() => separators.unhighlight()}
          android_ripple={styles.androidRipple}
          style={({pressed})=>{
            return [styles.output, pressed&&styles.pressed];
          }}
          //style={styles.output}
          onPress={()=>{
            router.navigate(`/goals/${goalObj.id}`)
          }}
          onLongPress={()=>{
            Alert.alert(
              'Delete Goal',
              'Are you sure you want to delete this goal?',
              [
                {
                  text: 'No',
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () =>  deleteHandler(goalObj.id),
                  style: 'destructive',
                },
              ],
            );
          }}
        >
          <Text style={styles.text}>{goalObj.text}</Text>
          <PressableButton 
          pressedHandler={()=>{
              deleteHandler(goalObj.id)
            }}
          componentStyle={{backgroundColor:"grey"}}
          pressedStyle={styles.pressed}
          >
          <EvilIcons name="trash" size={30} color="black" />
          </PressableButton>
          {/* <Button title="X" onPress={()=>{ }/> */}
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
      backgroundColor: "grey",
      padding: 12,
      borderRadius: 10,
      flexDirection:"row",
      alignItems:"center",
    },
    text:{
      color:"#800080",
      fontSize:16,
      paddingHorizontal:15
    },
    pressed:{
      backgroundColor: "grey",
      opacity:0.5
    },
    androidRipple:{
      color:"red",
    }
  });
  