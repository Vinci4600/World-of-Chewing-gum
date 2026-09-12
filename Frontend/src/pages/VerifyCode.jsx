import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./components/Styles/ForgotPassword.css";

function VerifyCode() {
    const navigate = useNavigate();
    const location = useLocation();

    // Liest die E-Mail aus dem React Router Navigation State
    const emailFromState = location.state?.email || '';

    const [email, setEmail] = useState(emailFromState);
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Passwort-Validierungen
    const hasLength = newPassword.length >= 8;
    const hasLower = /[a-z]/.test(newPassword);
    const hasUpper = /[A-Z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const isPasswordValid = hasLength && hasLower && hasUpper && hasNumber;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email.trim()) {
            setError("Bitte gib deine E-Mail-Adresse ein.");
            return;
        }

        if (code.trim().length < 4) {
            setError("Bitte gib den vollständigen Verifizierungscode ein.");
            alert("Bitte eine gültige E-Mail-Adresse eingeben!");
            return;
        }

        if (!isPasswordValid) {
            setError("Das neue Passwort erfüllt die Sicherheitsanforderungen nicht.");
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
        <div className="lg-page">
            <div className="kaugummi-form-container">
                <h1 className="lg-title">Code verifizieren</h1>
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
                            type={showPassword ? "text" : "password"}
                            placeholder="Passwort bestätigen"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Live-Validierungs-Box */}
                    <div className="rg-card" style={{ marginTop: '1rem' }}>
                        <h3 className="title font-semibold text-sm mb-2 text-gray-700">Das Passwort muss Folgendes enthalten:</h3>
                        <p style={{ color: hasLower ? '#16a34a' : '#ef4444', fontSize: '0.875rem', margin: '4px 0' }}>
                            {hasLower ? '✓' : '✕'} Ein <b>Kleinbuchstabe</b>
                        </p>
                        <p style={{ color: hasUpper ? '#16a34a' : '#ef4444', fontSize: '0.875rem', margin: '4px 0' }}>
                            {hasUpper ? '✓' : '✕'} Ein <b>Großbuchstabe</b>
                        </p>
                        <p style={{ color: hasNumber ? '#16a34a' : '#ef4444', fontSize: '0.875rem', margin: '4px 0' }}>
                            {hasNumber ? '✓' : '✕'} Eine <b>Zahl</b>
                        </p>
                        <p style={{ color: hasLength ? '#16a34a' : '#ef4444', fontSize: '0.875rem', margin: '4px 0' }}>
                            {hasLength ? '✓' : '✕'} Mindestens <b>8 Zeichen</b>
                        </p>
                    </div>

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