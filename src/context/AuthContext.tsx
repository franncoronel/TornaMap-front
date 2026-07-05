import {
  createContext,
  useContext,
  useEffect,
  useState,
  FC,
  ReactNode
} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

import { API_URL } from '@/config'

import { User } from '@/data/domain/User'
import { userService } from '@/data/services/UserService'

interface AuthContextProps {
  isAuthenticated: boolean
  user: User | null
  login: (mail: string, password: string) => Promise<User>
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const baseURL = API_URL
  axios.defaults.baseURL = baseURL
  axios.defaults.headers.common['Content-Type'] = 'application/json'
  axios.defaults.headers.common['Accept'] = 'application/json'

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const login = async (
    email: string,
    password: string
  ): Promise<User> => {
    try {
      const response = await userService.login(email, password)
      // La respuesta de axios tiene: response.data = { message, data: User }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const loggedUser = (response.data as any).data as User

      sessionStorage.setItem('isAuthenticated', 'true')
      setIsAuthenticated(true)
      setUser(loggedUser)

      return loggedUser
    } catch (error) {
      setIsAuthenticated(false)
      setUser(null)
      console.error('Error during login:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      sessionStorage.removeItem('isAuthenticated')
      Cookies.remove('SESSION')
      Cookies.remove('SESSION.sig')
      document.cookie =
        'SESSION=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      setIsAuthenticated(false)
      setUser(null)

      await userService.logout()
    } catch (error) {
      console.error('Error during logout:', error)
      throw error
    }
  }

  // Al recargar la página, si la sesión sigue activa recuperamos el perfil
  useEffect(() => {
    const storedAuth = sessionStorage.getItem('isAuthenticated')
    if (storedAuth) {
      setIsAuthenticated(true)
      userService
        .getProfile()
        .then((res) => {
          // axios: res.data = { message, data: User }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const profileUser = (res.data as any)?.data as User
          if (profileUser) setUser(profileUser)
        })
        .catch(() => {
          // La sesión expiró en el servidor aunque esté en sessionStorage
          sessionStorage.removeItem('isAuthenticated')
          setIsAuthenticated(false)
        })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
