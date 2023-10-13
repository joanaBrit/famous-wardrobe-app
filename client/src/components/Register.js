import axios from 'axios'
import Form from './Form'

import { useState } from 'react'
// import axiosAuth from '../utils/axios'


export default function Register() {

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
    const response = await axios.post('/api/auth/register/', formData)
    return response
  }


  return (
    <div className='formContainer'>
      <Form title="Register" request={register} fields={fields} redirect="/login" />
    </div>
  )
}