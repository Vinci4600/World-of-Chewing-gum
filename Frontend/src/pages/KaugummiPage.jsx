import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api.js"; // Pfad ggf. anpassen
import { useAuth } from "../context/AuthContext.jsx";

import {Link} from "react-router-dom";
import "./components/Styles/Home.css";
import "./components/Styles/Add.css";
import editIcon from "./components/Bilder/Bearbeitenbtn.png";
import deleteIcon from "./components/Bilder/Deletebtn.png";

function KaugummiPage() {
    const [kaugummi, setKaugummi] = useState([]);
    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();

    // Alle Kaugummis laden
    const fetchKaugummi = async () => {
        try {
            const response = await API.get("/api/kaugummi/all");
            setKaugummi(response.data);
        } catch (error) {
            console.error("Fehler beim Laden der Kaugummis:", error);
        }
    };

    useEffect(() => {
        fetchKaugummi();
    }, []);

    // Beim Klick auf eine Box
    const handleKaugummiClick = (id) => {
        navigate(`/kaugummi/${id}`);
    };

    const handleDelete = async (event, id) => {
        event.stopPropagation();

        if (!window.confirm("Diesen Kaugummi wirklich löschen?")) {
            return;
        }

        try {
            await API.delete(`/api/kaugummi/delete/${id}`);
            setKaugummi((currentKaugummi) => currentKaugummi.filter((gum) => gum.id !== id));
        } catch (error) {
            console.error("Fehler beim Löschen des Kaugummis:", error);
        }
    };

    return (
        <div className="kaugummi-page">

            <h1 className="kauggmi-field">Unsere Kaugummis</h1>

            <div className="kaugummi-grid">

                {kaugummi.map((gum) => (
                    <div
                        className="kaugummi-card"
                        key={gum.id}
                        onClick={() => handleKaugummiClick(gum.id)}
                    >

                        {isAuthenticated && (
                            <div className="kaugummi-card-actions">
                                <Link
                                    className="kaugummi-icon-button"
                                    to={`/kaugummiedit/${gum.id}`}
                                    onClick={(event) => event.stopPropagation()}
                                    aria-label={`${gum.name} bearbeiten`}
                                    title="Bearbeiten"
                                >
                                    <img src={editIcon} alt="" />
                                </Link>
                                <button
                                    className="kaugummi-icon-button"
                                    type="button"
                                    onClick={(event) => handleDelete(event, gum.id)}
                                    aria-label={`${gum.name} löschen`}
                                    title="Löschen"
                                >
                                    <img src={deleteIcon} alt="" />
                                </button>
                            </div>
                        )}


                        <img
                            src={gum.imageUrl?.includes("via.placeholder.com") ? "/Last.png" : gum.imageUrl || "/Last.png"}
                            alt={gum.name}
                            className="kaugummi-image"
                            onError={(event) => {
                                event.currentTarget.src = "/Last.png";
                            }}
                        />

                        <div className="kaugummi-card-content">

                            <h2>{gum.name}</h2>

                            <p>
                                <strong>Marke:</strong> {gum.marke}
                            </p>

                            <p>
                                <strong>Geschmack:</strong>{" "}
                                {gum.geschmack}
                            </p>




                            <p>
                                <strong>Inhaltsstoffe:</strong>
                                {gum.inhaltsstoffe}
                            </p>

                            <p>
                                <strong>Nebenwirkungen:</strong>{" "}
                                {gum.nebenwirkungen || "Keine Angaben"}
                            </p>

                            {gum.zuckerfrei && (
                                <span className="zuckerfrei">
                                    Zuckerfrei
                                </span>
                            )}

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default KaugummiPage;