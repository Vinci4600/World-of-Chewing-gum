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
        return Boolean(localStorage.getItem('token') || sessionStorage.getItem('token'))
    })
    const [role, setRole] = useState(() => {
        return localStorage.getItem('role') || sessionStorage.getItem('role') || null
    })

    const login = (token, roleName, rememberMe = true) => {
        if (token) {
            const storage = rememberMe ? localStorage : sessionStorage
            storage.setItem('token', token)
            storage.setItem('role', roleName || 'USER')
        }
        setIsAuthenticated(true)
        setRole(roleName || 'USER')
    }


    /**
     * Beim Logout Token mitschicken sofort
     */
    const logout = () => {
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
        localStorage.removeItem('role')
        sessionStorage.removeItem('role')
        setIsAuthenticated(false)
        setRole(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)