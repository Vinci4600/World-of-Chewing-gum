import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./components/Styles/Home.css";
import "./components/Styles/ForgotPassword.css";
function ForgotPassword() {
    const navigate = useNavigate();

    // 1. State für Formulardaten definiert (Unnötiges 'password' entfernt, da es 'newpassword' ist)
    const [formData, setFormData] = useState({
        username: '',
        oldpassword: '',
        confirmPassword: '',
        rememberMe: false // Als Boolean für die Checkbox initialisiert
    });

    /**
     * Password Requirements
     */
    const [showPassword, setShowPassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email,setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const hasLength = formData.confirmPassword.length >= 5;
    const hasLower = /[a-z]/.test(formData.confirmPassword);
    const hasUpper = /[A-Z]/.test(formData.confirmPassword);
    const hasNumber = /\d/.test(formData.confirmPassword);
    const isPasswordValid = hasLength && hasLower && hasUpper && hasNumber;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());






    /**
     * Password Requirements
     * @type {[{label: string, valid: boolean},{label: string, valid: boolean},{label: string, valid: boolean},{label: string, valid: boolean},{label: string, valid: boolean}]}
     */

    // Prüft, ob alle Kriterien erfüllt sind

    // 2. Optimierte handleChange-Funktion (beachtet auch Checkboxes)
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email.trim() || !email.includes('@')) {
            setError("Bitte gib eine gültige E-Mail-Adresse ein.");
            alert("Gib bitte eine gültige E-Mail Adresse ein!");
            return;
        }




        // Validierung: Username-Länge prüfen
        if (formData.username.length < 8) {
            setError("Der Username bzw iene gültige E-Mail-Adresse ein  ist zu kurz! Er muss mindestens 8 Zeichen lang sein.");
            alert("Gib bitte eine gültiger Username ein!");
            return;
        }


        if(!isEmailValid){
            setError("Bitte gib eine gültige E-Mail Adresse ein!");
            alert("Bitte eine gültige E-Mail Adresse eingeben!");
            return;
        }



        if (formData.confirmPassword.length < 6) {
            setError("Der Password ist zu kurz!");
            alert("Bitte ein längeres Password eingeben!");
            return;
        }

        // Validierung: Altes Passwort prüfen
        if (formData.oldpassword.length < 6) {
            setError("Das alte Passwort ist zu kurz!");
            alert("Bitte ein korrektes Passwort eingeben");
            return;
        }

        // Validierung: Neues Passwort muss den komplexen Kriterien entsprechen
        if (!isPasswordValid) {
            setError("Das neue Passwort erfüllt die Sicherheitsanforderungen nicht.");
            alert("Bitte ein gültiges Password eingeben!");
            return;
        }


        // API-Aufruf zum Senden des Codes
        const response = await fetch('/forgot-password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email})
        });

        if (response.ok) {
            // E-Mail über den Router-State an die VerifyCode-Seite weitergeben
            navigate('/verify-code', {state: {email: email}});
        }


        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.message || 'Fehler beim Senden des Verifizierungscodes.');
        }




        // Validierung: Passwörter müssen übereinstimmen

        /**
         * 2 Sekunden Time Oud bevor Code geshcickt wird
         */
        setTimeout(() => {
            setLoading(false);
            setSuccess("Ein Code zum Zurücksetzen wurde an deine E-Mail gesendet!");

            setTimeout(() => {
                navigate("/verify-code", {state: {email: formData.username}});
            }, 2000);
        }, 1500);

        // Wenn alles passt:
        setError('');
        console.log("Passwort erfolgreich zurückgesetzt", formData);
        alert("Dein Passwort wurde erfolgreich geändert!");

        // Weiterleitung zum Login
        navigate("/login");
    };

    return (
        <div className="Background-Intro">

            <div className="kaugummi-form-container">
                    <h1 className="lg-title">Passwort vergessen</h1>
                    <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'blueviolet' }}>
                        Gib deine E-Mail-Adresse ein. Wir senden dir einen Code zum Zurücksetzen des Passworts.
                    </p>
                <br></br>


                <form onSubmit={handleSubmit}>

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


                    <div className="lg-field">
                        <input
                            id="username"
                            name="username"
                            type="text" // Wenn es ein Username ist, lieber 'text'. Wenn E-Mail gewünscht, auf 'email' lassen.
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className="lg-input"
                            placeholder="Username eingeben"
                            autoComplete="current-username"
                            style={{paddingRight: "80px", display: "flex", justifyContent: "center"}}
                        />
                    </div>


                    {/* Neues Passwort Feld */}
                    <div className="lg-field">
                        <input
                            className="lg-input"
                            name="oldpassword"
                            type={showOldPassword ? "text" : "password"}
                            placeholder=" Jetziges Passwort eingeben"
                            autoComplete="current-password"
                            value={formData.oldpassword}
                            onChange={handleChange}
                            required
                            style={{paddingRight: "70px", display: "flex", justifyContent: "center"}}
                        />
                        <button
                            type="button"
                            className="lg-toggle"
                            onClick={() => setShowOldPassword((prev) => !prev)}
                            aria-label={showOldPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                        >
                            {showOldPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {/* Passwort bestätigen Feld */}
                    <div className="lg-field">

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="lg-input"
                            placeholder="Bestätigungspassword"
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            className="lg-toggle"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>


                    {/* Passwort-Anforderungen anzeigen */}


                    {/* Remember Me Checkbox */}


                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-300"
                             style={{
                                 color: '#b91c1c',
                                 backgroundColor: '#fee2e2',
                                 padding: '0.75rem',
                                 borderRadius: '0.5rem',
                                 marginBottom: '1rem'
                             }}>
                            ⚠️ {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm border border-green-300"
                             style={{
                                 color: '#15803d',
                                 backgroundColor: '#dcfce7',
                                 padding: '0.75rem',
                                 borderRadius: '0.5rem',
                                 marginBottom: '1rem'
                             }}>
                            ✓ {success}
                        </div>
                    )}

                    {/* Live-Validierungs-Box */}
                    <div className="rg-card">
                        <h3 className="title font-semibold text-sm mb-2 text-gray-700">Das Passwort muss Folgendes
                            enthalten:</h3>

                        <p id="letter"
                           style={{color: hasLower ? '#16a34a' : '#ef4444', fontSize: '0.875rem', margin: '4px 0'}}>
                            {hasLower ? <span>✓ Ein <b>Kleinbuchstabe</b></span> :
                                <span>✕ Ein <b>Kleinbuchstabe</b></span>}
                        </p>

                        <p id="capital"
                           style={{color: hasUpper ? '#16a34a' : '#ef4444', fontSize: '0.875rem', margin: '4px 0'}}>
                            {hasUpper ? <span>✓ Ein <b>Großbuchstabe</b></span> :
                                <span>✕ Ein <b>Großbuchstabe</b></span>}
                        </p>

                        <p id="number"
                           style={{color: hasNumber ? '#16a34a' : '#ef4444', fontSize: '0.875rem', margin: '4px 0'}}>
                            {hasNumber ? <span>✓ Eine <b>Zahl</b></span> : <span>✕ Eine <b>Zahl</b></span>}
                        </p>

                        <p id="length"
                           style={{color: hasLength ? '#16a34a' : '#ef4444', fontSize: '0.875rem', margin: '4px 0'}}>
                            {hasLength ? <span>✓ Mindestens <b>8 Zeichen</b></span> :
                                <span>✕ Mindestens <b>8 Zeichen</b></span>}
                        </p>


                        <h3 className="title font-semibold text-sm mb-2 text-gray-700">Das E-Mail muss folgende Anforderungen haben</h3>
                        {/* E-Mail Validierung */}
                        <p style={{ color: isEmailValid ? '#16a34a' : '#ef4444', fontSize: '0.875rem', margin: '4px 0' }}>
                            {isEmailValid ? '✓' : '✕'} Gültige <b>E-Mail-Adresse</b>
                        </p>

                        <hr style={{ margin: '8px 0', border: '0', borderTop: '1px solid #e5e7eb' }} />
                    </div>

                    {/* Button zum Abschicken mit Ladezustand */}
                    <br/>
                    <button
                        type="submit"
                        className="lg-btn"
                        disabled={loading}
                        style={{ opacity: loading ? 0.8 : 1, cursor: loading ? 'not-allowed' : 'pointer', marginTop: '1rem' }}
                    >
                        {loading ? "Code wird gesendet..." : "Code anfordern"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;