import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import API from "./api"; // Pfad ggf. anpassen
import "./components/Styles/Home.css";
import "./components/Styles/Add.css";

function KaugummiPage() {
    //Ersetzt durch das vom Unterem Test daten dann mit dem Backend verbunden
    /**
     * function KaugummiPage() {
     *     const [kaugummi, setKaugummi] = useState([]);
     *
     *     const navigate = useNavigate();
     *
     *     // Alle Kaugummis laden
     *     const fetchKaugummi = async () => {
     *         try {
     *             const response = await API.get("/api/kaugummi/all");
     *             setKaugummi(response.data);
     *         } catch (error) {
     *             console.error("Fehler beim Laden der Kaugummis:", error);
     *         }
     *     };
     *
     *     useEffect(() => {
     *         fetchKaugummi();
     *     }, []);
     * @type {NavigateFunction}
     */

    const navigate = useNavigate();
// Test daten nur im Frontend um Style zu testen danach durch das in den klammern ersetzten
    const [kaugummi] = useState([
        {
            id: 1,
            name: "Airwaves",
            marke: "Wrigley",
            geschmack: "Menthol",
            imageUrl: "https://via.placeholder.com/300",
            zuckerfrei: true
        },
        {
            id: 2,
            name: "Hubba Bubba",
            marke: "Mars",
            geschmack: "Erdbeere",
            imageUrl: "https://via.placeholder.com/300",
            zuckerfrei: true
        },
        {
            id: 3,
            name: "Extra",
            marke: "Wrigley",
            geschmack: "Spearmint",
            imageUrl: "https://via.placeholder.com/300",
            zuckerfrei: true
        }
    ]);
// Auf den jeweiligen Kaugummie zugreiffen
    const handleKaugummiClick = (id) => {
        navigate(`/kaugummi/${id}`);
    };

    return (
        <div className="#">

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