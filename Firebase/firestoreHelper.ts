import { database } from "./firebaseSetup";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore"; 

export interface GoalData{
    text: string;
}
export async function writeToDB(data:GoalData, collectionName:string){
    try{
        const docRef = await addDoc(collection(database,collectionName),data)
    }
    catch(err){
        console.error(err)
    }
}
export async function deleteFromDB(id:string, collectionName:string){
    try{
        await deleteDoc(doc(database, collectionName, id));
    }
    catch (err) {
        console.log(err)
      }
}
export async function deleteAllFromDB(collectionName: string){
    try{
        const querySnapshot = await getDocs(collection(database,collectionName));
        querySnapshot.forEach(async (docSnapshot)=>{
            try{
                await deleteDoc(doc(database, collectionName, docSnapshot.id));
            }
            catch(err){
                console.log(err)
            }
        })
    }
    catch (err) {
        console.log(err)
      }
}