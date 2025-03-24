import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as Location from 'expo-location';

export default function LocationManager() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    
    async function verifyPermission(){
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return false;
        }
        return true;
      }

    async function locateUserHandler(){
        const hasPermission = await verifyPermission();
        if(hasPermission){
        try {
          const response = await Location.getCurrentPositionAsync();
          setLocation(response)
          console.log(response.coords.altitude,response.coords.longitude)
        }
        catch (err) {
            console.log(err)
        }
      }
    };

  return (
    <View>
      <Button title="find my location" onPress={locateUserHandler}/>
    </View>
  )
}

const styles = StyleSheet.create({})