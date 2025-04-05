import {
    Alert,
    Button,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import {
    getCurrentPositionAsync,
    useForegroundPermissions,
  } from "expo-location";
  import { router, useLocalSearchParams } from "expo-router";
import { readDocFromDB, writeToDB } from "@/Firebase/firestoreHelper";
import { auth } from "@/Firebase/firebaseSetup";
  
  export interface LocationData {
    latitude: number;
    longitude: number;
  }

  export default function LocationManager() {
    const params = useLocalSearchParams();
    console.log("params",params)
    // if (params) update the location state variable
    // useEffect(() => {
    //   if (params) {
    //     setLocation({
    //       latitude: parseFloat(Array.isArray(params.latitude) ? params.latitude[0] : params.latitude),
    //       longitude: parseFloat(Array.isArray(params.longitude) ? params.longitude[0] : params.longitude),
    //     });
    //   }
    // }, [params]);

    useEffect(()=>{
      async function fetchUserData(){
        if(auth?.currentUser?.uid){
          try{
            const data = await readDocFromDB(auth.currentUser.uid,"users");
            if(data?.address?.geo){
              setLocation({
                latitude:parseFloat(data.address.geo.lat),
                longitude:parseFloat(data.address.geo.lng),
              })
              console.log(location)
            }
          }catch(e){
            console.log("error in getting data", e)
          }
        }
      }
      fetchUserData()
    },[])

    const [permissionResponse, requestPermission] = useForegroundPermissions();
    const [location, setLocation] = useState<LocationData | null>(null);
    async function verifyPermission() {
      try {
        if (permissionResponse?.status === "granted") {
          return true;
        }
        const responseFromUser = await requestPermission();
        return responseFromUser.granted;
      } catch (e) {
        console.log("Error in verifyPermission", e);
      }
    }
    async function locateUserHandler() {
      try {
        const hasPermission = verifyPermission();
        if (!hasPermission) {
          Alert.alert("You need to give permission to access location");
          return;
        }
        // only continue if hasPermission is true
        const response = await getCurrentPositionAsync();
        setLocation({
          latitude: response.coords.latitude,
          longitude: response.coords.longitude,
        });
      } catch (e) {
        console.log("Error in getting location", e);
      }
    }
    function chooseLocationHandler() {
      router.navigate({
        pathname:"map",
        params: {
          initlatitude: params?.latitude,
          initlongitude: params?.longitude,
        },
      });
    }
    if (location)
      console.log(
        `https://maps.googleapis.com/maps/api/staticmap?center=${location?.latitude},${location?.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location?.latitude},${location?.longitude}&key=${process.env.EXPO_PUBLIC_mapsAPIKey}`
      );
    return (
      <View>
        <Text>latitude:{params?.latitude}</Text>
        <Text>longitude:{params?.longitude}</Text>
        <Button title="Find My Location" onPress={locateUserHandler} />
        <Button
          title="Let me choose on the map"
          onPress={chooseLocationHandler}
        />
      <Button
        disabled={!params}
        title="Save Location to Firestore"
        onPress={async () => {
          if (!params || params.latitude === undefined || params.longitude === undefined) {
            alert("Location is not available");
            return;
          }
          await writeToDB(
            {
              address: {
                geo: {
                  lat: params.latitude.toString(),
                  lng: params.longitude.toString(),
                },
              },
            },
            "users",
            auth.currentUser?.uid
          );
          router.back();
        }}
        
      />
        {location && (
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location?.latitude},${location?.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location?.latitude},${location?.longitude}&key=${process.env.EXPO_PUBLIC_mapsAPIKey}`,
            }}
            style={styles.map}
          />
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    map: {
      width: Dimensions.get("window").width,
      height: 200,
      marginTop: 10,
    },
  });