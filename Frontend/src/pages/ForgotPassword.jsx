import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import "./components/Styles/Home.css";
import "./components/Styles/ForgotPassword.css";

function ForgotPassword() {
    const navigate = useNavigate();


    /**
     * Password Requirements
     */

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // !
    const [success, setSuccess] = useState('');

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());


    /**
     * Password Requirements
     * @type {[{label: string, valid: boolean},{label: string, valid: boolean},{label: string, valid: boolean},{label: string, valid: boolean},{label: string, valid: boolean}]}
     */



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // !
        if (!email.trim() || !email.includes('@')) {
            setError("Bitte gib eine gültige E-Mail-Adresse ein.");
            alert("Gib bitte eine gültige E-Mail Adresse ein!");
            return;
        }


        if (!isEmailValid) {
            setError("Bitte gib eine gültige E-Mail Adresse ein!");
            alert("Bitte eine gültige E-Mail Adresse eingeben!");
            return;
        }


        // API-Aufruf zum Senden des Codes
        const response = await fetch('/api/auth/forgot-password', {
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


        // !
    };

    return (
        <div className="Background-Intro">

            <div className="kaugummi-form-container">
                <h1 className="lg-title">Passwort vergessen</h1>
                <p>
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


                    {/* Button zum Abschicken mit Ladezustand */}
                    <br/>
                    <button
                        type="submit"
                        className="lg-btn"
                        disabled={loading}
                        style={{
                            opacity: loading ? 0.8 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            marginTop: '1rem'
                        }}
                    >
                        {loading ? "Code wird gesendet..." : "Code anfordern"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;