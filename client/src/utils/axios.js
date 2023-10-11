import axios from 'axios'
import { getToken, setToken, tokenIsValid } from './auth'

const axiosAuth = axios.create()


//  Interceptors - intercept every request sent with axiosAuth
axiosAuth.interceptors.request.use(async (config) => {

  if (!tokenIsValid('access-token')) {
    if (tokenIsValid('refresh-token')) {
      const { data } = await axios.post('/api/auth/refresh/', {
        refresh: getToken('refresh-token'),
      })
      setToken('access-token', data.access)

    } else {
      throw new axios.Cancel('Session expired, please login again.')
    }
  }

  config.headers.Authorization = `Bearer ${getToken('access-token')}`
  return config
})

export default axiosAuth