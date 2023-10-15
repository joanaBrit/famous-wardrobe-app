import axios from 'axios'
import Form from './Form'

import { useState } from 'react'
import { setToken } from '../utils/auth'
import Alert from 'react-bootstrap/Alert'


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
      console.log(error)
      const errorMessage = error.response.data

      if (errorMessage.detail) {
        setMessage(errorMessage.detail)
      } else {
        setMessage('Required fields are missing.')
      }

      return { doNotNavigate: true }
    }
  }


  return (
    <main>
      <img className='full-img' src='https://res.cloudinary.com/dwgwkeccm/image/upload/v1697387895/Login_vncbws.png' />
      <div className='formContainer'>
        <Form title='Login' request={login} fields={fields} redirect='/celebrities/' />
        {message && <Alert style={{ marginTop: '10px' }} variant={'warning'}>{message}</Alert>}
      </div>
    </main>
  )
}
