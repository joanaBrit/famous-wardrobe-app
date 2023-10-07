import Form from './Form'
import axios from 'axios'



export default function Login( { token, setToken, setUsername } ) {
  const fields = [
    {
      type: 'email',
      name: 'Email',
    },
    {
      type: 'password',
      name: 'Password',
    }
  ]


  async function login(formData) {
    const response = await axios.post('/api/login', formData)
    const token = response.data.token
    // const username = response.data.username
    setToken(response.data.token)
    // setUsername(response.data.username)
    return response
  }


  return (
    <Form title='Login' request={login} fields={fields} redorect='/celebrities' />
  )
}