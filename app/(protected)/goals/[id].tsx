import { View, Text, Button, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { GoalData, readDocFromDB, updateDB } from "@/Firebase/firestoreHelper";
import Entypo from '@expo/vector-icons/Entypo';
import PressableButton from "@/components/PressableButton";
import GoalUsers from "@/components/GoalUsers";
import ImageManager from "@/components/ImageManager";
import { storage } from "@/Firebase/firebaseSetup";
import { getDownloadURL, ref } from "firebase/storage";


export default function GoalDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [goal, setGoal] = useState<GoalData | null>(null);
  const [warning, setWarning] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  //   const navigation = useNavigation();

  useEffect(() => {
    async function getData() {
      try {
        const data = (await readDocFromDB(id, "goals")) as GoalData;
        if (data != null) {
          if (data?.warning) {
            setWarning(true);
          }
          if(data.imageUri){
            const imageRef = ref(storage,data.imageUri)
            const url = await getDownloadURL(imageRef)
            console.log(url)
            setImageUrl(url)
          }
          setGoal(data);
          //   navigation.setOptions({ headerTitle: data.text });
        }
      } catch (e) {
        console.log("get data in GoalDetails", e);
      }
    }
    getData();
  }, []);
  function warningHandler() {
    setWarning(true);
    updateDB(id, "goals", { warning: true });
  }
  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: goal ? (warning ? "warning" : goal.text) : "",
          headerRight: () => {
            return <PressableButton 
            pressedHandler={warningHandler}
            >
            <Entypo name="warning" size={24} color="black" />
          </PressableButton>;
          },
        }}
      />
      <Text style={warning && styles.warningText}>Details of {goal?.text}</Text>
      <GoalUsers goalId={id}/>
      {imageUrl && (
      <Image source={{ uri: imageUrl}} style={styles.image}/>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  warningText: { color: "red" },
  image: {
    width: 200,       
    height: 200,
    alignSelf: "center", 
  },
});