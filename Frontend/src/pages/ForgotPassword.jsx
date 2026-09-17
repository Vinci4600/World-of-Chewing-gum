import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./components/Styles/ForgotPassword.css";

function ForgotPassword() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showRequirements, setShowRequirements] = useState(false);

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    // Validierung für E-Mail
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Validierung für das neue Passwort
    const hasLength = formData.newPassword.length >= 8;
    const hasLower = /[a-z]/.test(formData.newPassword);
    const hasUpper = /[A-Z]/.test(formData.newPassword);
    const hasNumber = /\d/.test(formData.newPassword);
    const isPasswordValid = hasLength && hasLower && hasUpper && hasNumber;
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!isEmailValid) {
            setError("Bitte gib eine gültige E-Mail-Adresse ein.");
            return;
        }

        if (formData.username.trim().length < 3) {
            setError("Der Username ist zu kurz.");
            return;
        }

        if (!isPasswordValid) {
            setError("Das neue Passwort erfüllt die Sicherheitsanforderungen nicht.");
            return;
        }

        if (!passwordsMatch) {
            setError("Die Passwörter stimmen nicht überein.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    username: formData.username,
                    newPassword: formData.newPassword
                })
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.message || 'Fehler beim Senden des Verifizierungscodes.');
            }

            setSuccess("Ein Code zum Zurücksetzen wurde an deine E-Mail gesendet!");

            setTimeout(() => {
                setLoading(false);
                navigate('/verify-code', { state: { email, username: formData.username } });
            }, 2000);

        } catch (err) {
            setLoading(false);
            setError(err.message || 'Fehler beim Senden des Verifizierungscodes.');
        }
    };

    return (
        <div className="Background-Intro">
            <div className="kaugummi-form-container">
                <h1>Passwort vergessen</h1>
                <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'blueviolet' }}>
                    Gib deine E-Mail-Adresse, deinen Usernamen und dein neues Passwort ein.
                </p>

                <form onSubmit={handleSubmit}>
                    {/* E-Mail */}
                    <div className="lg-field">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="lg-input"
                            placeholder="E-Mail-Adresse eingeben"
                            autoComplete="email"
                        />
                    </div>

                    {/* Username */}
                    <div className="lg-field">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className="lg-input"
                            placeholder="Username eingeben"
                            autoComplete="username"
                        />
                    </div>

                    {/* Neues Passwort Feld */}
                    <div className="lg-field" style={{ position: 'relative' }}>
                        <input
                            className="lg-input"
                            name="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Neues Passwort eingeben"
                            autoComplete="new-password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                            style={{ paddingRight: "70px" }}
                        />
                        <button
                            type="button"
                            className="lg-toggle"
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            aria-label={showNewPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                        >
                            {showNewPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {/* Passwort bestätigen Feld */}
                    <div className="lg-field" style={{ position: 'relative' }}>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="lg-input"
                            placeholder="Passwort bestätigen"
                            autoComplete="new-password"
                            style={{ paddingRight: "70px" }}
                        />
                        <button
                            type="button"
                            className="lg-toggle"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            aria-label={showConfirmPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                        >
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {/* Fehlermeldung */}
                    {error && (
                        <div style={{ color: '#b91c1c', backgroundColor: '#fee2e2', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Erfolgsmeldung */}
                    {success && (
                        <div style={{ color: '#15803d', backgroundColor: '#dcfce7', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                            ✓ {success}
                        </div>
                    )}

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

                    <button
                        type="submit"
                        className="lg-btn"
                        disabled={loading}
                        style={{ opacity: loading ? 0.8 : 1, cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.5rem', width: '100%' }}
                    >
                        {loading ? "Code wird gesendet..." : "Code anfordern"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;