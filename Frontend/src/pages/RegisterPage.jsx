import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './components/Styles/Home.css'
import '../App.css';
function RegistrierungPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    // Getrennte Toggles für Passwörter
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    // Validierungsregeln
    const passwordRequirements = [
        { label: "Mindestens 8 Zeichen lang", valid: password.length >= 8 },
        { label: "Mindestens 1 Großbuchstabe (A-Z)", valid: /[A-Z]/.test(password) },
        { label: "Mindestens 1 Kleinbuchstabe (a-z)", valid: /[a-z]/.test(password) },
        { label: "Mindestens 1 Zahl (0-9)", valid: /\d/.test(password) },
        { label: "Mindestens 1 Sonderzeichen (!@#$%^&* usw.)", valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
        { label: "Passwörter stimmen überein", valid: password.length > 0 && password === confirmPassword },
    ];

    const emailRequirements = [
        { label: "Muss ein @ enthalten", valid: email.includes("@") },
        { label: "Muss eine Domain enthalten (z.B. .de, .com, .ch)", valid: /\.[a-zA-Z]{2,}$/.test(email) },
        { label: "Muss eine gültige E-Mail-Adresse sein", valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) },
    ];

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwörter stimmen nicht überein.");
            return;
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    password,
                    email,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || errorData || "Registrierung fehlgeschlagen");
            }

            navigate("/login");
        } catch (error) {
            console.error("Fehler bei der Registrierung:", error);
            setError(error.message || "Fehler bei der Registrierung.");
        }
    };

    return (
        <div className="Background-Intro">
            <div className="kaugummi-form-container">
                <h1>Registrierung</h1>

                {error && (
                    <div className="lg-error" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister}>
                    <div className="lg-field">
                        <input
                            className="lg-input"
                            type="text"
                            placeholder="Username eingeben..."
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="lg-field">
                        <input
                            className="lg-input"
                            type="email"
                            placeholder="E-Mail"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="lg-field">
                        <input
                            className="lg-input"
                            type={showPassword ? "text" : "password"}
                            placeholder="Passwort"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ paddingRight: "70px" }}
                            required
                        />
                        <button
                            type="button"
                            className="lg-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <div className="lg-field">
                        <input
                            className="lg-input"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Passwort"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ paddingRight: "70px" }}
                            required
                        />
                        <button
                            type="button"
                            className="lg-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <button type="submit" className="lg-btn">
                        Registrieren
                    </button>
                </form>


                    <p className="lg-sub">Bereits ein Konto? </p><Link to="/login">Hier anmelden</Link>



                <div className="rg-card">
                    <h3>Anforderungen:</h3>

                    <p>Passwort-Anforderungen:</p>
                    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                        {passwordRequirements.map((req, index) => (
                            <li
                                key={index}
                                className="rg-item"
                                style={{
                                    color: req.valid ? "#2e7d32" : "#d32f2f",
                                    display: "flex",
                                    alignItems: "center",

                                    gap: "8px",
                                    marginBottom: "4px"
                                }}
                            >
                                <span>{req.valid ? "✓" : "✗"}</span>
                                <span>{req.label}</span>
                            </li>
                        ))}
                    </ul>

                    <p>E-Mail-Anforderungen:</p>
                    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                        {emailRequirements.map((req, index) => (
                            <li
                                key={index}
                                className="rg-item"
                                style={{
                                    color: req.valid ? "#2e7d32" : "#d32f2f",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    marginBottom: "4px"
                                }}
                            >
                                <span>{req.valid ? "✓" : "✗"}</span>
                                <span>{req.label}</span>
                                <span>{req.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default RegistrierungPage;