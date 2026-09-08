import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api.js"; // Pfad ggf. anpassen

import {Link} from "react-router-dom";
import "./components/Styles/Home.css";
import "./components/Styles/Add.css";

function KaugummiPage() {
    const [kaugummi, setKaugummi] = useState([]);

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

                        <Link to={`/kaugummiedit/${gum.id}`} onClick={(event) => event.stopPropagation()}>
                            Bearbeiten
                        </Link>
                        <button type="button" onClick={(event) => handleDelete(event, gum.id)}>
                            Löschen
                        </button>


                        <img
                            src={gum.imageUrl}
                            alt={gum.name}
                            className="kaugummi-image"
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
                                <strong>Image Url</strong>
                                {gum.imageUrl}
                            </p>

                            <p>
                                <strong>Inhaltsstoffe</strong>
                                {gum.inhaltsstoffe}
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