import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // Pfad ggf. anpassen
import deleteButtonImage from "./components/Bilder/Deletebtn.png";

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
    // Kaugummi Löschen
    //  DELETE (nur Admin) = // weg Löschen
    const deleteKaugummi = async (id) => {
        //if (role !== "ADMIN") {
            //alert("Nur Admins dürfen löschen!");
            //return;
        //}

        try {
            await API.delete(`/api/kaugummi/delete/${id}`);
            await fetchKaugummi();

        } catch (error) {
            console.error(
                "Fehler beim Löschen:",
                error.response?.data || error.message
            );
        }
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
                        onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                handleKaugummiClick(gum.id);
                            }
                        }}
                        role="button"
                        tabIndex={0}
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

                            <button
                                type="button"
                                className="kaugummi-delete-button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    deleteKaugummi(gum.id);
                                }}
                            >
                                <img
                                    src={deleteButtonImage}
                                    alt="Kaugummi löschen"
                                />
                            </button>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default KaugummiPage;