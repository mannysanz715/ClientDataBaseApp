import { StyleSheet, Text,View, Button} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import * as Contacts from 'expo-contacts';
import * as tokenCtrl from '../service/tokenService.js';
import * as customerService from '../service/customerService.js';

//?Components

import NavBar from "../components/NavBar/NavBar.jsx";
import CustomerInfoForm from "../components/CustomerInfoForm/CustomerInfoForm.jsx";
import ContactModal from '../components/ContactModal/ContactModal.jsx'
export default function Home (){
  const router = useRouter()
  const [customers, setCustomers] = useState()
  const [contactsList, setContacts] = useState();
  const [modalState, setModalState] = useState(false)

  useEffect(() => {
    (async ()=>{
      const allCustomers = await customerService.getAllCustomers()
      setCustomers(allCustomers)
      })();
  },[]);

  // useEffect(() => {
  //   (async ()=>{
  //     const { status } = await Contacts.requestPermissionsAsync();
  //     if (status === 'granted') {
  //       const data  = await Contacts.getContactsAsync({
  //         fields: [Contacts.Fields.Addresses, Contacts.Fields.PhoneNumbers],
  //       });
  //       if (data.length > 0) {
  //         setContacts(data)
  //       }
  //     }
  //     })();
  // },[])

  async function logUserOut(){
    await tokenCtrl.logOut('tokenKey')
    router.replace('/')
  } 

  function changeModalState(e){
    setModalState(!modalState)
  }

  return(
    <View>
      <NavBar />
      <Text onPress={changeModalState} style={styles.button}>Open Contacts List</Text>
      {customers && customers.map((customer, idx)=>
        <Text key={idx}>{customer.name}</Text>
      )}
      <Button title="Log Out" onPress={logUserOut}/>
      <CustomerInfoForm />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 40,
    textAlign: 'center',
    borderWidth: .5,
    backgroundColor: '#ADD8E6',
  }
}
)

