import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

function parseUserId(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.sub
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('accessToken'))
  const [userId, setUserId] = useState(() => {
    const t = localStorage.getItem('accessToken')
    return t ? parseUserId(t) : null
  })

  const login = (accessToken) => {
    localStorage.setItem('accessToken', accessToken)
    setToken(accessToken)
    setUserId(parseUserId(accessToken))
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    setToken(null)
    setUserId(null)
  }

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
