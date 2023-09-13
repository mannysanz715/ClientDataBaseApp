import * as tokenService from './tokenService'
const BASE_URL =`https://client-backend-v3.fly.dev/api`
async function getAllCustomers(){
  try {
    const token = await tokenService.getValueFor('tokenKey')
    const res = await fetch(`${BASE_URL}/customers`, {
      method: 'GET',
      headers: {'Authorization': `Bearer ${token}`},
    })
    return await res.json()
  }catch(error){
    console.log(error.json)
  }
}

export { 
  getAllCustomers,
}
