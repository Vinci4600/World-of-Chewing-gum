import { useState } from "react";
import API from "../api.js";
import "./components/Styles/Home.css";
import "./components/Styles/Add.css";

function KaugummiAddPage() {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [marke, setMarke] = useState("");
    const [geschmack, setGeschmack] = useState("");
    const [zuckerfrei, setZuckerfrei] = useState(false);
    const [inhaltsstoffe, setInhaltsstoffe] = useState("");
    const [shopUrl, setShopUrl] = useState("");
    const [herstellungsland, setHerstellungsland] = useState("");
    const [nebenwirkungen , setNebenwirkungen] = useState("");
    // Daten, die ins Backend geschickt werden
    const kaugummiData = {
        name: name,
        imageUrl: imageUrl,
        marke: marke,
        geschmack: geschmack,
        zuckerfrei: zuckerfrei,
        inhaltsstoffe: inhaltsstoffe,
        shopUrl: shopUrl,
        herstellungsland: herstellungsland,
        nebenwirkungen: nebenwirkungen,
    };

    // POST-Funktion
    const kaugummiHinzufuegen = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/api/kaugummi/add", kaugummiData);
            console.log("Erfolgreich hinzugefügt:", response.data);

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
                        {/*Herstellungsland*/}
                        <div className="form-group"> <input
                            id="herstellungsland"
                            type="text"
                            value={herstellungsland}
                            onChange={(e) => setHerstellungsland(e.target.value)}
                            placeholder="Herstellungsland"
                            required
                        /></div>
                    {/*Nebenwirkungen*/}
                    <div className="form-group"> <input
                        id="nebenwirkungen"
                        type="text"
                        value={nebenwirkungen}
                        onChange={(e) => setNebenwirkungen(e.target.value)}
                        placeholder="Nebenwirkungen"
                        required
                    /></div>


                    {/* Absenden */}
                    <button className="button1 animated-btn" type="submit">
                        Kaugummi hinzufügen
                    </button>

                </form>
            </div>


        </div>
    );
}

export default KaugummiAddPage;