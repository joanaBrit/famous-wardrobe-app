import axios from 'axios'
import Form from './Form'

import { useState } from 'react'
import { setToken } from '../utils/auth'



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

      setMessage(error.response.data.detail) //! Check here, need to stop redirect
    }
  }

  return (
    <div className='formContainer'>
      <Form title='Login' request={login} fields={fields} redirect='/celebrities/' />
    </div>
  )
}
