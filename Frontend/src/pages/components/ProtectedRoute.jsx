import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext.jsx";

const ProtectedRoute = ({ requiredRole }) => {
    // Authentifizierungsstatus und Rolle aus dem AuthContext abfragen
    const { isAuthenticated, role } = useAuth();

    // 1. Wenn der User nicht eingeloggt ist -> ab zum Login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 2. Prüfen, ob eine Rolle verlangt wird und ob der User sie hat
    if (requiredRole) {
        const hasRequiredRole = role === requiredRole || role === "ROLE_" + requiredRole;

        // Wenn der User die Rolle NICHT hat, leiten wir ihn auf die Startseite um
        if (!hasRequiredRole) {
            return <Navigate to="/kaugummiPage" replace />;
        }
    }

    // 3. Alles passt -> Geschützte Seite anzeigen
    return <Outlet />;
};

export default ProtectedRoute;