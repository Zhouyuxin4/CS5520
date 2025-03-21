import { Alert, Button, StyleSheet, Image, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions } from 'expo-image-picker';

interface ImageManagerProps{
    imageUriHandler: (uri: string) => void; 
}

export default function ImageManager({ imageUriHandler }: ImageManagerProps) {
    const [response, requestPermission] = useCameraPermissions();
    const [imageUri, setImageUri] = useState("")

    async function verifyPermission(){
        if(response?.granted){
            return true;
        }
       requestPermission();
    }

    async function takeImageHandler(){
        try{
            const hasPermission = await verifyPermission();
            if (!hasPermission){
                Alert.alert("you need to give permission to camera.")
                return;
            }
            const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if (result.assets) {
            const asset = result.assets[0]; 
            setImageUri(asset.uri); 
            imageUriHandler(asset.uri); 
            console.log(result);
          }
    }
        catch(err){
            console.error
        }
    }
    return (
        <View>
        <Button title="take an image" onPress={takeImageHandler}/>
        {imageUri && (
        <Image
            source={{
            uri: imageUri, 
            }}
            style={{ width: 200, height: 200 }} 
        />
        )}
        </View>
    )
    }

const styles = StyleSheet.create({})