import { readAllFromDB, writeToDB } from "@/Firebase/firestoreHelper";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

export interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface GoalUserProps{
    goalId:string
}

export default function GoalUser({goalId}:GoalUserProps) {
  const [users, setUsers] = useState<Users[]>([]); 

  useEffect(() => {
    async function getUsers() {
      try {
        console.log("read from db")
        const userFromDB= await readAllFromDB(`goals/${goalId}/users`);
        console.log(userFromDB)
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`Something went wrong: ${response.status}`);
        }
        const data: Users[] = await response.json(); 
        data.forEach(user => {
            writeToDB(user, `goals/${goalId}/users`);
          });
        setUsers(data)
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }
    getUsers();
  }, []);

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
