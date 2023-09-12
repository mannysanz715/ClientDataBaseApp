import { StyleSheet, Text,View} from "react-native";
import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ContactModal from "../../components/ContactModal/ContactModal";
import CustomerInfoForm from "../../components/CustomerInfoForm/CustomerInfoForm";

export default function Home ({contacts}){
  const [modalState, setModalState] = useState(false)

  function changeModalState(e){
    setModalState(!modalState)
  }
  return(
    <View>
      <NavBar />
      <Text onPress={changeModalState} style={styles.button}>Open Contacts List</Text>
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

