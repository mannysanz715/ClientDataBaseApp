import { useLocalSearchParams, useGlobalSearchParams } from "expo-router"
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import NavBar from "../components/NavBar/NavBar";
import * as customerService from '../service/customerService.js'


function Details () {
  const[customer, setCustomer] = useState()
  const local = useLocalSearchParams();
  useEffect(() => {
    (async ()=>{
      const customer = await customerService.getCustomerDetails(local.id)
      setCustomer(customer)
      })();
  },[]);

  return (
    <>
      <NavBar/>
      {customer &&
        <View>
          <Text>Name: {customer.name}</Text>
          <Text>Phone Number: {customer.phoneNumber}</Text>
          <Text>Address: {customer.address}</Text>
        </View>
      }
      
    </>
)
}











export default Details