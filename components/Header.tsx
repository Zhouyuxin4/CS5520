import {View, Text, StyleSheet} from 'react-native'
import React from 'react'

interface HeaderProps{
    name: string;
}

export default function Header({name}: HeaderProps) {
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