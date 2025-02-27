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
  const [users, setUsers] = useState<string[]>([]); 


  useEffect(() => {
    async function getUsers() {
      try {
        const userFromDB = await readAllFromDB(`goals/${goalId}/users`);
        console.log("read from db ");
        if (userFromDB) {
          const userNames = userFromDB.map((user: Users) => {
            return user.name;
          });
          setUsers(userNames);
          return;
        }
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        console.log("reeading from API");
        if (!response.ok) {
          throw new Error(
            `Something went wrong with the ${response.status} code`
          );
        }
        const data = await response.json();
        const userNames = data.map((user: Users) => {
          writeToDB(user, `goals/${goalId}/users`);
          return user.name;
        });
        setUsers(userNames);
      } catch (err) {
        console.log("fetching users ", err);
      }
    }
    getUsers();
  }, []);

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return <Text>{item}</Text>;
        }}
      />
    </View>
  );
}
