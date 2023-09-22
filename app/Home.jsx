import { StyleSheet, Text, View, TextInput, Pressable, Button, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useRouter, Link, withLayoutContext } from "expo-router";
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
  function createManualContact(){
    router.push({pathname:"/CustomerForm"})
  }


  return(

  <View style={
    styles.mainContainer
  }>
    <View style={styles.container}>
      <NavBar />
      <TextInput onChangeText={(text)=> handleSearchTerm(text)} placeholder="Search For Customer" style={styles.searchBar} />
      {searchTerm ? 
      <ScrollView style={styles.customerCardContainer}>
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
      </View>
        <Pressable style={styles.footer} >
          {createContactModal ? <View style={styles.createCustomerContainer}>
            <Pressable onPress={createManualContact} style={styles.createCustomerButtonManual}><Text style={styles.createCustomerButtonText}>Create Manually</Text></Pressable>
            <Pressable style={styles.createCustomerButtonImport}><Text style={styles.createCustomerButtonText}>Import From Contacts</Text></Pressable>
          </View> : <Pressable onPress={changeContactModal} style={styles.createNewCustomerButton}><Text style={styles.createNewCustomerText}>Create New Contact</Text></Pressable>}
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  //? Modal For Creating New Customer
  createCustomerContainer:{
    display:'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: 80,
  },

  createCustomerButtonManual:{
    backgroundColor:"#8ecae6",
    height: '100%',
    width: '50%',
    textAlign:'center',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  createCustomerButtonImport:{
    backgroundColor:"#219ebc",
    height: '100%',
    width: '50%',
    textAlign:'center',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  createCustomerButtonText:{
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  createNewCustomerButton:{
    backgroundColor: '#023047',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems : 'center',
  },
  createNewCustomerText:{
    color:'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  footer:{
    width: '100%',
    height: 80,
  },

  //? Main Page



  container:{
    display:'flex',
    flex : 1,
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



  mainContainer:{
    flex : 1,
    width: '100%',
  },
}
)

