import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext.jsx";

const ProtectedRoute = () => {
    // Authentifizierungsstatus und Rolle aus dem AuthContext abfragen
    const { isAuthenticated, role } = useAuth();

    /**
     * User wird sofort  redirected zu Login wenn User nicht eingeloggt ist
     */

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    /**
     * Wenn Admin Role authorisiert ist direct zum Kaugummi redirected
     */
    if (role !== 'ADMIN') {
        return <Navigate to="/kaugummiPage" replace />;
    }

    /**
     * Protected Route mit geschützten Pages anzeigen in Outlet
     */

    return <Outlet />;
};

export default ProtectedRoute;