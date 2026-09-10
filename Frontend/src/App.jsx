import { Link, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/Loginpage.jsx";
import RegistrierungPage from "./pages/RegisterPage.jsx";
import KaugummiAddPage from "./pages/KaugummiAddPage.jsx";
import KaugummiPage from "./pages/KaugummiPage.jsx";
import KaugummiDetailPage from "./pages/KaugummiDetailPage.jsx";
import KaugummiEditPage from "./pages/KaugummiEditPage.jsx";
import ProtectedRoute from "./pages/components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";

function App() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="Background">
            <nav className="navbar">
                <div className="navbar-logo">
                    <Link to="/">
                        <img className="navbar-logo-img" src="/Last.png" alt="WOC Logo" />
                    </Link>
                </div>

                <div className="navbar-links">
                    <Link to="/kaugummiPage">Kaugummis</Link>
                    {isAuthenticated ? (
                        <>
                            <Link to="/">Home</Link>
                            <Link to="/kaugummiadd">Kaugummi hinzufügen</Link>
                            <button onClick={handleLogout} className="logout-btn">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Registrieren</Link>
                        </>
                    )}
                </div>
            </nav>

            <div className="content">
                <Routes>
                    {/* Öffentliche Routen */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrierungPage />} />
                    <Route path="/kaugummiPage" element={<KaugummiPage />} />
                    <Route path="/kaugummi/:id" element={<KaugummiDetailPage />} />

                    {/* Geschützte Routen (Nicht eingeloggt -> Redirect zu /login) */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<HomePage />} />


                        <Route path="/kaugummiadd" element={<KaugummiAddPage />} />
                        <Route path="/kaugummiedit/:id" element={<KaugummiEditPage />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;