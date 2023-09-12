import { View, Text, ScrollView, Button, TextInput } from "react-native";
import { Link, Redirectm, useRouter } from "expo-router";
import { useState } from "react";
import * as authService from '../service/authService.js'

export default function Login () {
  const [loginData, setLoginData] = useState({email: '', password: ''});
  const [emailValidError, setEmailValidError] = useState('');
  
  async function submitLogin(){
    console.log('Login Data', loginData)
    console.log(loginData.email)
    console.log(loginData.password)
    if(loginData.email && !emailValidError && loginData.password){
      try {
        console.log('login')
        await authService.login(loginData)
      } catch (error) {
        console.log(error)
      }
  }else{ 
    console.log(process.env.BACKEND_URL)
    console.log('Enter Email and Password')}

  }

  function setEmailData(e){
    setLoginData({...loginData, email : e})
  }

  function setPasswordData(e){
    setLoginData({...loginData, password : e})
  }

  function handleValidEmail(val) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (val.length === 0) {
      setEmailValidError('email address must be enter');
    } else if (reg.test(val) === false) {
      setEmailValidError('enter valid email address');
    } else if (reg.test(val) === true) {
      setEmailValidError('');
    }
  };

  return (
    <View>
      <Text>Login</Text>
      {emailValidError ? <Text>{emailValidError}</Text> : null}
      <TextInput
        placeholder="Email"
        value={loginData.email}
        autoCorrect={false}
        autoCapitalize="none"
        onChange={setEmailData}
        onChangeText={value => {
          setEmailData(value);
          handleValidEmail(value);
        }}
      />

      <TextInput 
        autoCapitalize="none" 
        textContentType="password"
        onChangeText={value => {
          setPasswordData(value);
        }}
        secureTextEntry={true} 
        placeholder="Password"/>
        <Button 
          title="Login"
          onPress={submitLogin}/>
    </View>
  )
}   
