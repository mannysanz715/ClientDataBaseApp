import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

export default function NavBar(){
  return(
    <View style={style.container}>
      <StatusBar style="light" backgroundColor="#094074" />
      <Link href='/' style={style.text}>Clients</Link>
    </View>
  )
}

const style = StyleSheet.create({
  container:{
    height: 80,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#094074',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text:{
    color: 'white',
    fontSize: 24,
    fontWeight: '700'
  }
})