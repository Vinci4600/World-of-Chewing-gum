import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
/**
 * Auth Provider with Use State isAuthenticated to store  Token in localStorage Set false when not being authenticated
 * @param param0
 * @param param0.children
 * @returns {React.JSX.Element}
 * @constructor
 */
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true'
    })

    const login = (token, rememberMe = true) => {
        if (token) {
            const storage = rememberMe ? localStorage : sessionStorage
            storage.setItem('token', token)
        }
        localStorage.setItem('isAuthenticated', 'true')
        setIsAuthenticated(true)
    }


    /**
     * Beim Logout Token mitschicken sofort
     */
    const logout = () => {
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
        localStorage.removeItem('isAuthenticated')
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)