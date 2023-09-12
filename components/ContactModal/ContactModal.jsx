import { Text, ScrollView, StyleSheet} from "react-native"

import { useState } from "react"
function ContactModal({ contacts }){
  // console.log(contacts[26].name, contacts[26].phoneNumbers[0].number, '\n', contacts[26].addresses[0].formattedAddress)
  return (
      <ScrollView style={styles.container}>
        {contacts.map((contact, idx)=>      
        <Text style={styles.item} key={idx}>{contact.name}</Text> 
        )}
      </ScrollView>
)
}
const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 500,
  },
  item: {
    height: 60,
    borderWidth: .5,
    padding: 2,
    margin: 5,
  }
})
export default ContactModal