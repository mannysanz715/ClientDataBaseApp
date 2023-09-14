import { StyleSheet, Text, View, TextInput, Pressable, Button, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useRouter, Link } from "expo-router";
import * as Contacts from 'expo-contacts';
import * as tokenCtrl from '../service/tokenService.js';
import * as customerService from '../service/customerService.js';

//?Components

import NavBar from "../components/NavBar/NavBar.jsx";
import CustomerInfoForm from "../components/CustomerInfoForm/CustomerInfoForm.jsx";
import ContactModal from '../components/ContactModal/ContactModal.jsx'
import CreateCustomerForm from "../components/CreateCustomerFrorm/CreateCustomerForm.jsx";



export default function Home (){
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState()
  const [customers, setCustomers] = useState()
  const [contactsList, setContacts] = useState();
  const [modalState, setModalState] = useState(false)
  const [createContactModal, setCreateContactModal] = useState(false)
  const [contactListHeight, setContactListHeight] = useState()


  useEffect(() => {
    (async ()=>{
      const allCustomers = await customerService.getAllCustomers()
      setCustomers(allCustomers.reverse())
      })();
  },[]);

  useEffect(() => {
    (async ()=>{
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const data  = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Addresses, Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          setContacts(data)
        }
      }
      })();
  },[])

  function buttonPress(customerId){
    router.push({ pathname: "/Details", params: { id: customerId}})
  }

  async function logUserOut(){
    await tokenCtrl.logOut('tokenKey')
    router.replace('/')
  } 

  function changeModalState(e){
    setModalState(!modalState)
  }

  function handleSearchTerm(text){
    setSearchTerm(text)
  }
  function changeContactModal(){
    setCreateContactModal(!createContactModal)
  }



  return(

    <View style={styles.container}>
      <NavBar />
    
      <TextInput onChangeText={(text)=> handleSearchTerm(text)} placeholder="Search For Customer" style={styles.searchBar} />
      {searchTerm ? 
      <ScrollView>
        {customers.filter(customer =>{
                const tempSearchTerm = searchTerm.toLowerCase()
                let customerName = customer.name.toLowerCase()
                return tempSearchTerm && customerName.includes(tempSearchTerm)}).map((customer, idx)=>
              <Pressable key={idx} onPress={()=> buttonPress(customer._id)} style={styles.linkContainer}>
                  <Text>{customer.name}</Text>
              </Pressable>
            )
        }
      </ScrollView> 
      :
      <ScrollView style={styles.customerCardContainer}>
      {customers && customers.map((customer, idx)=>
        <Pressable key={idx} onPress={()=> buttonPress(customer._id)} style={styles.linkContainer}>
          <Text>{customer.name}</Text>
        </Pressable>
      )}

      </ScrollView>
      }

      {createContactModal ? <CreateCustomerForm/> : null}
        <Pressable style={styles.footer} onPress={changeContactModal}>
          {createContactModal ? <Text>Exit Contact Modal</Text> : <Text>Create New Contact</Text>}
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: 100,
    height: 40,
    textAlign: 'center',
    borderWidth: .5,
    backgroundColor: '#ADD8E6',
  },
  linkButton:{
    backgroundColor: 'white',
    margin: 'auto',
    width: '100%',
    display:'flex',
    alignItems: 'center',
    height:'100%',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: "600",
    backgroundColor: '#094074',
    color: 'white',
  },
  linkContainer:{
    borderColor: 'gray',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderBottomWidth: .2,
    width:'100%',
    height: 60,
  },
  customerCardContainer:{
    height: '70%',
    display:'flex',
    width: '100%',
  },
  searchBar:{
    height: 45,
    color: 'black',
    fontSize:16,
    backgroundColor: '#D3D3D3',
    width: '90%',
    margin: 15,
    borderRadius: 10,
    textAlign: 'center',
  },

}
)

