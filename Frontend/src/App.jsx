import {Link, Routes, Route, useNavigate} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/Loginpage.jsx";
import RegistrierungPage from "./pages/RegisterPage.jsx";
import KaugummiAddPage from "./pages/KaugummiAddPage.jsx";
import KaugummiPage from "./pages/KaugummiPage.jsx";
import KaugummiDetailPage from "./pages/KaugummiDetailPage.jsx";
import KaugummiEditPage from "./pages/KaugummiEditPage.jsx";
import ProtectedRoute from "./pages/components/ProtectedRoute.jsx";
import {useAuth} from "./context/AuthContext.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import VerifyCode from "./pages/VerifyCode.jsx";
import Kundenprofil from "./pages/Kundenprofil.jsx";
import CookieBanner from "./pages/CookieBanner.jsx";
import Datenschutzerklärung from "./pages/Datenschutzerklärung.jsx";

function App() {
    const {isAuthenticated, role, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Hilfsprüfung für Admin (deckt "ADMIN" und "ROLE_ADMIN" ab)
    const isAdmin = role === "ADMIN" || role === "ROLE_ADMIN";

    return (
        <div className="Background">
            <nav className="navbar">
                <div className="navbar-logo">
                    <Link to="/">
                        <img className="navbar-logo-img" src="/Last.png" alt="WOC Logo"/>
                    </Link>
                </div>

                <div className="navbar-links">
                    {isAuthenticated ? (
                        <>
                            <Link to="/kaugummiPage">Kaugummis</Link>
                            <Link to="/customerprofile">Kundenansicht</Link>
                            <Link to="/cookiebanner">Cookie Banner</Link>
                            <Link to="/privacy">Datenschutzerklärung</Link>

                            {isAdmin && (
                                <Link to="/kaugummiadd">Kaugummi hinzufügen</Link>
                            )}

                            <button onClick={handleLogout} className="logout-btn">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/kaugummiPage">Kaugummis</Link>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Registrieren</Link>
                        </>
                    )}
                </div>
            </nav>

            <div className="content">
                <Routes>
                    {/* Öffentliche Routen */}
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegistrierungPage/>}/>
                    <Route path="/forgotpassword" element={<ForgotPassword/>}/>
                    <Route path="/verify-code" element={<VerifyCode/>}/>
                    <Route path="/kaugummiPage" element={<KaugummiPage/>}/>
                    <Route path="/" element={<HomePage/>}/>

                    {/* 1. Normale geschützte Routen (für alle eingeloggten User) */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/customerprofile" element={<Kundenprofil />}/>
                        <Route path="/cookiebanner" element={<CookieBanner/>}/>
                        <Route path="/privacy" element={<Datenschutzerklärung/>}/>
                    </Route>

                    {/* 2. Admin-geschützte Routen (nur für Admins) */}
                    <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
                        <Route path="/kaugummiadd" element={<KaugummiAddPage/>}/>
                        <Route path="/kaugummiedit/:id" element={<KaugummiEditPage/>}/>
                        <Route path="/kaugummi/:id" element={<KaugummiDetailPage/>}/>

                    </Route>
                </Routes>
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <p className="copyright-text">&copy; {new Date().getFullYear()} World of Chewing Gum., a Fullstack
                        Applikation made the One Shot Team, consisting of Elias Kaiser and Vincent Diergardt. All Rights
                        reserved</p>
                </div>
            </footer>
        </div>
    );
}

export default App;