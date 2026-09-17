import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./ForgotPassword.jsx";
import "./components/Styles/ForgotPassword.css";

function VerifyCode() {
    const navigate = useNavigate();
    const location = useLocation();


    const [formData, setFormData] = useState({
        username: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Liest die E-Mail aus dem React Router Navigation State
    const emailFromState = location.state?.email || '';
    const [showRequirements, setShowRequirements] = useState(false);

    const [email, setEmail] = useState(emailFromState);
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Passwort-Validierungen
    const hasLength = newPassword.length >= 8;
    const hasLower = /[a-z]/.test(newPassword);
    const hasUpper = /[A-Z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const isPasswordValid = hasLength && hasLower && hasUpper && hasNumber;


    // Validierung für E-Mail

    const passwordsMatch = formData.newPassword.length > 0 && formData.newPassword === formData.confirmPassword;

    const passwordRequirements = [
        { label: "Mindestens 8 Zeichen lang", valid: hasLength },
        { label: "Mindestens 1 Großbuchstabe (A-Z)", valid: hasUpper },
        { label: "Mindestens 1 Kleinbuchstabe (a-z)", valid: hasLower },
        { label: "Mindestens 1 Zahl (0-9)", valid: hasNumber },
        { label: "Passwörter stimmen überein", valid: passwordsMatch }
    ];

    const emailRequirements = [

        { label: "Muss ein @ enthalten", valid: email.includes("@") },
        { label: "Muss eine gültige TLD enthalten (.de, .com, .ch)", valid: /\.[a-zA-Z]{2,}$/.test(email) },
        { label: "Muss eine gültige E-Mail-Adresse sein", valid: isEmailValid }
    ];
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email.trim()) {
            setError("Bitte gib deine E-Mail-Adresse ein.");
            alert("Bitte eine gültige E-Mail Adresse eingeben fürs Anmelden!");
            return;
        }

        if(!isEmailValid){
            setError("Bitte gib eine gültige E-Mail Adresse ein!");
            return;
        }

        if (code.trim().length < 4) {
            setError("Bitte gib den vollständigen Verifizierungscode ein.");
            alert("Bitte eine gültige E-Mail-Adresse eingeben!");
            return;
        }

        if (!isPasswordValid) {
            setError("Das neue Passwort erfüllt die Sicherheitsanforderungen nicht.");
            alert("Das neue Password erfüllt ale Sicherheitsanforderungen!");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Die Passwörter stimmen nicht überein.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    code: code,
                    newPassword: newPassword
                })
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.message || 'Ungültiger Code oder Fehler beim Zurücksetzen.');
            }

            setSuccess("Passwort wurde erfolgreich geändert! Du wirst zum Login weitergeleitet...");

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Background-Intro">
            <div className="kaugummi-form-container">
                <h1>Code verifizieren</h1>
                <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#666' }}>
                    Gib den Code ein, den du per E-Mail erhalten hast, sowie dein neues Passwort.
                </p>

                {error && (
                    <div className="mb-4 p-3 rounded-lg text-sm" style={{ color: '#b91c1c', backgroundColor: '#fee2e2', border: '1px solid #fca5a5', padding: '0.75rem', marginBottom: '1rem' }}>
                        ⚠️ {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 rounded-lg text-sm" style={{ color: '#15803d', backgroundColor: '#dcfce7', border: '1px solid #86efac', padding: '0.75rem', marginBottom: '1rem' }}>
                        ✓ {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* E-Mail Feld */}
                    <div className="lg-field">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="lg-input"
                            placeholder="E-Mail-Adresse eingeben"
                            readOnly={Boolean(emailFromState)}
                            autoComplete="email"
                        />
                    </div>

                    {/* Code Feld */}
                    <div className="lg-field">
                        <input
                            type="text"
                            required
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="lg-input"
                            placeholder="Bitte COde eingeben.."
                            maxLength={6}


                        />
                    </div>

                    {/* Neues Passwort Feld */}
                    <div className="lg-field">
                        <input
                            className="lg-input"
                            type={showPassword ? "text" : "password"}
                            placeholder="Neues Passwort"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            className="lg-toggle"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {/* Passwort bestätigen Feld */}
                    <div className="lg-field">
                        <input
                            className="lg-input"
                            type={showConfirmPassword? "text" : "password"}
                            placeholder="Passwort bestätigen"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    <button
                        type="button"
                        className="lg-toggle"
                        onClick={() =>
                            setShowConfirmPassword(
                                !showConfirmPassword
                            )
                        }

                    >
                        {showConfirmPassword
                            ? "Hide"
                            : "Show"}
                    </button>


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



                    <br />
                    <button
                        type="submit"
                        className="lg-btn"
                        disabled={loading}
                        style={{ opacity: loading ? 0.8 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                    >
                        {loading ? "Verifiziere Code..." : "Passwort zurücksetzen"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default VerifyCode;