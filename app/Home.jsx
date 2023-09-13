import { StyleSheet, Text,View, Button} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import * as tokenCtrl from '../service/tokenService.js'
//?Components
import NavBar from "../components/NavBar/NavBar";
import ContactModal from "../components/ContactModal/ContactModal";
import CustomerInfoForm from "../components/CustomerInfoForm/CustomerInfoForm";

export default function Home ({contacts}){
  const router = useRouter()
  const [modalState, setModalState] = useState(false)

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
      <Button title="Log Out" onPress={logUserOut}/>
      <CustomerInfoForm />
      {modalState && <ContactModal contacts={contacts}/>}
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

