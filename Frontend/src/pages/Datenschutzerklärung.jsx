import { useState } from 'react';
import '../pages/components/Styles/PrivacyBanner.css';

// Separate Komponente für den Datenschutzerklärungstext
function DatenschutzerklaerungContent() {
    return (
        <>
            <h3>Datenschutzerklärung</h3>
            <h4>1. Verantwortlicher & Geltungsbereich</h4>
            <p>
                Verantwortlich für die Datenbearbeitung auf dieser Website im Rahmen der Applikation
                „World of Chewing Gum“ sind das <strong>One Shot Team</strong> (bestehend aus
                <strong> Elias Kaiser</strong> und <strong>Vincent Diergardt</strong>). Diese Datenschutzerklärung
                informiert Nutzer über die Art, den Umfang und den Zweck der Erhebung und Verwendung von Daten.
            </p>
            <h4>2. Erhebung und Verarbeitung persönlicher Daten</h4>
            <p>
                Wir erheben personenbezogene Daten (wie Benutzernamen, E-Mail-Adressen und Passwörter),
                wenn Sie sich registrieren oder die Funktionen der Plattform („World of Chewing Gum“) nutzen.
                Die Passwörter werden sicher und verschlüsselt (mittels BCrypt) gespeichert.
            </p>
            <h4>3. Speicherdauer und Datensicherheit</h4>
            <p>
                Ihre Daten werden nur so lange gespeichert, wie es für die Bereitstellung der App-Funktionen
                (Bewerten und Vergleichen von Kaugummis) erforderlich ist. Wir setzen technische Sicherheitsmassnahmen
                ein, um Ihre Daten vor unbefugtem Zugriff zu schützen.
            </p>
            <h4>4. Ihre Rechte</h4>
            <p>
                Gemäss dem Schweizer Datenschutzgesetz (DSG) sowie ggf. der DSGVO haben Sie jederzeit das Recht
                auf Auskunft, Berichtigung oder Löschung Ihrer gespeicherten Daten. Wenden Sie sich hierzu
                direkt an das Entwicklungsteam.
            </p>
        </>
    );
}

function PrivacyModal({ onClose }) {
    const [activeTab, setActiveTab] = useState('datenschutz');

    const tabs = [
        { id: 'datenschutz', label: 'Datenschutz' },
        { id: 'dsgvo', label: 'DSGVO / Rechtliches' },
        { id: 'agb', label: 'AGB' },
    ];

    const content = {
        datenschutz: <DatenschutzerklaerungContent />,
        dsgvo: (
            <>
                <h3>DSGVO & Schweizer Datenschutz</h3>
                <p>Gemäss den geltenden Datenschutzbestimmungen (Schweizer DSG / EU-DSGVO) stehen Ihnen folgende Rechte zu:</p>
                <ul>
                    <li><strong>Auskunftsrecht:</strong> Sie können jederzeit Auskunft über Ihre gespeicherten Daten verlangen.</li>
                    <li><strong>Recht auf Berichtigung:</strong> Unrichtige oder veraltete Daten können korrigiert werden.</li>
                    <li><strong>Recht auf Löschung:</strong> Sie können die Löschung Ihrer Daten verlangen ("Recht auf Vergessenwerden").</li>
                    <li><strong>Recht auf Einschränkung:</strong> Die Verarbeitung Ihrer Daten kann unter bestimmten Bedingungen eingeschränkt werden.</li>
                    <li><strong>Widerspruchsrecht:</strong> Sie können der Datenverarbeitung jederzeit widersprechen.</li>
                    <li><strong>Datenübertragbarkeit:</strong> Erhalten Sie Ihre Daten in einem gängigen, maschinenlesbaren Format.</li>
                </ul>
                <h4>Zuständige Aufsichtsbehörde (Schweiz)</h4>
                <p>Bei datenschutzrechtlichen Anliegen können Sie sich an den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) wenden.</p>
            </>
        ),
        agb: (
            <>
                <h3>Allgemeine Geschäftsbedingungen (AGB)</h3>
                <h4>§1 Geltungsbereich</h4>
                <p>
                    Diese Allgemeinen Geschäftsbedingungen gelten für die Nutzung der Web-Applikation
                    „World of Chewing Gum“, entwickelt vom One Shot Team (Elias Kaiser und Vincent Diergardt).
                </p>
                <h4>§2 Nutzungsbedingungen & Inhalte</h4>
                <ul>
                    <li>Die Plattform dient dem Vergleichen, Bewerten und Entdecken verschiedener Kaugummi-Varietäten.</li>
                    <li>Jeder Nutzer ist für die von ihm eingegebenen Inhalte (z. B. Bewertungen, Kommentare) selbst verantwortlich.</li>
                    <li>Missbrauch, Spam oder das Hochladen unzulässiger Inhalte sind untersagt und führen zur sofortigen Sperrung des Accounts.</li>
                </ul>
                <h4>§3 Haftungsausschluss</h4>
                <p>
                    Die Applikation wird im Rahmen eines Schul- bzw. Fullstack-Projekts bereitgestellt.
                    Das One Shot Team übernimmt keine Haftung für die ständige Verfügbarkeit, Fehlerfreiheit
                    der Software oder die Richtigkeit der eingetragenen Kaugummi-Daten.
                </p>
                <h4>§4 Schlussbestimmungen</h4>
                <p>Es gilt Schweizer Recht. Gerichtsstand ist Zürich.</p>
            </>
        ),
    };

    return (
        <div className="privacy-modal-overlay" onClick={onClose}>
            <div className="privacy-modal" onClick={e => e.stopPropagation()}>
                <button className="privacy-modal-close" onClick={onClose} aria-label="Schliessen">✕</button>
                <div className="privacy-modal-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`privacy-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="privacy-modal-content">
                    {content[activeTab]}
                </div>
            </div>
        </div>
    );
}

function PrivacyBanner() {
    const [accepted, setAccepted] = useState(
        () => localStorage.getItem('privacy_accepted') === 'true'
    );
    const [modalOpen, setModalOpen] = useState(false);

    const handleAccept = () => {
        localStorage.setItem('privacy_accepted', 'true');
        setAccepted(true);
    };

    const handleDecline = () => {
        window.location.href = 'https://www.google.com';
    };

    if (accepted) return null;

    return (
        <>
            {modalOpen && <PrivacyModal onClose={() => setModalOpen(false)} />}

            <div className="privacy-banner">
                <div className="privacy-banner-text">
                    <strong>Nutzungsbedingungen & Datenschutz</strong>
                    <p>
                        Wir verarbeiten Ihre Daten und nutzen Allgemeine Geschäftsbedingungen (AGB).
                        Mit dem Klick auf "Akzeptieren" stimmen Sie unserer <strong>Datenschutzerklärung</strong> und den <strong>AGB</strong> zu.
                    </p>
                </div>
                <div className="privacy-banner-actions">
                    <button className="privacy-btn-info" onClick={() => setModalOpen(true)}>
                        📄 AGB & Datenschutz lesen
                    </button>
                    <button className="privacy-btn-decline" onClick={handleDecline}>
                        Ablehnen
                    </button>
                    <button className="privacy-btn-accept" onClick={handleAccept}>
                        Akzeptieren
                    </button>
                </div>
            </div>
        </>
    );
}

export default PrivacyBanner;