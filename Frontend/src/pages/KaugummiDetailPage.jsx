import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext.jsx";
import "./components/Styles/Home.css";
import commentButtonIcon from "./components/Bilder/Kommentarbtn.png";

function KaugummiDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [gum, setGum] = useState(null);
    const [error, setError] = useState("");
    const [commentText, setCommentText] = useState("");
    const [commentError, setCommentError] = useState("");
    const [commentSuccess, setCommentSuccess] = useState("");

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
// KommentarHinzufügen
    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        setCommentError("");
        setCommentSuccess("");

        if (!isAuthenticated) {
            window.alert("Bitte zuerst anmelden, bevor du einen Kommentar schreibst.");
            navigate("/login", {
                state: { message: "Bitte melde dich an, um einen Kommentar zu schreiben." }
            });
            return;
        }

        try {
            const response = await API.post(
                `/api/kaugummi/${id}/kommentar`,
                { text: commentText }
            );

            setGum((currentGum) => ({
                ...currentGum,
                kommentare: [
                    ...(currentGum.kommentare || []),
                    response.data
                ]
            }));

            setCommentText("");
            setCommentSuccess("Kommentar erfolgreich gespeichert.");
        } catch (requestError) {
            setCommentError(
                requestError.response?.data?.message ||
                "Der Kommentar konnte nicht gespeichert werden."
            );
        }
    };

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
                Zurück
            </button>

            <article className="kaugummi-detail-card">
                <div className="kaugummi-detail-image-wrap">
                    <img src={gum.imageUrl} alt={gum.name} className="kaugummi-detail-image" />
                </div>

                <div className="kaugummi-detail-content">
                    <p className="kaugummi-eyebrow">Marke: {gum.marke || "Keine Angaben"}</p>
                    <h1>{gum.name}</h1>
                    <p className="kaugummi-detail-taste">Geschmack: {gum.geschmack || "Keine Angaben"}</p>

                    <div className="kaugummi-detail-facts">
                        <div>
                            <span>Zuckerfrei</span>
                            <strong>{gum.zuckerfrei ? "Ja" : "Nein"}</strong>
                        </div>
                        <div>
                            <span>Inhaltsstoffe</span>
                            <strong>{gum.inhaltsstoffe || "Keine Angaben"}</strong>
                        </div>
                        <div>
                            <span>Herkunftsland</span>
                            <strong>{gum.herstellungsland || "Keine Angaben"}</strong>
                        </div>

                        <div>
                            <span>Nebenwirkungen</span>
                            <strong>{gum.nebenwirkungen || "Keine Angaben"}</strong>
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

                    <section className="comments-section">
                        <h2>Kommentare</h2>

                        <form onSubmit={handleCommentSubmit}>
                            <textarea
                                value={commentText}
                                onChange={(event) => setCommentText(event.target.value)}
                                placeholder="Dein Kommentar"
                                maxLength={1000}
                                required
                            />

                            <button className="kaugummi-comment-button" type="submit">
                                <img src={commentButtonIcon} alt="" />
                                Kommentar schreiben
                            </button>
                        </form>

                        {commentError && <p>{commentError}</p>}
                        {commentSuccess && <p>{commentSuccess}</p>}

                        <div className="comments-list">
                            {(gum.kommentare || []).map((kommentar) => (
                                <article className="comment-item" key={kommentar.id}>
                                    <strong>
                                        {kommentar.benutzer?.benutzername || "Benutzer"}
                                    </strong>
                                    <p>{kommentar.text}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </article>
        </main>
    );
}

export default KaugummiDetailPage;
