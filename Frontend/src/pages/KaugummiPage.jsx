import { useState } from "react";
import "./components/Styles/Home.css";
import "./components/Styles/Add.css";
import KaugummiPage from "./KaugummiPage.jsx";
import { useEffect, useState } from "react";

import API from "./api"; // Pfad ggf. anpassen

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
    // Kaugummi id Klick
    const handleKaugummiClick = (id) => {
        navigate(`/kaugummi/${id}`);
    };
}
    export default KaugummiPage;