export const setToken = (tokenName, token) => {
  localStorage.setItem(tokenName, token)
}

export const getToken = (tokenName) => {
  return localStorage.getItem(tokenName)
}

export const removeToken = (tokenName) => {
  return localStorage.removeItem(tokenName)
}

export const tokenIsValid = (tokenName) => {
  const token = getToken(tokenName)
  // console.log(token)
  // if (token === null || token === undefined) return false
  if (!token) {
    // console.log('No token.')
    return false
  }

  try {
    
    const exp = JSON.parse(atob(token.split('.')[1])).exp
    const now = Date.now() / 1000
    // console.log(exp, now)
    return exp > now
  } catch (e) {
    // console.log('Error token. ', token)
    return false
  }
}

