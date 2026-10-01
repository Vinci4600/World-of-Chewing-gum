import { useEffect, useState } from "react";
import API from "../api.js";
import Deletebtn from "./components/Bilder/Deletebtn.png";
import { useAuth } from "../context/AuthContext.jsx";

function FavoritePage() {
    const { user } = useAuth();
    const [favoriten, setFavoriten] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    /**UserDaten aus localStorage holen
     *
     */
    const localUser = JSON.parse(localStorage.getItem("user") || "{}");
    const userId =
        user?.id || user?.benutzerId || user?.kundeId ||
        localUser?.id || localUser?.benutzerId || localUser?.kundeId;

    // Favoriten beim Laden holen
    useEffect(() => {
        const ladeFavoriten = async () => {
            if (!userId) {
                setError("Bitte melde dich an, um deine Favoriten zu sehen.");
                setLoading(false);
                return;
            }

            try {
                const response = await API.get(`/api/favoriten/${userId}`);
                setFavoriten(response.data);
            } catch (err) {
                console.error("Fehler beim Laden der Favoriten:", err);
                setError("Die Favoriten konnten nicht geladen werden.");
                alert("Bitte anmelden mit dem User");
            } finally {
                setLoading(false);
            }
        };

        ladeFavoriten();
    }, [userId]);

    /**
     * Favorites löschen
     * @param kaugummiId
     * @returns {Promise<void>}
     */

    const deleteFavorite = async (kaugummiId) => {
        if (!userId) return;

        try {
            await API.delete(`/api/favoriten/${userId}/favoriten/${kaugummiId}`);
            setFavoriten((prev) => prev.filter((item) => item.id !== kaugummiId));
        } catch (err) {
            console.error("Fehler beim Entfernen des Favoriten:", err);
            alert("Favorit konnte nicht entfernt werden.");
        }
    };


    /**
     * Zusatz Funktion fürs Datum
     * @param datumString
     * @returns {*|string|string}
     */
    const formatDatum = (datumString) => {
        if (!datumString) return "K.A.";
        const date = new Date(datumString);
        return isNaN(date.getTime()) ? datumString : date.toLocaleDateString("de-DE");
    };

    return (
        <main className="benutzer-angaben">
            <h1>Meine Kaugummi-Favoriten</h1>

            {loading && <p>Meine Favorites werden geladen...</p>}
            {error && <p className="favorites-angaben-fehler">{error}</p>}

            {!loading && !error && (
                <div className="favorite-tabelle-wrapper">
                    {favoriten.length === 0 ? (
                        <p>Keine Favoriten gespeichert.</p>
                    ) : (
                        <table className="favorites-tabelle">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Geschmack / Details</th>
                                <th>Datum des Favoriten</th>
                                <th>Aktionen</th>
                            </tr>
                            </thead>
                            <tbody>
                            {favoriten.map((kaugummi) => {
                                // Greift auf das Datumsfeld des Backends zu
                                const favDatum =
                                    kaugummi.erstelltAm ||
                                    kaugummi.createdAt ||
                                    kaugummi.hinzugefuegtAm ||
                                    kaugummi.datum;

                                return (
                                    <tr key={kaugummi.id}>
                                        <td>{kaugummi.id}</td>
                                        <td>{kaugummi.name || kaugummi.titel}</td>
                                        <td>{kaugummi.geschmack || kaugummi.beschreibung || "-"}</td>
                                        <td>{formatDatum(favDatum)}</td>
                                        <td>
                                            <button
                                                className="kaugummi-icon-button"
                                                onClick={() => deleteFavorite(kaugummi.id)}
                                                title="Aus Favoriten entfernen"
                                            >
                                                <img src={Deletebtn} alt="Favorit löschen" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </main>
    );
}

export default FavoritePage;