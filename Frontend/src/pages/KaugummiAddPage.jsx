import { useState } from "react";
import "./components/Styles/Home.css";

function KaugummiAddPage() {
    const [kaugummi, setKaugummi] = useState([]);
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [marke, setMarke] = useState("");
    const [geschmack, setGeschmack] = useState("");
    const [zuckerfrei, setZuckerfrei] = useState(false);
    const [inhaltsstoffe, setInhaltsstoffe] = useState("");

    // Daten, die ins Backend geschickt werden
    const kaugummiData = {
        name: name,
        imageUrl: imageUrl,
        marke: marke,
        geschmack: geschmack,
        zuckerfrei: zuckerfrei,
        inhaltsstoffe: inhaltsstoffe
    };

    // POST-Funktion
    const kaugummiHinzufuegen = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/api/kaugummi/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(kaugummiData)
                }
            );

            if (!response.ok) {
                throw new Error("Kaugummi konnte nicht hinzugefügt werden");
            }

            const data = await response.json();

            console.log("Erfolgreich hinzugefügt:", data);

        } catch (error) {
            console.error("Fehler:", error);
        }
    };

    return (
        <div className="Background-Intro">

        </div>
    );
}

export default KaugummiAddPage;