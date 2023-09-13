import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Link, Redirect, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import * as Contacts from 'expo-contacts';
import * as tokenService from '../service/tokenService.js'
//?Pages
import Login from "./Login";

export default function Page() {
  //? State Setup
  const router = useRouter()
  const [token, setToken] = useState('')

  //? Token Check
  useEffect(() => {
    (async ()=>{
      const tokenValue = await tokenService.getValueFor("tokenKey")
      if(tokenValue) setToken(tokenValue)
    })();
  }, [])
  //?Contacts Permisions

  return (
    <View style={styles.container}>
      { !token ? <Login /> : router.replace('/Home')}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
  },
});
