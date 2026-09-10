import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./components/Styles/ForgotPassword.css";
function ForgotPassword() {
    const navigate = useNavigate();

    // 1. State für Formulardaten definiert (Unnötiges 'password' entfernt, da es 'newpassword' ist)
    const [formData, setFormData] = useState({
        username: '',
        oldpassword: '',
        newpassword: '',
        confirmPassword: '',
        rememberMe: false // Als Boolean für die Checkbox initialisiert
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    // Dynamische Passwort-Validierung (basiert jetzt korrekt auf 'newpassword')
    const hasLength = formData.newpassword.length >= 8;
    const hasLower = /[a-z]/.test(formData.newpassword);
    const hasUpper = /[A-Z]/.test(formData.newpassword);
    const hasNumber = /\d/.test(formData.newpassword);
    const isPasswordValid = hasLength && hasLower && hasUpper && hasNumber;





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

    const handleSubmit = (e) => {
        e.preventDefault();




        // Validierung: Username-Länge prüfen
        if (formData.username.length < 8) {
            setError("Der Username ist zu kurz! Er muss mindestens 8 Zeichen lang sein.");
            return;
        }


        if(formData.confirmPassword.length <6){
            setError("Der Password ist zu kurz!");
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
            return;
        }

        // Validierung: Passwörter müssen übereinstimmen
        if (formData.newpassword !== formData.confirmPassword) {
            setError("Die Passwörter stimmen nicht überein!");
            return;
        }

        // Wenn alles passt:
        setError('');
        console.log("Passwort erfolgreich zurückgesetzt", formData);
        alert("Dein Passwort wurde erfolgreich geändert!");

        // Weiterleitung zum Login
        navigate("/login");
    };

    return (
        <div className="lg-page">
            <div className="kaugummi-form-container">
                <h1 className="lg-title">Reset Password</h1>
                <br></br>

                {/* Fehlermeldung im UI anzeigen */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} >
                    {/* Benutzername Feld */}



                    <div className="lg-field">
                        <input
                            id="username"
                            name="username"
                            type="text" // Wenn es ein Username ist, lieber 'text'. Wenn E-Mail gewünscht, auf 'email' lassen.
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className="lg-input"
                            placeholder="E-mail/Username eingeben"
                            autoComplete="current-username"
                            style={{paddingRight:"80px",display:"flex",justifyContent:"center"}}
                        />
                    </div>




                    {/* Neues Passwort Feld */}
                    <div className="lg-field">
                        <input
                            className="lg-input"
                            name="oldpassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Passwort eingeben"
                            autoComplete="current-password"
                            value={formData.oldpassword}
                            onChange={handleChange}
                            style={{ paddingRight: "70px", display:"flex",justifyContent:"center" }}
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

                    {/* Passwort bestätigen Feld */}
                    <div className="lg-field">

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
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


                    {/* Live-Validierungs-Box */}
                    <div className="rg-card">
                        <h3 className="title font-semibold text-sm mb-2 text-gray-700">Das Passwort muss Folgendes enthalten:</h3>

                        <p id="letter" className={hasLower ? 'text-green-600 text-sm' : 'text-red-500 text-sm'}>
                            {hasLower ? <span>✓ Ein <b>Kleinbuchstabe</b></span> : <span>• Ein <b>Kleinbuchstabe</b></span>}
                        </p>

                        <p id="capital" className={hasUpper ? 'text-green-600 text-sm' : 'text-red-500 text-sm'}>
                            {hasUpper ? <span>✓ Ein <b>Großbuchstabe</b></span> : <span>• Ein <b>Großbuchstabe</b></span>}
                        </p>

                        <p id="number" className={hasNumber ? 'text-green-600 text-sm' : 'text-red-500 text-sm'}>
                            {hasNumber ? <span>✓ Eine <b>Zahl</b></span> : <span>• Eine <b>Zahl</b></span>}
                        </p>

                        <p id="length" className={hasLength ? 'text-green-600 text-sm' : 'text-red-500 text-sm'}>
                            {hasLength ? <span>✓ Mindestens <b>8 Zeichen</b></span> : <span>• Mindestens <b>8 Zeichen</b></span>}
                        </p>
                    </div>

                    {/* Button zum Abschicken */}
                    <br></br>
                    <button
                        type="submit"
                        className="lg-btn"
                    >
                        Jetzt Passwort zurücksetzen
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;