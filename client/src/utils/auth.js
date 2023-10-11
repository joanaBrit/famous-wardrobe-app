export const setToken = (tokenName, token) => {
  localStorage.setItem(tokenName, token)
}

export const getToken = (tokenName) => {
  return localStorage.getItem(tokenName)
}

// export const removeToken(){
//   return localStorage.removeItem(tokenName)
// }

export const tokenIsValid = (tokenName) => {
  const token = getToken(tokenName)

  if (token === null || token === undefined) return false

  try {
    console.log(token)
    const exp = JSON.parse(atob(token.split('.')[1])).exp
    const now = Date.now() / 1000

    return exp > now
  } catch (e) {
    return false
  }
}

