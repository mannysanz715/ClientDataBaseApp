// import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/auth`
import { useRouter } from "expo-router"
// async function signup(user) {
//   try {
//     const res = await fetch(`${BASE_URL}/signup`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(user),
//     })
//     const json = await res.json()
//     if (json.err) {
//       throw new Error(json.err)
//     } else if (json.token) {
//       tokenService.setToken(json.token)
//     }
//   } catch (err) {
//     throw err
//   }
// }

// function getUser() {
//   return tokenService.getUserFromToken()
// }

// function logout() {
//   tokenService.removeToken()
// }

async function login(credentials) {
  const router = useRouter()
  try {
    console.log("Credentials", credentials)
    const res = await fetch(`http://localhost:3001/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    const json = await res.json()
    if(json.token) router.replace('/Home')
  }catch(err){
    console.log(err)
  }
}

// async function changePassword(credentials) {
//   try {
//     const res = await fetch(`${BASE_URL}/change-password`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${tokenService.getToken()}`,
//       },
//       body: JSON.stringify(credentials),
//     })
//     const json = await res.json()
//     if (json.token) {
//       tokenService.removeToken()
//       tokenService.setToken(json.token)
//     }
//     if (json.err) {
//       throw new Error(json.err)
//     }
//   } catch (err) {
//     throw err
//   }
// }

// export { signup, getUser, logout, login, changePassword }
export { login }