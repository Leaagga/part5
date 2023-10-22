import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token=''
const setToken=(anytoken) => {
  token=anytoken
}
const setAuthorization=(atoken) => {
  setToken(`bearer ${atoken}`)
  return {
    headers:{
      Authorization:token
    } }

}
const getAll =async (newToken) => {
  token=`bearer ${newToken}`
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
const create =async (blog,newToken) => {

  token=`bearer ${newToken}`
  const config={
    headers:{
      Authorization:token
    } }
  const response= await axios.post(baseUrl,blog,config)
  console.log(response)
  return response.data



}
const putLikes =async (likesBlog,likesToken) => {
  token=`bearer ${likesToken}`
  const config={
    headers:{
      Authorization:token
    } }
  const likesUrl=`${baseUrl}/${likesBlog.id}`
  const likes={
    likes:likesBlog.likes+1
  }
  const response=await axios.put(likesUrl,likes,config)
  console.log(response)
  return response.data
}
const removeBlog=async(deleteblog,deleteToken) => {
  const config=setAuthorization(deleteToken)
  const deleteUrl=`${baseUrl}/${deleteblog.id}`
  const response=await axios.delete(deleteUrl,config)
  console.log(response)
  return response
}
export default { getAll,setToken,create,putLikes,removeBlog }