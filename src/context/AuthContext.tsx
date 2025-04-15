import { createContext, useContext, useEffect, useState, FC, ReactNode } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'


import { environment } from '@/environment'
import { User } from '@/data/domain/User'
import { userService } from '@/data/services/UserService'

interface AuthContextProps {
    isAuthenticated: boolean
    login: (mail: string, password: string) => Promise<User>
    logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const baseURL = environment.apiUrl
    axios.defaults.baseURL = baseURL
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.headers.common['Accept'] = 'application/json'

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Implementar Login con AXIOS
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const login = async (email: string, password: string):Promise<User | any> => {
        try {
            const response = await userService.login(email, password)
            sessionStorage.setItem('isAuthenticated', 'true')

            setIsAuthenticated(true)
            return response.data
        } catch (error) {
            setIsAuthenticated(false)
            console.error('Error during login:', error)
            throw error
        }
    }

    const logout = async () => {
        // Eliminar token de localStorage
        try{
            sessionStorage.removeItem('isAuthenticated')
            Cookies.remove('SESSION')
            Cookies.remove('SESSION.sig')
            document.cookie = 'SESSION=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            setIsAuthenticated(false)

            await userService.logout()
        }catch (error) {
            console.error('Error during logout:', error)
            throw error
        }
    }

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem('isAuthenticated')
        if(isAuthenticated) {
            setIsAuthenticated(true)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
