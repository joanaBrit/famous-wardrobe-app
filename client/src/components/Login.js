import axios from 'axios'
import Form from './Form'

import { useState } from 'react'
import { setToken } from '../utils/auth'
// import axiosAuth from '../utils/axios'



export default function Login() {

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
    const response = await axios.post('/api/auth/login/', formData)
    const token = response.data.access
    // const username = response.data.username
    setToken('famous-access-token', token)
    setToken('famous-refresh-token', response.data.refresh)
  
    // setUsername(response.data.username)
    return response
  }


  return (
    <Form title='Login' request={login} fields={fields} redirect='/celebrities/' />
  )
}