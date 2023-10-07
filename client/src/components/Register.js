import Form from './Form'
import axios from 'axios'



export default function Register() {

  const fields = [

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
  ]

  function register(formData) {
    return axios.post('/api/register', formData)
  }


  return (
    <Form title="Register" request={register} fields={fields} redirect="/login" />
  )
}