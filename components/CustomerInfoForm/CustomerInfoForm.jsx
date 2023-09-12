import { TextInput, View, StyleSheet, Button, Alert } from "react-native"
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
      <TextInput 
        onChange={nameOnChange}
        placeholder="Customer Name"
      />
      <TextInput 
        onChange={addressOnChange}
        placeholder="Customer Address"
      />
      <TextInput 
        onChange={phoneNumberOnChange}
        placeholder="Customer Phone Number"
      />
      <Button 
        title="Save Customer Info"
        onPress={submitFormData()}
      />
    </View>
)
}

export default CustomerInfoForm