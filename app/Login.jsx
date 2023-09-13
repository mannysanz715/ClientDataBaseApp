import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";

import { useState } from "react";
import * as authService from '../service/authService.js'


export default function Login () {
  const [loginData, setLoginData] = useState({email: '', password: ''});
  const [emailValidError, setEmailValidError] = useState('');
  
  async function submitLogin(){
    if(loginData.email && !emailValidError && loginData.password){
      try {
        await authService.login(loginData)
      } catch (error) {
        console.log(error)
      }
  }else{ 
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
      setEmailValidError('Email address must be entered.');
    } else if (reg.test(val) === false) {
      setEmailValidError('Enter a valid email address.');
    } else if (reg.test(val) === true) {
      setEmailValidError('');
    }
  };

  return (
    <View style={style.loginPageContainer}>
      <Text style={style.loginTitle}>Login</Text>
      {emailValidError ? <Text>{emailValidError}</Text> : null}
      <TextInput
        style={style.textInput}
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
        style={style.textInput}
        autoCapitalize="none" 
        textContentType="password"
        onChangeText={value => {
          setPasswordData(value);
        }}
        secureTextEntry={true} 
        placeholder="Password"/>
        <Pressable style={style.loginButton} onPress={submitLogin}>
            <Text style={style.loginButtonText}>Login</Text>
        </Pressable>
    </View>

  )
}   


const style = StyleSheet.create({
  textInput:{
    height: 40,
    fontSize: 16,
    borderWidth: .25,
    borderRadius: 20,
    width: 275,
    paddingLeft:15,
  },
  loginTitle:{
    fontSize: 38,
    fontWeight: "500",
    color: '#1e90ff'
  },
  loginPageContainer:{
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingBottom: 80,
  },
  loginButton:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#00bfff',
  },

  loginButtonText:{
    fontSize: 16,
    color: 'white',
  }
})


