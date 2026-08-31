import { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/Loginpage.jsx";
import RegistrierungPage from "./pages/Registerpage.jsx";
import lastpng from './pages/components/Bilder/Last.png'
import KaugummiAddPage from "./pages/KaugummiAddPage.jsx";
import KaugummiPage from "./pages/KaugummiPage.jsx";


function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        navigate("/");
    };


    return (
        <div className="Background">

            <nav className="navbar">
                <div className="navbar-logo">
                    <Link to="/"><img className="navbar-logo img" src={lastpng} alt="WOC Logo"/></Link>
                </div>

                <div className="navbar-links">


                    {token ? (
                        <>
                            <Link to="/kaugummiadd">
                                Kaugummi hinzufügen
                            </Link>

                            <button onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Registrieren</Link>
                            <Link to="/kaugummiadd">
                                Kaugummi hinzufügen
                            </Link>
                            <Link to="/kaugummiPage">Kaugummis</Link>
                        </>
                    )}
                </div>
            </nav>

            <div className="content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage setToken={setToken} />} />
                    <Route path="/register" element={<RegistrierungPage />} />
                    <Route path="/kaugummiadd" element={<KaugummiAddPage />} />
                    <Route path="/kaugummiPage" element={<KaugummiPage />} />
                </Routes>
            </div>

        </div>

    );
}

export default App;