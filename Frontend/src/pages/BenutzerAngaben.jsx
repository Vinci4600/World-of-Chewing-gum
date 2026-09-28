import { useEffect, useState } from "react";
import API from "../api";
import "./components/Styles/BenutzerAngaben.css";

function BenutzerAngaben() {
    const [benutzer, setBenutzer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
//Use efect wo es die Daten Herholen sollte
    useEffect(() => {
        const ladeBenutzer = async () => {
            try {
                const response = await API.get("/api/benutzer/all");
                setBenutzer(response.data);
            } catch {
                setError("Die Benutzer konnten nicht geladen werden.");
            } finally {
                setLoading(false);
            }
        };

        ladeBenutzer();
    }, []);

    const deleteBenztzer = async (id) => {
        if (!window.confirm('Möchtests du den User mit der id' + id + 'tatsächlich endgültig löschen!')) {
            return;
        }

        try {
            await API.delete(`/api/benutzer/${id}`);
            setBenutzer((prevBenutzer) => prevBenutzer.filter((eintrag) => eintrag.id !== id));
        } catch {
            alert("Fehler beim Löschen des Benutzers.");
        }
    };
// Html Part
    return (
        <main className="benutzer-angaben">
            <h1>Benutzerangaben</h1>

            {loading && <p>Benutzer werden geladen...</p>}
            {error && <p className="benutzer-angaben-fehler">{error}</p>}

            {!loading && !error && (
                <div className="benutzer-tabelle-wrapper">
                    <table className="benutzer-tabelle">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Benutzername</th>
                            <th>E-Mail</th>
                            <th>Rolle</th>
                            //mit aktionen sind Delete und Update gemeint
                            <th>Aktionen</th>
                        </tr>
                        </thead>
                        <tbody>
                        {benutzer.map((eintrag) => (
                            <tr key={eintrag.id}>
                                <td>{eintrag.id}</td>
                                <td>{eintrag.benutzername}</td>
                                <td>{eintrag.email}</td>
                                <td>{eintrag.role}</td>
                                <td>
                                    <button className="btn-delete" onClick={() => deleteBenztzer(eintrag.id)}>Benutzer löschen</button>
                                </td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {benutzer.length === 0 && <p>Keine Benutzer gefunden.</p>}
                </div>
            )}
        </main>
    );
}

export default BenutzerAngaben;