import { useLocalSearchParams, useGlobalSearchParams, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import NavBar from "../components/NavBar/NavBar";
import * as customerService from '../service/customerService.js'


function Details () {
  const router = useRouter()
  const[customer, setCustomer] = useState()
  const local = useLocalSearchParams();
  useEffect(() => {
    (async ()=>{
      const customer = await customerService.getCustomerDetails(local.id)
      setCustomer(customer)
      })();
  },[]);
  console.log(customer)

  function home(){
    console.log('press')
    router.replace('/')
  }
  return (
    <>
      {customer &&
        <View>
          <StatusBar style="light" backgroundColor="#0096FF" />
          <View style={styles.header}>
            <View></View>
            <Text style={styles.headerText}>{customer.name}</Text>
            <Pressable onPress={home}>
              <Image source={require('../assets/back-arrow.png')} style={styles.backButton}/>
            </Pressable>
          </View>
          <Text>Phone Number: {customer.phoneNumber}</Text>
          <Text>Address: {customer.address}</Text>
        </View>
      }
      
    </>
)
}

export default Details

const styles = StyleSheet.create({
  header: {
    width: '100%',
    textAlign:'center',
    height: 75,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    padding : 25,
    paddingLeft: 60,
    alignItems: 'center',
    backgroundColor: '#0096FF'
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  backButton:{
    resizeMode: 'stretch',
    width : 40,
    height: 40,
  },

})
