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
        const[isFavorite, setIsFavorite] = useState(false);
        const[loading, setLoading] = useState(false);
        const[name, setName] = useState("");
        const [geschmack,setGeschmack] = useState("");
        const [marke,setMarke]=useState("");
        const[herstellungsland,setHerstellungsland]=useState("");
        const[nebenwirkungen, setNebenwirkungen] = useState("");
        const[ImageUrl,setImageUrl]=useState("");
        const[ShopUrl,setShopUrl]=useState("");
        const [inhaltsstoffe,setInhaltsstoffe] = useState("");
        const [zuckerfrei,setZuckerfrei] = useState("");







            useEffect(() => {
                const fetchKaugummiData = async () => {
                    if (!id) return;

                    try {
                        setLoading(true);

                        // Kaugummi-Details abrufen
                        const response = await API.get(`/api/kaugummi/${id}`);
                        const data = response.data;

                        setName(data.name || "");
                        setGeschmack(data.geschmack || "");
                        setInhaltsstoffe(data.inhaltsstoffe || "");
                        setImageUrl(data.imageUrl || "");
                        setShopUrl(data.shopUrl || "");
                        setZuckerfrei(Boolean(data.zuckerfrei));
                        setMarke(data.marke || "");
                        setHerstellungsland(data.herstellungsland || "");
                        setNebenwirkungen(data.nebenwirkungen || "");
                        setGum(data);

                        // Fall A: Das Backend schickt isFavorite direkt im Objekt mit
                        // 2. Favoritenstatus sicher abfangen (ohne Fehler zu werfen)
                        if (data.isFavorite !== undefined) {
                            setIsFavorite(Boolean(data.isFavorite));
                        }


                    } catch (err) {
                        const errorMsg = err.response?.data?.message || err.response?.data || err.message;
                        console.error("API Error Detail:", err.response);
                        setError(errorMsg);
                    } finally {
                        setLoading(false);
                    }
                };

                fetchKaugummiData();
            }, [id]);

        const toggleFavorite = async () => {
            try {
                if (isFavorite) {
                    // Aus Favoriten entfernen (Pfad an eurer API anpassen, falls nötig)
                    await API.delete(`/api/favoriten/${id}`);
                    setIsFavorite(false);
                    console.log("Aus Favoriten entfernt");
                } else {
                    // Zu Favoriten hinzufügen (Pfad an eurer API anpassen, falls nötig)
                    await API.post(`/api/favoriten/${id}`);
                    setIsFavorite(true);
                    console.log("Zu Favoriten hinzugefügt");
                }
            } catch (err) {
                // Detaillierte Fehlerausgabe genau wie bei deinem fetch
                const errorMsg = err.response?.data?.message || err.response?.data || err.message;
                console.error("Fehler beim Aktualisieren des Favoriten:", err.response || err);
                alert(`Konnte den Favoritenstatus nicht ändern: ${errorMsg}`);
            }
        };

            // KommentarHinzufügen
            const handleCommentSubmit = async (event) => {
                event.preventDefault();
                setCommentError("");
                setCommentSuccess("");

                if (!isAuthenticated) {
                    window.alert("Bitte zuerst anmelden, bevor du einen Kommentar schreibst.");
                    navigate("/login", {
                        state: {message: "Bitte melde dich an, um einen Kommentar zu schreiben."}
                    });
                    return;
                }



                try {
                    const response = await API.post(
                        `/api/kaugummi/${id}/kommentar`,
                        {text: commentText}
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
                return <main className="kaugummi-detail-page"><p className="kaugummi-message">Kaugummi wird
                    geladen...</p></main>;
            }

            return (
                <main className="kaugummi-detail-page">
                    <button className="kaugummi-back-button" onClick={() => navigate(-1)}>
                        Zurück
                    </button>

                    <article className="kaugummi-detail-card">
                        <div className="kaugummi-detail-image-wrap">
                            <img src={gum.imageUrl} alt={gum.name} className="kaugummi-detail-image"/>
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

                            <section>
                                <button
                                    onClick={toggleFavorite}
                                    className="favorite-btn"
                                    type="button"
                                    aria-pressed={isFavorite}
                                >
                                    <span className="favorite-btn-icon" aria-hidden="true">
                                        {isFavorite ? "♥" : "♡"}
                                    </span>
                                    <span>{isFavorite ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}</span>
                                </button>
                            </section>

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

                                    <button
                                        className="kaugummi-icon-button"
                                        type="submit"
                                        aria-label="Kommentar schreiben"
                                        title="Kommentar schreiben"
                                    >
                                        <img src={commentButtonIcon} alt=""/>
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
