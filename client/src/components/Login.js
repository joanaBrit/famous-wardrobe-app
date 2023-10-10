import axios from 'axios'
import Form from './Form'

import { useState } from 'react'
import { setToken } from '../utils/auth'



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
    const token = response.data.token
    // const username = response.data.username
    setToken(response.data.token)
    // setUsername(response.data.username)
    return response
  }


  return (
    <Form title='Login' request={login} fields={fields} redirect='/celebrities/' />
  )
}