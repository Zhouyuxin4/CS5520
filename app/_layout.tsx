import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function Layout() {
  return <Stack screenOptions={{
    headerStyle: {
        backgroundColor: 'purple',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
  }}>
    <Stack.Screen name="index" options={{title:"All My Goals"}}/>
    <Stack.Screen name="goals/[id]" options={{title:"Goal Details"}}/>
  </Stack>
}