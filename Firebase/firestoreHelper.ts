import { database } from "./firebaseSetup";
import { collection, addDoc, deleteDoc, doc, getDocs, setDoc, getDoc } from "firebase/firestore"; 

export interface GoalData {
    text: string;
    warning?: boolean;
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

export async function readDocFromDB(id: string, collectionName: string) {
    try {
      const docRef = doc(database, collectionName, id);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      }
      return null;
    } catch (e) {
      console.error("Error reading document: ", e);
    }
}

export async function updateDB(
    id:string,
    collectionName:string,
    data:{[key:string]:any}
){
    try{
        await setDoc(doc(database, collectionName, id), data, { merge: true })
    }catch(err){
        console.log(err)
    }
}