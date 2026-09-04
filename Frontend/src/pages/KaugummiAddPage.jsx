import { useState } from "react";
import "./components/Styles/Home.css";
import "./components/Styles/Add.css";

function KaugummiAddPage() {
    const [kaugummi, setKaugummi] = useState([]);
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [marke, setMarke] = useState("");
    const [geschmack, setGeschmack] = useState("");
    const [zuckerfrei, setZuckerfrei] = useState(false);
    const [inhaltsstoffe, setInhaltsstoffe] = useState("");
    const [shopUrl, setShopUrl] = useState("");

    // Daten, die ins Backend geschickt werden
    const kaugummiData = {
        name: name,
        imageUrl: imageUrl,
        marke: marke,
        geschmack: geschmack,
        zuckerfrei: zuckerfrei,
        inhaltsstoffe: inhaltsstoffe,
        shopUrl: shopUrl
    };

    // POST-Funktion
    const kaugummiHinzufuegen = async (event) => {
        event.preventDefault();
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

            setName("");
            setImageUrl("");
            setMarke("");
            setGeschmack("");
            setZuckerfrei(false);
            setInhaltsstoffe("");
            setShopUrl("");

        } catch (error) {
            console.error("Fehler:", error);
        }
    };

    return (
        <div className="Background-Intro">
            <div className="kaugummi-form-container">

                <h1>Kaugummi hinzufügen</h1>

                <form onSubmit={kaugummiHinzufuegen}>

                    {/* Name */}
                    <div className="form-group">
                        <label htmlFor="name">
                            Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="z.B. Airwaves"
                            required
                        />
                    </div>

                    {/* Bild URL */}
                    <div className="form-group">
                        <label htmlFor="imageUrl">
                            Bild-URL
                        </label>

                        <input
                            id="imageUrl"
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://..."
                        />
                    </div>

                    {/* Marke */}
                    <div className="form-group">
                        <label htmlFor="marke">
                            Marke
                        </label>

                        <input
                            id="marke"
                            type="text"
                            value={marke}
                            onChange={(e) => setMarke(e.target.value)}
                            placeholder="z.B. Airwaves"
                            required
                        />
                    </div>

                    {/* Geschmack */}
                    <div className="form-group">
                        <label htmlFor="geschmack">
                            Geschmack
                        </label>

                        <input
                            id="geschmack"
                            type="text"
                            value={geschmack}
                            onChange={(e) => setGeschmack(e.target.value)}
                            placeholder="z.B. Minze"
                            required
                        />
                    </div>

                    {/* Zuckerfrei */}
                    <div className="form-group checkbox-group">
                        <input
                            id="zuckerfrei"
                            type="checkbox"
                            checked={zuckerfrei}
                            onChange={(e) => setZuckerfrei(e.target.checked)}
                        />

                        <label htmlFor="zuckerfrei">
                            Zuckerfrei
                        </label>
                    </div>

                    {/* Inhaltsstoffe */}
                    <div className="form-group">
                        <label htmlFor="inhaltsstoffe">
                            Inhaltsstoffe
                        </label>

                        <textarea
                            id="inhaltsstoffe"
                            value={inhaltsstoffe}
                            onChange={(e) => setInhaltsstoffe(e.target.value)}
                            placeholder="z.B. Sorbit, Kaumasse, Aromen..."
                            rows="5"
                        />
                    </div>
                    {/* shopUrl */}
                    <div className="form-group">
                        <label htmlFor="shopUrl">
                            shopUrl
                        </label>

                        <input
                            id="shopUrl"
                            type="text"
                            value={shopUrl}
                            onChange={(e) => setShopUrl(e.target.value)}
                            placeholder="Gütigster verkaufs Url"
                            required
                        />
                    </div>

                    {/* Absenden */}
                    <button className="button1" type="submit">
                        Kaugummi hinzufügen
                    </button>

                </form>
            </div>


        </div>
    );
}

export default KaugummiAddPage;