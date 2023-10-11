import axios from 'axios'
import Form from './Form'

import { useState } from 'react'
import { setToken } from '../utils/auth'
// import axiosAuth from '../utils/axios'



export default function Login() {
  const [message, setMessage] = useState('')

  const [fields, setFields] = useState([
    {
      type: 'text',
      name: 'Username',
    },
    {
      type: 'password',
      name: 'Password',
    }
  ])


  async function login(formData) {
    try {
      const { data } = await axios.post('/api/auth/login/', formData)
    
    
      setToken('famous-access-token', data.access)
      setToken('famous-refresh-token', data.refresh)

      setMessage('Successful login.')

    } catch (error) {

    
      setMessage(error.response.data.detail)
    }
  }

  return (
    <Form title='Login' request={login} fields={fields} redirect='/celebrities/' />
  )
}




// export default function Login() {

//   const [fields, setFields] = useState([
//     {
//       type: 'text',
//       name: 'Username',
//     },
//     {
//       type: 'password',
//       name: 'Password',
//     }
//   ])


//   async function login(formData) {
//     const response = await axios.post('/api/auth/login/', formData)
//     const token = response.data.access
    
//     setToken('famous-access-token', token)
//     setToken('famous-refresh-token', response.data.refresh)

  
//     // setUsername(response.data.username)
//     return response
//   }


//   return (
//     <Form title='Login' request={login} fields={fields} redirect='/celebrities/' />
//   )
// // }