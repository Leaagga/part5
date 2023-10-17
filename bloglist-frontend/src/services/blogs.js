import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'


const getAll =async (newToken) => {
  const token=`bearer ${newToken}`
  console.log(token)
  const config={
    headers:{
      Authorization:token
    }
  }
  const response =await axios.get(baseUrl,config)
  console.log(response)
  return response.data
}

export default { getAll }