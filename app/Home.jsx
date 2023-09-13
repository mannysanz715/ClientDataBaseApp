import { StyleSheet, Text,View, Pressable, Button} from "react-native";
import { useState, useEffect } from "react";
import { useRouter, Link } from "expo-router";
import * as Contacts from 'expo-contacts';
import * as tokenCtrl from '../service/tokenService.js';
import * as customerService from '../service/customerService.js';

//?Components

import NavBar from "../components/NavBar/NavBar.jsx";
import CustomerInfoForm from "../components/CustomerInfoForm/CustomerInfoForm.jsx";
import ContactModal from '../components/ContactModal/ContactModal.jsx'
import { ScrollView } from "react-native-gesture-handler";
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

  function buttonPress(customerId){
    
  }

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
      <ScrollView style={styles.customerCardContainer}>
      {customers && customers.map((customer, idx)=>
        <Link style={styles.customerCardTextContainer} href={{pathname: "", params: {id: customer._id}}}><Pressable style={styles.customerCardTextContainer} onPress={()=> buttonPress(customer._id)} key={idx}><Text style={styles.customerCard}> {customer.name} </Text></Pressable></Link>
      )}
      </ScrollView>
      <Button title="Log Out" onPress={logUserOut}/>
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
  },
  customerCard:{
    padding: 10,
    width: 'auto',
    height: 'auto',
  },

  customerCardTextContainer: {
    display: 'flex',
    justifyContent: "center",
    alignItems:'center',
    height: 75,
    borderBottomWidth: .2,
    borderColor: 'gray',
  },
  customerCardContainer:{
    height: '75%',
  }
}
)

