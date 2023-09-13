import { StyleSheet,StatusBar, Text, View } from "react-native";

export default function NavBar(){
  return(
    <View style={style.container}>
      <StatusBar backgroundColor="#094074" barStyle="light-content"/>
      <Text style={style.text}>Clients</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container:{
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#094074',
  },
  text:{
    color: 'white',
    fontSize: 24,
    fontWeight: '700'
  }
})