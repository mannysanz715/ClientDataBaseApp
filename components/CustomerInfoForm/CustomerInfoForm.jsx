import { TextInput, View, StyleSheet, Text, Button, Alert } from "react-native"
import { useState } from "react"
function CustomerInfoForm () {
  const [formData, setFormData] = useState({name : '', phoneNumber : '', address : ''})

  function submitFormData(){
    console.log("form not submited just yet");
  }

  function nameOnChange(e){
    setFormData({...formData, name: e.target.value})
  }
  function addressOnChange(e){
    setFormData({...formData, address: e.target.value})
  }
  function phoneNumberOnChange(e){
    setFormData({...formData, phoneNumber: e.target.value})
  }
    return (
    <View>
      <View>
        <TextInput 
          onChange={nameOnChange}
          placeholder="Customer Name"
          />
        <TextInput 
          onChange={addressOnChange}
          on
          placeholder="Customer Address"
          />
        <TextInput 
          onChange={phoneNumberOnChange}
          placeholder="Customer Phone Number"
          />
        </View>
        <Button title='Save Customer Info' onPress={submitFormData}/>
    
    </View>
)
}

export default CustomerInfoForm