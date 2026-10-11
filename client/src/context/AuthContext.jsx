
import { useState } from 'react'
import { authApi } from '../services/api'
import { AuthContext } from './AuthStateContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)

  async function login(email, password) {
    setLoading(true)
    try {
      const result = await authApi.login(email, password)

      if (!result.token || !result.user) {
        throw new Error('Invalid authentication response.')
      }

      setToken(result.token)
      setUser(result.user)

      return result.user
    } finally {
      setLoading(false)
    }
  }

  async function register(email, password, role) {
    setLoading(true)
    try {
      const result = await authApi.register(email, password, role)

      if (!result.token || !result.user) {
        throw new Error('Invalid registration response.')
      }

      setToken(result.token)
      setUser(result.user)

      return result.user
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: Boolean(user && token),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
