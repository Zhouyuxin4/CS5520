import {View, Text, StyleSheet, Dimensions} from 'react-native'
import React from 'react'

interface HeaderProps{
    name: string;
}

export default function Header({name}: HeaderProps) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  console.log(windowWidth, windowHeight)
  return (
    <View>
      <Text style = {styles.greetings}>Welcome to {name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    greetings:{
      color:"purple",
      fontSize:20
    }
  });