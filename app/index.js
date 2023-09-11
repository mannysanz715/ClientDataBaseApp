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
        fields: [Contacts.Fields.Emails],
      });
      if (data.length > 0) {
        setContacts(data)
      }
    }
  })();
}, []);
  return (
    <ScrollView>
      <Home contacts={contactsList}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
