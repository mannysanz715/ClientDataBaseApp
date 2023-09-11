import { StyleSheet, Text,View} from "react-native";
import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ContactModal from "../../components/ContactModal/ContactModal";

export default function Home ({contacts}){
  const [modalState, setModalState] = useState(false)

  function changeModalState(e){
    setModalState(!modalState)
  }

  return(
    <View>
      <NavBar />
      <Text onPress={changeModalState}>Open Contacts List</Text>
      {modalState && <ContactModal contacts={contacts}/>}
    </View>
  )
}