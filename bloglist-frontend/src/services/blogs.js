import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token=''
const setToken=(anytoken)=>{
  token=anytoken
}
const getAll =async (newToken) => {
  token=`bearer ${newToken}`
  console.log(token)
  let config={
    headers:{
      Authorization:token
    }
  }
  const response =await axios.get(baseUrl,config)
  console.log(response)
  return response.data
}

export default { getAll,setToken }