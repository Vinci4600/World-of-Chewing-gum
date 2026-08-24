import { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/Login.jsx";
import RegistrierungPage from "./pages/Registerpage.jsx";
import Forgotpassword from "./pages/Forgotpassword.jsx";

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
            <nav>
                <Link to="/">Home</Link>

                {token ? (
                    <>
                        {" | "}
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        {" | "}
                        <Link to="/login">Login</Link>
                        {" | "}
                        <Link to="/register">Registrieren</Link>
                        <Link to="/forgotpassword">Password vergessen?</Link>
                    </>
                )}
            </nav>

            <div className="content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage setToken={setToken} />} />
                    <Route path="/register" element={<RegistrierungPage />} />
                    <Route path="/forgotpassword" element={<Forgotpassword />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;