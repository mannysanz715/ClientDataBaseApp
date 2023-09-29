import { TextInput, ScrollView, View, StyleSheet, Text, Button, Alert, Pressable } from "react-native"
import { useState } from "react"
import * as customerService from '../../service/customerService.js'
import { useRouter } from "expo-router"
function CustomerInfoForm () {
  const [formData, setFormData] = useState({name : '', phoneNumber : '', address : '', permitNumber : '', dateOfBirth: '', instructor: ''})
  const router = useRouter()
  async function submitFormData(){
    let newCustomer = await customerService.createNewCustomer(formData)
    if(newCustomer.name){
      router.replace('/')
    }
  }

  function nameOnChange(e){
    setFormData({...formData, name: e})
  }
  function addressOnChange(e){
    setFormData({...formData, address: e})
  }
  function phoneNumberOnChange(e){
    setFormData({...formData, phoneNumber: e})
  }
  function dateOfBirthOnChange(e){
    setFormData({...formData, dateOfBirth: e})
  }
  function permitNumberOnChange(e){
    setFormData({...formData, permitNumber: e})
  }
  function instructorOnChange(e){
    setFormData({...formData, instructor: e})
  }
    return (
    <View style={styles.pageContainer}>
      <ScrollView style={styles.contentContainer}>
        <TextInput
          style={styles.inputStyle} 
          onChangeText={nameOnChange}
          placeholder="Customer Name"
          />
        <TextInput 
          style={styles.inputStyle}
          onChangeText={addressOnChange}
          on
          placeholder="Customer Address"
          />
        <TextInput 
          style={styles.inputStyle}
          onChangeText={phoneNumberOnChange}
          placeholder="Customer Phone Number"
          />
        <TextInput 
          style={styles.inputStyle}
          onChangeText={dateOfBirthOnChange}
          placeholder="Customer Date of Birth"
          />
        <TextInput 
          style={styles.inputStyle}
          onChangeText={instructorOnChange}
          placeholder="Instructor"
          />
        <TextInput 
          style={styles.inputStyle}
          onChangeText={permitNumberOnChange}
          placeholder="Customer Permit Number"
          />
      </ScrollView>
        <Pressable style={styles.submitButton} onPress={submitFormData}><Text style={styles.textButton}>Save Customer Info</Text></Pressable>
    
    </View>
)
}

export default CustomerInfoForm

const styles = StyleSheet.create({
  pageContainer: {
    display: 'flex',
    height : '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    display:"flex",
    height: '100%',
    width: '100%',
    paddingTop: 30,
    paddingBottom: 50,
  },
  submitButton:{
    backgroundColor: '#094074',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop: 15,
    marginBottom: 50
  },
  textButton:{
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  inputStyle:{
    textAlign: 'center',
    height: 50,
    color: 'black',
    fontSize:16,
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    padding: 15,
    margin: 30,
  }
})