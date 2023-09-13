import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import * as Contacts from 'expo-contacts';
import * as tokenService from '../service/tokenService.js'
//?Pages
import Login from "./Login";
import Home from "./Home";

export default function Page() {
  //? State Setup
  const [token, setToken] = useState('')
  const [contactsList, setContacts] = useState([]);
  //? Token Check
  useEffect(() => {
    (async ()=>{
      const tokenValue = await tokenService.getValueFor("tokenKey")
      if(tokenValue) setToken(tokenValue)
    })();
  }, [])
  //?Contacts Permisions
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Addresses, Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          setContacts(data)
        }
      }
    })();
  }, []);


  return (
    <ScrollView style={styles.container}>
      {console.log(token)}
      { !token ? <Login /> : <Home contacts={contactsList} />
      }

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
