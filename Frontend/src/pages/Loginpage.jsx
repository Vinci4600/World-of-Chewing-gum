
import './components/Styles/Home.css'
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


function Loginpage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        rememberMe: false,
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.username.trim() || !formData.password) {
            setError("Bitte alle Felder ausfüllen.");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    usernameOrEmail: formData.username.trim(),
                    password: formData.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Login fehlgeschlagen");
            }

            if (formData.rememberMe) {
                localStorage.setItem("token", data.token);
            } else {
                sessionStorage.setItem("token", data.token);
            }

            // Navbar über Login informieren
            if (onLoginSuccess) onLoginSuccess(data.token);

            navigate("/");
        } catch (err) {
            setError(err.message || "Login fehlgeschlagen.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Background-Intro">


            <div className="kaugummi-form-container">
                <h1>Login</h1>
                <p className="lg-sub">Melde dich an, um fortzufahren</p>

                {error && <div className="lg-error" role="alert">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="lg-field">
                        <input
                            className="lg-input"
                            name="username"
                            type="text"
                            placeholder="Username"
                            autoComplete="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="lg-field">
                        <input
                            className="lg-input"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Passwort"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{ paddingRight: "70px" }}

                        />

                    </div>

                    <label className="lg-remember">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                        />
                        Remember me
                    </label>
                    <br></br>

                    <button type="submit" className="button1" disabled={loading}>
                        {loading ? "Wird geladen..." : "Login"}
                    </button>
                </form>

                <div className="lg-footer">
                    <p>Passwort vergessen?</p> <Link to="/forgotpassword">Passwort vergessen?</Link>
                </div>
                <div className="lg-footer">
                    <p>Noch kein Konto vorhanden?</p> <Link to="/register">Registrieren</Link>
                </div>
            </div>
        </div>
    );
}

export default Loginpage;