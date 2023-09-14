import { Text,TextInput, View, Pressable } from "react-native"
import { useState } from "react"

function CreateCustomerForm({modalState}){
  const [formData, setFormData] = useState({name : '', address: '', phoneNumber : '',})
  return (
      <>
        <Text>Enter Customer Info</Text>
      </>
)
}

export default CreateCustomerForm