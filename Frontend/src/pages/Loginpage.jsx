
import './components/Styles/Home.css';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


function Loginpage({onLoginSuccess}) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        rememberMe: false,
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showRequirements, setShowRequirements] = useState(false);


    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Validierung für das neue Passwort
    const hasLength = formData.password.length >= 8;
    const hasLower = /[a-z]/.test(formData.password);
    const hasUpper = /[A-Z]/.test(formData.newPassword);
    const hasNumber = /\d/.test(formData.newPassword);
    const isPasswordValid = hasLength && hasLower && hasUpper && hasNumber;
    const passwordsMatch = formData.password.length > 0 && formData.password=== formData.newPassword;


    const passwordRequirements = [
        { label: "Mindestens 8 Zeichen lang", valid: hasLength },
        { label: "Mindestens 1 Großbuchstabe (A-Z)", valid: hasUpper },
        { label: "Mindestens 1 Kleinbuchstabe (a-z)", valid: hasLower },
        { label: "Mindestens 1 Zahl (0-9)", valid: hasNumber },
        { label: "Passwörter stimmen überein", valid: passwordsMatch }
    ];

    const emailRequirements = [
        { label: "Mindestens 8 Zeichen lang", valid: hasLength },
        { label: "Mindestens 1 Kleinbuchstabe (a-z)", valid: hasLower },
        { label: "Muss ein @ enthalten", valid: email.includes("@") },
        { label: "Muss eine gültige TLD enthalten (.de, .com, .ch)", valid: /\.[a-zA-Z]{2,}$/.test(email) },
        { label: "Muss eine gültige E-Mail-Adresse sein", valid: isEmailValid }
    ];

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
            setError(err.message || "Login mit Google fehlgeschlagen!.");
        } finally {
            setLoading(false);
        }
    };


    /**
     * Google -Endpoint hinzugefügt für SSO-Login mit Google Account
     * @param googleIdToken
     * @returns {Promise<void>}
     */
    const handleGoogleLogin = async (googleIdToken) => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:8080/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: googleIdToken }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Google-Login fehlgeschlagen");
            }

            // Token speichern & Navigieren wie beim normalen Login
            if (formData.rememberMe) {
                localStorage.setItem("token", data.token);
            } else {
                sessionStorage.setItem("token", data.token);
            }

            if (onLoginSuccess) onLoginSuccess(data.token);

            navigate("/");
        } catch (error) {
            setError(error.message || "Fehler beim Google-Login");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="Background-Intro">


            <div className="kaugummi-form-container">
                <h1>Login</h1>
                <p className="lg-sub">Melde dich an, um  fortzufahren</p>

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


                        <button
                            type="button"
                            className="lg-toggle"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                        >
                            {showPassword
                                ? "Hide"
                                : "Show"}
                        </button>

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

                    <button
                        type="button"
                        className="requirements-button"
                        onClick={() =>
                            setShowRequirements(true)
                        }
                    >
                        Anforderungen anzeigen
                    </button>



                    {/* Popup */}
                    {showRequirements && (
                        <div
                            className="popup-overlay"
                            onClick={() =>
                                setShowRequirements(false)
                            }
                        >

                            <div
                                className="rg-card"
                                onClick={(e) =>
                                    e.stopPropagation()
                                }
                            >

                                {/* Schließen */}
                                <button
                                    type="button"
                                    className="popup-close"
                                    onClick={() =>
                                        setShowRequirements(
                                            false
                                        )
                                    }
                                >
                                    ✕
                                </button>

                                <h3>
                                    Anforderungen:
                                </h3>

                                {/* Passwort */}
                                <p>
                                    Passwort-Anforderungen:
                                </p>

                                <ul
                                    style={{
                                        listStyle: "none",
                                        paddingLeft: 0
                                    }}
                                >

                                    {passwordRequirements.map(
                                        (req, index) => (
                                            <li
                                                key={index}
                                                className="rg-item"
                                                style={{
                                                    color: req.valid
                                                        ? "#2e7d32"
                                                        : "#d32f2f",
                                                    display: "flex",
                                                    alignItems:
                                                        "center",
                                                    gap: "8px",
                                                    marginBottom:
                                                        "4px"
                                                }}
                                            >

                                            <span>
                                                {req.valid
                                                    ? "✓"
                                                    : "✗"}
                                            </span>

                                                <span>
                                                {req.label}
                                            </span>

                                            </li>
                                        )
                                    )}

                                </ul>

                                {/* E-Mail */}
                                <p>
                                    E-Mail-Anforderungen:
                                </p>

                                <ul
                                    style={{
                                        listStyle: "none",
                                        paddingLeft: 0
                                    }}
                                >

                                    {emailRequirements.map(
                                        (req, index) => (
                                            <li
                                                key={index}
                                                className="rg-item"
                                                style={{
                                                    color: req.valid
                                                        ? "#2e7d32"
                                                        : "#d32f2f",
                                                    display: "flex",
                                                    alignItems:
                                                        "center",
                                                    gap: "8px",
                                                    marginBottom:
                                                        "4px"
                                                }}
                                            >

                                            <span>
                                                {req.valid
                                                    ? "✓"
                                                    : "✗"}
                                            </span>

                                                <span>
                                                {req.label}
                                            </span>

                                            </li>
                                        )
                                    )}

                                </ul>

                            </div>

                        </div>
                    )}
                    <br></br>

                    <button type="submit" className="button1" disabled={loading}>
                        {loading ? "Wird geladen..." : "Login"}
                    </button>
                </form>



                <div className="lg-divider" style={{ margin: "15px 0", textAlign: "center" }}>
                    <span>oder</span>
                </div>

                <button
                    type="button"
                    className="button-google"
                    onClick={() => handleGoogleLogin()}
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#ec9d0a",
                        color: "#757575",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px"
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18">
                        <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.616z"/>
                        <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                        <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                        <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                    </svg>
                    Mit deinem Google Account anmelden
                </button>

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