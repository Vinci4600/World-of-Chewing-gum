import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from "../../context/AuthContext.jsx";

const ProtectedRoute = () => {
    /**
     * Global UseAuth for Context for Authenfification with GLobal User AUth Context for Protected Routesd
     */
    const { isAuthenticated } = useAuth()

    /**
     * Unless the uesr isnt authenticated he will be redirected on Login-Context
     */
    if (!isAuthenticated) {
        return <Navigate to="/login"  replace />
    }

    /**
     * When User is not logged in dont show Protected Routes
     */
    return <Outlet />
}

export default ProtectedRoute;