import { View, Text, StyleSheet } from "react-native"
import CustomerInfoForm from "../components/CustomerInfoForm/CustomerInfoForm"
import NavBar from "../components/NavBar/NavBar"
function CustomerForm () {
  return (
  <View style={styles.pageContainer}>
    <NavBar />
    <View style={styles.contentContainer}>
      <CustomerInfoForm />
    </View>
  </View>
)
}

export default CustomerForm

const styles = StyleSheet.create({
  pageContainer:{
    flex : 1,
    width: '100%',
    height: '100%'
  },
  contentContainer :{
    display: 'flex',
    height: '90%',
    width: '100%',
  },
})