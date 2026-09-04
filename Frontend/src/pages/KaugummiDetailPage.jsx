import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import "./components/Styles/Home.css";

function KaugummiDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [gum, setGum] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchGum = async () => {
            try {
                const response = await API.get(`/api/kaugummi/${id}`);
                setGum(response.data);
            } catch (requestError) {
                console.error("Fehler beim Laden des Kaugummis:", requestError);
                setError("Der Kaugummi konnte nicht geladen werden.");
            }
        };

        fetchGum();
    }, [id]);

    if (error) {
        return (
            <main className="kaugummi-detail-page">
                <p className="kaugummi-message">{error}</p>
                <button className="kaugummi-secondary-button" onClick={() => navigate("/kaugummiPage")}>
                    Zurück zur Übersicht
                </button>
            </main>
        );
    }

    if (!gum) {
        return <main className="kaugummi-detail-page"><p className="kaugummi-message">Kaugummi wird geladen...</p></main>;
    }

    return (
        <main className="kaugummi-detail-page">
            <button className="kaugummi-back-button" onClick={() => navigate(-1)}>
                Zurueck
            </button>

            <article className="kaugummi-detail-card">
                <div className="kaugummi-detail-image-wrap">
                    <img src={gum.imageUrl} alt={gum.name} className="kaugummi-detail-image" />
                </div>

                <div className="kaugummi-detail-content">
                    <p className="kaugummi-eyebrow">{gum.marke}</p>
                    <h1>{gum.name}</h1>
                    <p className="kaugummi-detail-taste">{gum.geschmack}</p>

                    <div className="kaugummi-detail-facts">
                        <div>
                            <span>Zuckerfrei</span>
                            <strong>{gum.zuckerfrei ? "Ja" : "Nein"}</strong>
                        </div>
                        <div>
                            <span>Inhaltsstoffe</span>
                            <strong>{gum.inhaltsstoffe || "Keine Angaben"}</strong>
                        </div>
                    </div>

                    <div className="kaugummi-detail-actions">
                        {gum.shopUrl && (
                            <a
                                className="kaugummi-shop-button"
                                href={gum.shopUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Im Shop ansehen
                            </a>
                        )}

                    </div>
                </div>
            </article>
        </main>
    );
}

export default KaugummiDetailPage;
