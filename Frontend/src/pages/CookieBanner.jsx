import React, { useState, useEffect } from 'react';
import '../../src/pages/components/Styles/CookieBanner.css';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Prüfen, ob die Zustimmung bereits im localStorage gespeichert ist
        const cookieConsent = localStorage.getItem('cookieConsent');
        if (!cookieConsent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsVisible(false);
        // Hier kannst du Tracking-Skripte wie Google Analytics aktivieren
    };

    const declineCookies = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setIsVisible(false);
        // Optionale Logik für abgelehnte Cookies
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-banner">
            <div className="cookie-content">
                <p>
                    Wir nutzen  ausschliesslich **Cookies**, um Ihre Nutzererfahrung auf unserer Website zu verbessern.
                    Weitere Informationen finden Sie in unserer <a href="/datenschutz">Datenschutzerklärung</a>.
                </p>
                <div className="cookie-buttons">
                    <button className="btn-decline" onClick={declineCookies}>
                        Ablehnen
                    </button>
                    <button className="btn-accept" onClick={acceptCookies}>
                        Alle akzeptieren
                    </button>
                </div>
            </div>
        </div>
    );
}
