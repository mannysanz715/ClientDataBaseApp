import jwt_decode from 'jwt-decode'
import * as SecureStore from 'expo-secure-store'

async function save(key, value){
  await SecureStore.setItemAsync(key,value);
}

async function getValueFor(key){
  let result = await SecureStore.getItemAsync(key);
  if(result){
    return result
  }
  else{
    return console.log("Invalid Key")
  }
}

export { save, getValueFor }