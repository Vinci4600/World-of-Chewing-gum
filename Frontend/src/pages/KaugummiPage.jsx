import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // Pfad ggf. anpassen

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

    return (
        <div className="kaugummi-page">

            <h1>Unsere Kaugummis</h1>

            <div className="kaugummi-grid">

                {kaugummi.map((gum) => (
                    <div
                        className="kaugummi-card"
                        key={gum.id}
                        onClick={() => handleKaugummiClick(gum.id)}
                    >

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