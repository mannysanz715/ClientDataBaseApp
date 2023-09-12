import { ScrollView, StyleSheet, Text, View } from "react-native";
import Home from "./home/Home";
import { useState, useEffect } from "react";
import * as Contacts from 'expo-contacts';

export default function Page() {
const [contactsList, setContacts] = useState([]);

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
      <Home contacts={contactsList}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
