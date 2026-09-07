import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function KaugummiEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // 1. States für Formularfelder
    const [name, setName] = useState("");
    const [marke, setMarke] = useState("");
    const [geschmack, setGeschmack] = useState("");
    const [inhaltsstoffe, setInhaltsstoffe] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [shopUrl, setShopUrl] = useState("");
    const [zuckerfrei, setZuckerfrei] = useState(false);

    // 2. States für Status und Fehlerhandling
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 3. Daten beim Laden abrufen
    useEffect(() => {
        const fetchKaugummi = async () => {
            try {
                const response = await fetch(`/api/kaugummi/${id}`);
                if (!response.ok) {
                    throw new Error("Kaugummi konnte nicht geladen werden.");
                }
                const data = await response.json();
                setName(data.name || "");
                setGeschmack(data.geschmack || "");
                setInhaltsstoffe(data.inhaltsstoffe || "");
                setImageUrl(data.imageUrl || "");
                setShopUrl(data.shopUrl || "");
                setZuckerfrei(Boolean(data.zuckerfrei));
                setMarke(data.marke || "");

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
                alert("Kaugummi ladet!")
            }
        };

        fetchKaugummi();
    }, [id]);

    // 4. PUT-Request beim Speichern
    const handleUpdate = async (e) => {
        e.preventDefault();
        setError("");

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`/api/kaugummi/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    marke,
                    geschmack,
                    inhaltsstoffe,
                    imageUrl,
                    shopUrl,
                    zuckerfrei
                })
            });

            if (!response.ok) {
                throw new Error("Fehler beim Aktualisieren des Kaugummis.");
            }

            navigate("/kaugummiPage");
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Lade Kaugummi-Daten...</div>;

    return (
        <div className="kaugummi-form-container">
            <h1>Kaugummi bearbeiten (ID: {id})</h1>

            {error && <div className="lg-error">{error}</div>}

            <form onSubmit={handleUpdate}>
                <div className="lg-field">
                    <input
                        className="lg-input"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="lg-field">
                    <input
                        className="lg-input"
                        type="text"
                        placeholder="Marke"
                        value={marke}
                        onChange={(e) => setMarke(e.target.value)}
                        required
                    />
                </div>

                <div className="lg-field">
                    <input
                        className="lg-input"
                        type="text"
                        placeholder="Geschmack"
                        value={geschmack}
                        onChange={(e) => setGeschmack(e.target.value)}
                        required
                    />
                </div>

                <div className="lg-field">
                    <input
                        className="lg-input"
                        type="text"
                        placeholder="Inhaltsstoffe"
                        value={inhaltsstoffe}
                        onChange={(e) => setInhaltsstoffe(e.target.value)}
                        required
                    />
                </div>

                <div className="lg-field">
                    <input
                        className="lg-input"
                        type="text"
                        placeholder="Shop URL"
                        value={shopUrl}
                        onChange={(e) => setShopUrl(e.target.value)}
                    />
                </div>

                <div className="lg-field">
                    <input
                        className="lg-input"
                        type="text"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>



                <div className="lg-field" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <label htmlFor="zuckerfrei-checkbox">Zuckerfrei?</label>
                    <input
                        id="zuckerfrei-checkbox"
                        type="checkbox"
                        checked={zuckerfrei}
                        onChange={(e) => setZuckerfrei(e.target.checked)}
                    />
                </div>



                <button type="submit" className="button1">
                    Speichern
                </button>
                <button
                    type="button"
                    className="button1"
                    onClick={() => navigate("/kaugummiPage")}
                >
                    Abbrechen
                </button>
            </form>
        </div>
    );
}

export default KaugummiEditPage;