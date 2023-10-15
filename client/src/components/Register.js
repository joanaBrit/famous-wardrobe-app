import axios from 'axios'
import Form from './Form'
import Alert from 'react-bootstrap/Alert'

import { useState } from 'react'

export default function Register() {
  const [message, setMessage] = useState()
  const [fields, setFields] = useState([
    {
      type: 'text',
      name: 'Username',
    },
    {
      type: 'email',
      name: 'Email',
    },
    {
      type: 'password',
      name: 'Password',
    },
    {
      type: 'password',
      name: 'Password Confirmation',
    }
  ])

  async function register(formData) {
    try {
      const { data } = await axios.post('/api/auth/register/', formData)
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
      <img className='full-img' src='https://res.cloudinary.com/dwgwkeccm/image/upload/v1697385445/Project-4/Frame_2_sxl9q1.png' />
      <div className='formContainer'>
        <Form title="Register" request={register} fields={fields} redirect="/login" />
        {message && <Alert style={{ marginTop: '10px' }} variant={'warning'}>{message}</Alert>}
      </div>
    </main>
  )
}