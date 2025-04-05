import { View, Button, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";

export default function NotificationManager() {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    async function verifyPermission() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        setHasPermission(newStatus === "granted");
      } else {
        setHasPermission(true);
      }
    }
    verifyPermission();
  }, []);

  async function scheduleNotificationHandler() {
    if (!hasPermission) {
      Alert.alert("Permission Required", "Please enable notifications in settings.");
      return;
    }
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Reminder",
          body: "Please update your goals!", 
        },
        trigger: { 
          seconds: 5, 
          repeats: false, 
        } as Notifications.TimeIntervalTriggerInput,
      });
    } catch (err) {
      console.error("Notification scheduling error:", err);
    }
  }

  return (
    <View>
      <Button title="Send Notification" onPress={scheduleNotificationHandler} />
    </View>
  );
}
